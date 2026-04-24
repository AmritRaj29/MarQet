const express = require('express');
const router = express.Router();
const { comparePrices } = require('../controllers/botController');
const { protect } = require('../middleware/authMiddleware');

router.route('/compare').post(protect, comparePrices);

module.exports = router;
