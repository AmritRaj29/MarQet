const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getShopOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/').post(protect, createOrder);
router.route('/user/:id').get(protect, getUserOrders);
router.route('/shop/:shopId').get(protect, requireRole('shopkeeper'), getShopOrders);
router.route('/:id/status').put(protect, requireRole('shopkeeper'), updateOrderStatus);

module.exports = router;
