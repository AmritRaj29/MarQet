const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Shop = require('../models/Shop');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const { lat, lng, distance = 5000 } = req.query;
  let shopFilter = {};

  if (lat && lng) {
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $maxDistance: parseInt(distance),
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          }
        }
      }
    }).select('_id');
    
    const shopIds = nearbyShops.map(shop => shop._id);
    shopFilter = { shopId: { $in: shopIds } };
  }

  const products = await Product.find({ ...keyword, ...shopFilter }).populate('shopId', 'shopName shopImage');
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('shopId', 'shopName shopImage');

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
const createProduct = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found for this user');
  }

  const { name, description, category, price, stock, images } = req.body;

  const product = new Product({
    shopId: shop._id,
    name,
    description,
    category,
    price,
    stock,
    images: images || [],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
const updateProduct = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found for this user');
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.shopId.toString() !== shop._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this product');
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.images = req.body.images || product.images;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
const deleteProduct = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });

  if (!shop) {
    res.status(404);
    throw new Error('Shop not found for this user');
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.shopId.toString() !== shop._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this product');
    }
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
