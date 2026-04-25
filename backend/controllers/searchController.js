const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const searchService = require('../services/searchService');

// @desc    Perform AI-powered search
// @route   GET /api/search/ai
// @access  Public
const aiSearch = asyncHandler(async (req, res) => {
  const { query, lat, lng } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500);
    throw new Error('Gemini API key is not configured');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI assistant for a hyperlocal marketplace called MarQet.
    Analyze the following user search query: "${query}"
    Extract the following information in JSON format ONLY:
    {
      "keywords": ["list", "of", "search", "keywords"],
      "category": "product category if specified, else null",
      "distance": "number in meters if mentioned (like nearby=5000, 10km=10000), else null"
    }
    Respond ONLY with the JSON string, no markdown formatting or extra text.`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean up potential markdown formatting from Gemini
    if (text.startsWith('```json')) {
      text = text.substring(7, text.length - 3);
    } else if (text.startsWith('```')) {
      text = text.substring(3, text.length - 3);
    }

    const aiAnalysis = JSON.parse(text);

    // Now construct the MongoDB query
    let dbQuery = {};
    
    if (aiAnalysis.keywords && aiAnalysis.keywords.length > 0) {
      dbQuery.name = { $regex: aiAnalysis.keywords.join('|'), $options: 'i' };
    }
    
    if (aiAnalysis.category) {
      dbQuery.category = { $regex: aiAnalysis.category, $options: 'i' };
    }

    let shopFilter = {};
    if (lat && lng) {
      const searchDistance = aiAnalysis.distance || 5000;
      const nearbyShops = await Shop.find({
        location: {
          $near: {
            $maxDistance: searchDistance,
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

    const products = await Product.find({ ...dbQuery, ...shopFilter }).populate('shopId', 'shopName shopImage');
    
    res.json({
      analysis: aiAnalysis,
      products
    });

  } catch (error) {
    console.error('Gemini AI Search Error:', error);
    res.status(500);
    throw new Error('Failed to perform AI search');
  }
});

// @desc    Keyword-based product search with distance
// @route   GET /api/search
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
  const { query, lat, lng, radius } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const results = await searchService.searchProducts({
    query,
    userLat: lat,
    userLng: lng,
    radiusKm: radius ? parseFloat(radius) : 5
  });

  res.json(results);
});

// @desc    Keyword-based product price comparison
// @route   GET /api/search/compare
// @access  Public
const compareProduct = asyncHandler(async (req, res) => {
  const { query, lat, lng, radius } = req.query;

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const results = await searchService.searchProducts({
    query,
    userLat: lat,
    userLng: lng,
    radiusKm: radius ? parseFloat(radius) : 5
  });

  if (results.length === 0) {
    return res.json({
      message: 'No products found to compare.',
      cheapestPrice: null,
      highestPrice: null,
      avgPrice: null,
      nearestShop: null,
      cheapestShop: null,
      results: []
    });
  }

  let cheapestPrice = Number.MAX_VALUE;
  let highestPrice = 0;
  let totalPrice = 0;
  let nearestDistance = Number.MAX_VALUE;
  let nearestShop = null;
  let cheapestShop = null;

  results.forEach(item => {
    const price = item.discountPrice || item.price;
    
    if (price < cheapestPrice) {
      cheapestPrice = price;
      cheapestShop = item.shopName;
    }
    if (price > highestPrice) {
      highestPrice = price;
    }
    totalPrice += price;

    if (item.distanceKm !== null && item.distanceKm < nearestDistance) {
      nearestDistance = item.distanceKm;
      nearestShop = item.shopName;
    }
  });

  const avgPrice = parseFloat((totalPrice / results.length).toFixed(2));

  res.json({
    cheapestPrice,
    highestPrice,
    avgPrice,
    nearestShop,
    cheapestShop,
    results
  });
});

module.exports = {
  aiSearch,
  searchProducts,
  compareProduct,
};
