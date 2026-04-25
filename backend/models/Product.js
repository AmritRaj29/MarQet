const mongoose = require('mongoose');
const { normalizeProduct } = require('../utils/normalizeProduct');

const productSchema = new mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    normalizedName: {
      type: String,
      index: true,
    },
    description: String,
    category: String,
    price: {
      type: Number,
      required: true,
    },
    discountPrice: Number,
    stock: {
      type: Number,
      default: 0,
    },
    images: [String],
    video: String,
    tags: [String],
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.normalizedName = normalizeProduct(this.name);
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
