const express = require('express');
const router = express.Router();
const { getShops, getShopById, getNearbyShops } = require('../controllers/shopController');

router.route('/nearby').get(getNearbyShops);
router.route('/').get(getShops);
router.route('/:id').get(getShopById);

module.exports = router;
