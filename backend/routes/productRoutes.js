const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, requireSeller } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, requireSeller, createProduct);
router.route('/:id').get(getProductById).put(protect, requireSeller, updateProduct).delete(protect, requireSeller, deleteProduct);

module.exports = router;
