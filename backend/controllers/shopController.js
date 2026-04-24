const asyncHandler = require('express-async-handler');
const Shop = require('../models/Shop');
const subscriptionService = require('../services/subscriptionService');

const checkSubscription = async (shop) => {
  if (!shop) return null;
  if (shop.isSubscribed) {
    const isValid = await subscriptionService.isShopSubscribed(shop._id);
    if (!isValid) {
      // Expired!
      await subscriptionService.expireSubscription(shop._id);
      shop.isSubscribed = false;
      shop.deliveryOptions.platformDelivery = false;
    }
  }
  return shop;
};

// @desc    Create a new shop
// @route   POST /api/shops
// @access  Private/Shopkeeper
const createShop = asyncHandler(async (req, res) => {
  const { shopName, description, shopImage, location, address, city, pincode, deliveryOptions } = req.body;

  // Prevent one shopkeeper from having multiple shops
  const existingShop = await Shop.findOne({ ownerId: req.user._id });
  if (existingShop) {
    res.status(400);
    throw new Error('Shopkeeper already has a shop');
  }

  // Handle platformDelivery
  let finalDeliveryOptions = deliveryOptions || {};
  // Subscriptions are handled elsewhere, assuming isSubscribed defaults to false
  finalDeliveryOptions.platformDelivery = false; // Block platformDelivery on create unless explicitly subscribed later

  // Parse location
  let geoJsonLocation = { type: 'Point', coordinates: [0, 0] };
  if (location && location.lat !== undefined && location.lng !== undefined) {
    geoJsonLocation = {
      type: 'Point',
      coordinates: [parseFloat(location.lng), parseFloat(location.lat)]
    };
  } else {
    res.status(400);
    throw new Error('Please provide location with lat and lng');
  }

  const shop = new Shop({
    ownerId: req.user._id,
    shopName,
    description,
    shopImage,
    location: geoJsonLocation,
    address,
    city,
    pincode,
    deliveryOptions: finalDeliveryOptions,
    isSubscribed: false, // Default false
  });

  const createdShop = await shop.save();
  res.status(201).json(createdShop);
});

// @desc    Get current shopkeeper's shop
// @route   GET /api/shops/owner
// @access  Private/Shopkeeper
const getMyShop = asyncHandler(async (req, res) => {
  let shop = await Shop.findOne({ ownerId: req.user._id });
  if (shop) {
    shop = await checkSubscription(shop);
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Update current shopkeeper's shop
// @route   PUT /api/shops/me
// @access  Private/Shopkeeper
const updateShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });

  if (shop) {
    shop.shopName = req.body.shopName || shop.shopName;
    shop.description = req.body.description || shop.description;
    shop.shopImage = req.body.shopImage || shop.shopImage;
    shop.address = req.body.address || shop.address;
    shop.city = req.body.city || shop.city;
    shop.pincode = req.body.pincode || shop.pincode;
    
    if (req.body.location && req.body.location.lat && req.body.location.lng) {
      shop.location = {
        type: 'Point',
        coordinates: [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)]
      };
    }

    if (req.body.deliveryOptions) {
      shop.deliveryOptions = { ...shop.deliveryOptions, ...req.body.deliveryOptions };
      // Re-validate platformDelivery against isSubscribed
      if (!shop.isSubscribed) {
        shop.deliveryOptions.platformDelivery = false;
      }
    }

    const updatedShop = await shop.save();
    res.json(updatedShop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Fetch nearby shops
// @route   GET /api/shops/nearby
// @access  Public
const getNearbyShops = asyncHandler(async (req, res) => {
  const { lat, lng, radius = 5 } = req.query; // radius in km

  if (!lat || !lng) {
    res.status(400);
    throw new Error('Please provide latitude and longitude');
  }

  const distanceInMeters = parseFloat(radius) * 1000;

  const shops = await Shop.find({
    location: {
      $near: {
        $maxDistance: distanceInMeters,
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        }
      }
    }
  });

  res.json(shops);
});

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
  let shop = await Shop.findById(req.params.id);

  if (shop) {
    shop = await checkSubscription(shop);
    res.json(shop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

module.exports = {
  createShop,
  getMyShop,
  updateShop,
  getShops,
  getShopById,
  getNearbyShops,
};
