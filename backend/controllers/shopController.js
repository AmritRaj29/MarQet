const asyncHandler = require('express-async-handler');
const Shop = require('../models/Shop');

// @desc    Fetch all shops
// @route   GET /api/shops
// @access  Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({});
  res.json(shops);
});

// @desc    Fetch single shop
// @route   GET /api/shops/:id
// @access  Public
const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Fetch nearby shops
// @route   GET /api/shops/nearby
// @access  Public
const getNearbyShops = asyncHandler(async (req, res) => {
  const { lat, lng, distance = 5000 } = req.query; // default 5km

  if (!lat || !lng) {
    res.status(400);
    throw new Error('Please provide latitude and longitude');
  }

  const shops = await Shop.find({
    location: {
      $near: {
        $maxDistance: parseInt(distance),
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        }
      }
    }
  });

  res.json(shops);
});

module.exports = {
  getShops,
  getShopById,
  getNearbyShops,
};
