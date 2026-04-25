const express = require('express');
const router = express.Router();
const { 
  verifyPayment, 
  approvePayLater, 
  rejectPayLater, 
  repayCredit, 
  getCreditHistory 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/verify').post(protect, verifyPayment);

// PayLater approval routes
router.route('/paylater/:orderId/approve').patch(protect, requireRole('shopkeeper'), approvePayLater);
router.route('/paylater/:orderId/reject').patch(protect, requireRole('shopkeeper'), rejectPayLater);

// Credit history and repayment routes
router.route('/credit/repay').post(protect, repayCredit);
router.route('/credit').get(protect, getCreditHistory);

module.exports = router;
