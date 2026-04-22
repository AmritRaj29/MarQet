const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ['self', 'platform', null],
      default: null,
    },
    paymentType: {
      type: String,
      enum: ['cash_pickup', 'cash_delivery', 'upi', 'paylater'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'packed', 'ready', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
    },
    payLaterStatus: {
      type: String,
      enum: ['none', 'pending_approval', 'approved', 'rejected'],
      default: 'none',
    },
    deliveryAddress: {
      type: String,
      required: function () {
        return this.mode === 'delivery';
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
