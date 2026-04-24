const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');
const Shop = require('../models/Shop');

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

module.exports = {
  aiSearch,
};
