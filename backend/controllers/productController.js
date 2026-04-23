const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Shop = require('../models/Shop');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const { lat, lng, distance = 5000 } = req.query;
  let shopFilter = {};

  if (lat && lng) {
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $maxDistance: parseInt(distance),
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          }
        }
      }
    }).select('_id');
    
    const shopIds = nearbyShops.map(shop => shop._id);
    shopFilter = { shopId: { $in: shopIds } };
  }

  const products = await Product.find({ ...keyword, ...shopFilter }).populate('shopId', 'shopName shopImage');
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('shopId', 'shopName shopImage');

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
};
