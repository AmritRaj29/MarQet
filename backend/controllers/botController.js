const Product = require('../models/Product');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Ensure you have configured the Gemini API Key in your environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

exports.comparePrices = async (req, res) => {
  try {
    const { productQuery } = req.body;

    if (!productQuery) {
      return res.status(400).json({ message: 'Please provide a product to search for.' });
    }

    // 1. Find matching products in the database
    // We do a regex text search to find any products related to the query
    const products = await Product.find({
      $or: [
        { name: { $regex: productQuery, $options: 'i' } },
        { category: { $regex: productQuery, $options: 'i' } }
      ]
    }).populate('shopId', 'shopName city');

    if (products.length === 0) {
      return res.status(200).json({ 
        response: `I couldn't find any local products matching "${productQuery}" right now. Try searching for something else like "Electronics" or "Groceries".` 
      });
    }

    // 2. Prepare data for the Gemini AI
    const productData = products.map(p => ({
      name: p.name,
      price: p.price,
      shop: p.shopId ? p.shopId.shopName : 'Unknown Shop',
      location: p.shopId ? p.shopId.city : 'Local',
      inStock: p.stock > 0
    }));

    // 3. Construct the prompt
    const prompt = `
      You are the MarQet AI Assistant, an expert local shopping guide. 
      The user is asking to compare prices for: "${productQuery}".
      
      Here is the live data from local shops in our database:
      ${JSON.stringify(productData, null, 2)}
      
      Please write a very concise, friendly, and helpful response.
      Specifically:
      1. Mention the lowest price and which shop offers it.
      2. Mention the highest price or other alternatives.
      3. Format it beautifully with markdown (bullet points or bold text).
      4. Do not make up any data not provided in the JSON. If it says Unknown Shop, just say a local shop.
    `;

    // 4. Call Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text, rawData: productData });

  } catch (error) {
    console.error("AI Bot Error:", error);
    res.status(500).json({ message: 'Failed to process AI request', error: error.message });
  }
};
