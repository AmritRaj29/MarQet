const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ['basic', 'premium'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    amountPaid: Number,
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.methods.isValid = function () {
  return this.isActive && this.expiryDate > new Date();
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
