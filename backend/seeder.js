require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Shop = require('./models/Shop');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Shop.deleteMany();
    await User.deleteMany();

    console.log('Old Data Destroyed!');

    // Create a mock Shopkeeper User
    const shopkeeper = await User.create({
      name: 'Admin Shopkeeper',
      email: 'admin@marqet.com',
      password: 'password123',
      phone: '1234567890',
      role: 'shopkeeper',
    });

    console.log('Shopkeeper Created!');

    // Create mock Shops
    const shops = await Shop.insertMany([
      {
        ownerId: shopkeeper._id,
        shopName: 'Tech Haven',
        description: 'Your one-stop shop for local electronics and gadgets.',
        shopImage: 'https://images.unsplash.com/photo-1550009158-9effb64fda70?auto=format&fit=crop&q=80&w=600',
        banner: 'https://images.unsplash.com/photo-1550009158-9effb64fda70?auto=format&fit=crop&q=80&w=1200',
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        address: '123 Tech Street',
        city: 'New Delhi',
        rating: 4.8,
        isVerified: true,
      },
      {
        ownerId: shopkeeper._id,
        shopName: 'Fresh Groceries Daily',
        description: 'Organic and fresh vegetables delivered to your door.',
        shopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
        banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        address: '45 Green Avenue',
        city: 'New Delhi',
        rating: 4.5,
        isVerified: true,
      },
      {
        ownerId: shopkeeper._id,
        shopName: 'Boutique Fashion',
        description: 'Handmade local clothing and accessories.',
        shopImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=600',
        banner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
        location: { type: 'Point', coordinates: [77.2090, 28.6139] },
        address: '88 Style Road',
        city: 'New Delhi',
        rating: 4.9,
        isVerified: true,
      }
    ]);

    console.log('Shops Created!');

    // Create mock Products
    const products = await Product.insertMany([
      {
        shopId: shops[0]._id,
        name: 'Wireless Noise-Canceling Headphones',
        description: 'Premium quality audio for daily commute.',
        category: 'Electronics',
        price: 199.99,
        stock: 15,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'],
        rating: 4.7,
      },
      {
        shopId: shops[0]._id,
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches.',
        category: 'Electronics',
        price: 89.99,
        stock: 30,
        images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400'],
        rating: 4.5,
      },
      {
        shopId: shops[1]._id,
        name: 'Organic Apples (1kg)',
        description: 'Freshly picked organic apples from local farms.',
        category: 'Groceries',
        price: 4.99,
        stock: 100,
        images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=400'],
        rating: 4.8,
      },
      {
        shopId: shops[1]._id,
        name: 'Whole Wheat Bread',
        description: 'Fresh baked daily.',
        category: 'Groceries',
        price: 2.49,
        stock: 50,
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'],
        rating: 4.6,
      },
      {
        shopId: shops[2]._id,
        name: 'Vintage Denim Jacket',
        description: 'Classic fit denim jacket.',
        category: 'Fashion',
        price: 59.99,
        stock: 10,
        images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400'],
        rating: 4.9,
      }
    ]);

    console.log('Products Created!');
    console.log('Seeding Complete! 🎉');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
