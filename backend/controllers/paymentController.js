const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Order = require('../models/Order');

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

module.exports = {
  verifyPayment,
};
