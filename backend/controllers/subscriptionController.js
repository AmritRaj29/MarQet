const asyncHandler = require('express-async-handler');
const Shop = require('../models/Shop');
const Subscription = require('../models/Subscription');
const subscriptionService = require('../services/subscriptionService');

// @desc    Subscribe shop
// @route   POST /api/subscriptions
// @access  Private (Shopkeeper)
exports.subscribe = asyncHandler(async (req, res) => {
  const { plan } = req.body;
  if (!['basic', 'premium'].includes(plan)) {
    res.status(400);
    throw new Error('Invalid plan selected');
  }

  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found for this user');
  }

  // Simulate payment success
  const sub = await subscriptionService.createSubscription(shop._id, plan);

  res.status(200).json(sub);
});

// @desc    Get my subscription
// @route   GET /api/subscriptions/me
// @access  Private (Shopkeeper)
exports.getMySubscription = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  const sub = await Subscription.findOne({ shopId: shop._id });
  res.status(200).json(sub);
});

// @desc    Cancel subscription
// @route   DELETE /api/subscriptions/me
// @access  Private (Shopkeeper)
exports.cancelSubscription = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  await subscriptionService.expireSubscription(shop._id);

  res.status(200).json({ message: 'Subscription cancelled successfully' });
});
