const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
const socketService = require('../services/socketService');
const { PAYLATER_APPROVED, PAYLATER_REJECTED } = require('../sockets/orderSocket');

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
    res.status(400);
    throw new Error('Missing required payment details');
  }

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(sign.toString())
    .digest('hex');

  if (razorpay_signature === expectedSign) {
    // Payment is authentic
    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = 'completed';
      order.orderStatus = 'packed'; // or whatever the next logical state is
      const updatedOrder = await order.save();
      
      res.json({ message: 'Payment verified successfully', order: updatedOrder });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } else {
    res.status(400);
    throw new Error('Invalid payment signature');
  }
});

// @desc    Approve PayLater request
// @route   PATCH /api/payments/paylater/:orderId/approve
// @access  Private/Shopkeeper
const approvePayLater = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Verify order belongs to shopkeeper's shop
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop || order.shopId.toString() !== shop._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to approve paylater for this order');
  }

  if (order.paymentType !== 'paylater' || order.payLaterStatus !== 'pending_approval') {
    res.status(400);
    throw new Error('Order is not pending paylater approval');
  }

  order.payLaterStatus = 'approved';
  // Note: orderStatus might still be 'placed', it transitions normally from here on.
  await order.save();

  // Update user credit history and balance
  const user = await User.findById(order.userId);
  if (user) {
    user.creditHistory.push({
      shopId: order.shopId,
      amount: order.totalAmount,
      date: Date.now(),
      status: 'pending'
    });
    user.creditBalance += order.totalAmount;
    await user.save();
  }

  try {
    socketService.notifyUser(order.userId, PAYLATER_APPROVED, order);
  } catch (err) {
    console.error('Socket error on approvePayLater:', err.message);
  }

  res.json(order);
});

// @desc    Reject PayLater request
// @route   PATCH /api/payments/paylater/:orderId/reject
// @access  Private/Shopkeeper
const rejectPayLater = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop || order.shopId.toString() !== shop._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to reject paylater for this order');
  }

  if (order.paymentType !== 'paylater' || order.payLaterStatus !== 'pending_approval') {
    res.status(400);
    throw new Error('Order is not pending paylater approval');
  }

  order.payLaterStatus = 'rejected';
  order.orderStatus = 'cancelled';
  
  // Restore stock
  for (const item of order.products) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.stock += item.qty;
      await product.save();
    }
  }

  await order.save();

  try {
    socketService.notifyUser(order.userId, PAYLATER_REJECTED, order);
  } catch (err) {
    console.error('Socket error on rejectPayLater:', err.message);
  }

  res.json(order);
});

// @desc    Repay credit
// @route   POST /api/payments/credit/repay
// @access  Private
const repayCredit = asyncHandler(async (req, res) => {
  const { shopId, amount } = req.body;

  if (!shopId || !amount) {
    res.status(400);
    throw new Error('Missing shopId or amount');
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Find matching credit entries for that shop with status="pending"
  let remainingAmount = amount;
  let modified = false;

  for (let i = 0; i < user.creditHistory.length; i++) {
    const entry = user.creditHistory[i];
    if (entry.shopId.toString() === shopId && entry.status === 'pending') {
      // If we are just marking all as paid for simplicity as per prompt "Mark entries as "paid""
      // or should we deduct exact amount? 
      // "Reduce user.creditBalance, Mark entries as 'paid'"
      // We will mark it as paid if it's covered.
      if (remainingAmount >= entry.amount) {
        remainingAmount -= entry.amount;
        entry.status = 'paid';
        modified = true;
      } else if (remainingAmount > 0) {
        // Partial payment for this entry, reduce amount and leave pending, or split?
        // Let's assume the user repays the exact amount of specific orders, or we split it.
        // For simplicity: subtract from entry amount.
        entry.amount -= remainingAmount;
        remainingAmount = 0;
        modified = true;
      }
    }
  }

  if (modified) {
    // Actually, prompt says: "Reduce user.creditBalance. Mark entries as paid".
    // A simpler approach: user repays a bulk amount.
    user.creditBalance -= (amount - remainingAmount);
    await user.save();
  }

  res.json({ message: 'Credit repaid successfully', creditBalance: user.creditBalance });
});

// @desc    Get credit history
// @route   GET /api/payments/credit
// @access  Private
const getCreditHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('creditHistory.shopId', 'shopName shopImage');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json({
    creditBalance: user.creditBalance,
    creditHistory: user.creditHistory
  });
});

module.exports = {
  verifyPayment,
  approvePayLater,
  rejectPayLater,
  repayCredit,
  getCreditHistory
};
