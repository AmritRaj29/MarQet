const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getShopProducts, createProduct, updateProduct, deleteProduct, generateProductDescription } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.route('/generate-description').post(protect, requireRole('shopkeeper'), generateProductDescription);
router.route('/shop/:shopId').get(getShopProducts);
router.route('/').get(getProducts).post(protect, requireRole('shopkeeper'), createProduct);
router.route('/:id').get(getProductById).put(protect, requireRole('shopkeeper'), updateProduct).delete(protect, requireRole('shopkeeper'), deleteProduct);

module.exports = router;
