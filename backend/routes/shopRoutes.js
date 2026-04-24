const express = require('express');
const router = express.Router();
const { getShops, getShopById, getNearbyShops, createShop, getMyShop, updateShop } = require('../controllers/shopController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/nearby').get(getNearbyShops);
router.route('/me').get(protect, requireRole('shopkeeper'), getMyShop).put(protect, requireRole('shopkeeper'), updateShop);
router.route('/').get(getShops).post(protect, requireRole('shopkeeper'), createShop);
router.route('/:id').get(getShopById);

module.exports = router;
