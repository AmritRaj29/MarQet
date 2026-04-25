const express = require('express');
const router = express.Router();
const { aiSearch, searchProducts, compareProduct } = require('../controllers/searchController');

router.route('/').get(searchProducts);
router.route('/compare').get(compareProduct);
router.route('/ai').get(aiSearch);

module.exports = router;
