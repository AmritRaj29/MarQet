const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    description: String,
    shopImage: String,
    banner: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    address: String,
    city: String,
    pincode: String,
    deliveryOptions: {
      pickup: { type: Boolean, default: true },
      selfDelivery: { type: Boolean, default: false },
      platformDelivery: { type: Boolean, default: false },
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    businessHours: String,
    gstNumber: String,
    earnings: {
      total: { type: Number, default: 0 },
      thisMonth: { type: Number, default: 0 },
      pendingPayout: { type: Number, default: 0 },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

shopSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Shop', shopSchema);
