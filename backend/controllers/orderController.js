const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

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

  const order = new Order({
    userId: req.user._id,
    shopId,
    products: orderProducts,
    totalAmount,
    mode: mode || 'pickup',
    paymentType: paymentType || 'cash_pickup',
    deliveryAddress: mode === 'delivery' ? deliveryAddress : undefined
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

module.exports = {
  createOrder,
};
