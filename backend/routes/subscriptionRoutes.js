const express = require('express');
const router = express.Router();
const { subscribe, getMySubscription, cancelSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, requireRole('shopkeeper'), subscribe);

router.route('/me')
  .get(protect, requireRole('shopkeeper'), getMySubscription)
  .delete(protect, requireRole('shopkeeper'), cancelSubscription);

module.exports = router;
