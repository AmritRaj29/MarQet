const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Razorpay = require('razorpay');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, mode, paymentType, deliveryAddress } = req.body;

  if (items && items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const shopId = items[0].shopId;

  const orderProducts = items.map(item => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    qty: item.quantity
  }));

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotalAmount = totalAmount + (mode === 'pickup' ? 0 : 5);

  const order = new Order({
    userId: req.user._id,
    shopId,
    products: orderProducts,
    totalAmount: finalTotalAmount,
    mode: mode || 'pickup',
    paymentType: paymentType || 'cash_pickup',
    deliveryAddress: mode === 'delivery' ? deliveryAddress : undefined
  });

  const createdOrder = await order.save();

  if (paymentType === 'upi') {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(finalTotalAmount * 100), // amount in smallest currency unit (paise)
      currency: "USD",
      receipt: createdOrder._id.toString(),
    };

    try {
      const razorpayOrder = await razorpay.orders.create(options);
      res.status(201).json({
        ...createdOrder._doc,
        razorpayOrderId: razorpayOrder.id,
        amount: options.amount,
        currency: options.currency,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
      throw new Error('Failed to create Razorpay order');
    }
  } else {
    res.status(201).json(createdOrder);
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/user/:id
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  // Use req.params.id to find orders. Populate products if necessary
  const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
  // The schema uses `products` but the frontend expects `items`. We will map it.
  const mappedOrders = orders.map(order => {
     const doc = order.toObject();
     doc.items = doc.products.map(p => ({
        productId: { images: [] }, // mock for now, ideally populate from DB
        name: p.name,
        price: p.price,
        quantity: p.qty
     }));
     return doc;
  });
  res.json(mappedOrders);
});

// @desc    Get shop orders
// @route   GET /api/orders/shop/:shopId
// @access  Private/Shopkeeper
const getShopOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ shopId: req.params.shopId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Shopkeeper
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

module.exports = {
  createOrder,
  getUserOrders,
  getShopOrders,
  updateOrderStatus
};
