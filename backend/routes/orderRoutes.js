const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getShopOrders, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/')
  .post(protect, createOrder);

router.route('/my')
  .get(protect, getUserOrders);

router.route('/shop')
  .get(protect, requireRole('shopkeeper'), getShopOrders);

router.route('/:id/status')
  .patch(protect, requireRole('shopkeeper'), updateOrderStatus);

router.route('/:id/cancel')
  .patch(protect, cancelOrder);

module.exports = router;
