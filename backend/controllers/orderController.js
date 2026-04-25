const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const paymentService = require('../services/paymentService');
const subscriptionService = require('../services/subscriptionService');
const socketService = require('../services/socketService');
const { NEW_ORDER, ORDER_STATUS_UPDATE, ORDER_CANCELLED } = require('../sockets/orderSocket');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shopId, products, mode, deliveryType, paymentType, deliveryAddress } = req.body;

  if (!products || products.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Verify shop exists
  const shop = await Shop.findById(shopId);
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  // Fetch shop subscription status
  const shopIsSubscribed = await subscriptionService.isShopSubscribed(shopId);

  // Call validatePaymentCombination -> throws if invalid
  paymentService.validatePaymentCombination({
    mode,
    deliveryType,
    paymentType,
    shopIsSubscribed,
    shopSelfDelivery: shop.deliveryOptions?.selfDelivery
  });

  // Fetch each product, verify stock, compute totalAmount
  let totalAmount = 0;
  const orderProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      res.status(404);
      throw new Error(`Product ${item.productId} not found`);
    }
    if (product.stock < item.qty) {
      res.status(400);
      throw new Error(`Not enough stock for product ${product.name}`);
    }
    
    totalAmount += product.price * item.qty;
    
    orderProducts.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: item.qty
    });
  }

  // Simulate payment
  const paymentResult = paymentService.simulatePayment(paymentType, totalAmount);

  // Decrement stock
  for (const item of products) {
    const product = await Product.findById(item.productId);
    product.stock -= item.qty;
    await product.save();
  }

  // Create order
  const order = new Order({
    userId: req.user._id,
    shopId,
    products: orderProducts,
    totalAmount,
    mode,
    deliveryType,
    paymentType,
    paymentStatus: paymentResult.paymentStatus,
    payLaterStatus: paymentType === 'paylater' ? 'pending_approval' : 'none',
    deliveryAddress: mode === 'delivery' ? deliveryAddress : undefined
  });

  const createdOrder = await order.save();

  // Emit socket event to shopkeeper
  try {
    socketService.notifyShop(shopId, NEW_ORDER, createdOrder);
  } catch (err) {
    console.error('Socket error on createOrder:', err.message);
  }

  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  
  // Frontend might expect `items` instead of `products` depending on how it was built,
  // but we should just return what matches the schema and adapt frontend if necessary.
  // The earlier code mapped products -> items. Let's do it safely.
  const mappedOrders = orders.map(order => {
     const doc = order.toObject();
     doc.items = doc.products.map(p => ({
        productId: { images: [], _id: p.productId }, // mock structure
        name: p.name,
        price: p.price,
        quantity: p.qty
     }));
     return doc;
  });

  res.json(mappedOrders);
});

// @desc    Get shop orders
// @route   GET /api/orders/shop
// @access  Private/Shopkeeper
const getShopOrders = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  const orders = await Order.find({ shopId: shop._id })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private/Shopkeeper
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Enforce state machine: placed -> packed -> ready -> delivered
  const states = ['placed', 'packed', 'ready', 'delivered'];
  const currentIndex = states.indexOf(order.orderStatus);
  const newIndex = states.indexOf(orderStatus);

  if (newIndex === -1 || newIndex !== currentIndex + 1) {
    res.status(400);
    throw new Error(`Invalid status transition from ${order.orderStatus} to ${orderStatus}`);
  }

  order.orderStatus = orderStatus;
  
  // If moving to delivered and payment was paylater, maybe mark completed?
  // We'll stick to the strict requirement
  
  const updatedOrder = await order.save();

  try {
    socketService.notifyUser(order.userId, ORDER_STATUS_UPDATE, updatedOrder);
  } catch (err) {
    console.error('Socket error on updateOrderStatus:', err.message);
  }

  res.json(updatedOrder);
});

// @desc    Cancel order
// @route   PATCH /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Only the user who created it can cancel it
  if (order.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to cancel this order');
  }

  if (order.orderStatus !== 'placed') {
    res.status(400);
    throw new Error(`Cannot cancel order in status: ${order.orderStatus}`);
  }

  order.orderStatus = 'cancelled';
  
  // Restore stock
  for (const item of order.products) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.stock += item.qty;
      await product.save();
    }
  }

  const updatedOrder = await order.save();

  try {
    socketService.notifyShop(order.shopId, ORDER_CANCELLED, updatedOrder);
  } catch (err) {
    console.error('Socket error on cancelOrder:', err.message);
  }

  res.json(updatedOrder);
});

module.exports = {
  createOrder,
  getUserOrders,
  getShopOrders,
  updateOrderStatus,
  cancelOrder
};
