const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { GoogleGenerativeAI } = require('@google/generative-ai');

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

// @desc    Fetch products by shop
// @route   GET /api/products/shop/:shopId
// @access  Public
const getShopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ shopId: req.params.shopId }).populate('shopId', 'shopName shopImage');
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Shopkeeper
const createProduct = asyncHandler(async (req, res) => {
  const shop = await Shop.findOne({ ownerId: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found for this user');
  }

  const { name, description, category, price, discountPrice, stock, images, tags } = req.body;

  const product = new Product({
    shopId: shop._id,
    name,
    description,
    category,
    price,
    discountPrice,
    stock,
    images: images || [],
    tags: tags || [],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Shopkeeper
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
    product.price = req.body.price !== undefined ? req.body.price : product.price;
    product.discountPrice = req.body.discountPrice !== undefined ? req.body.discountPrice : product.discountPrice;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
    product.images = req.body.images || product.images;
    product.tags = req.body.tags || product.tags;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Shopkeeper
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

// @desc    Generate a product description using Gemini AI
// @route   POST /api/products/generate-description
// @access  Private/Shopkeeper
const generateProductDescription = asyncHandler(async (req, res) => {
  const { name, category, keywords } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Product name is required');
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500);
    throw new Error('Gemini API key is not configured');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a compelling, SEO-friendly product description for a product named "${name}". 
    ${category ? `Category: ${category}. ` : ''}
    ${keywords ? `Include these keywords: ${keywords}. ` : ''}
    Keep it concise, engaging, and highlight the value for a hyperlocal marketplace customer. Ensure it's plain text or markdown without excessive formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ description: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500);
    throw new Error('Failed to generate product description');
  }
});

module.exports = {
  getProducts,
  getProductById,
  getShopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  generateProductDescription,
};
