const Subscription = require('../models/Subscription');
const Shop = require('../models/Shop');

exports.createSubscription = async (shopId, plan) => {
  let days = 30;
  let amount = 0;
  if (plan === 'basic') {
    days = 30;
    amount = 29; // example cost
  } else if (plan === 'premium') {
    days = 90;
    amount = 79;
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);

  // Upsert subscription
  let sub = await Subscription.findOne({ shopId });
  if (sub) {
    sub.plan = plan;
    sub.isActive = true;
    sub.expiryDate = expiryDate;
    sub.amountPaid = amount;
    await sub.save();
  } else {
    sub = await Subscription.create({
      shopId,
      plan,
      isActive: true,
      expiryDate,
      amountPaid: amount
    });
  }

  // Update shop
  await Shop.findByIdAndUpdate(shopId, {
    isSubscribed: true,
    'deliveryOptions.platformDelivery': true // Set eligible
  });

  return sub;
};

exports.isShopSubscribed = async (shopId) => {
  const sub = await Subscription.findOne({ shopId });
  return sub?.isValid() ?? false;
};

exports.expireSubscription = async (shopId) => {
  const sub = await Subscription.findOne({ shopId });
  if (sub) {
    sub.isActive = false;
    await sub.save();
  }

  await Shop.findByIdAndUpdate(shopId, {
    isSubscribed: false,
    'deliveryOptions.platformDelivery': false
  });
};
