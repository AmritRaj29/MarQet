const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Shop = require('./models/Shop');
const User = require('./models/User');

dotenv.config();

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marqet'; // Assuming standard local DB if not in env

const seedShops = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing mock data if needed (optional, here we just add)
    // await Shop.deleteMany({});
    
    // Create a mock shopkeeper user
    const mockUser = await User.create({
      name: `Mock Shopkeeper ${Date.now()}`,
      email: `shopkeeper${Date.now()}@example.com`,
      password: 'password123',
      phone: '1234567890',
      role: 'shopkeeper'
    });

    console.log('Created mock shopkeeper:', mockUser._id);

    // Mock locations around Mumbai (Lat: 19.0760, Lng: 72.8777)
    // We add slight random variations to spread them out
    const baseLat = 19.0760;
    const baseLng = 72.8777;

    const mockShops = [
      {
        shopName: "Mumbai Fresh Mart",
        description: "Your daily stop for fresh organic vegetables and fruits.",
        city: "Mumbai",
        rating: 4.5,
        isVerified: true,
        banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000",
        shopImage: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
        location: {
          type: "Point",
          coordinates: [baseLng + (Math.random() - 0.5) * 0.1, baseLat + (Math.random() - 0.5) * 0.1]
        }
      },
      {
        shopName: "Tech Gadgets Hub",
        description: "Latest electronics and mobile accessories.",
        city: "Mumbai",
        rating: 4.8,
        isVerified: true,
        banner: "https://images.unsplash.com/photo-1531297172868-cc65a2bd99b9?auto=format&fit=crop&q=80&w=1000",
        shopImage: "https://cdn-icons-png.flaticon.com/512/3176/3176318.png",
        location: {
          type: "Point",
          coordinates: [baseLng + (Math.random() - 0.5) * 0.1, baseLat + (Math.random() - 0.5) * 0.1]
        }
      },
      {
        shopName: "The Bakery Corner",
        description: "Freshly baked bread, cakes, and pastries every morning.",
        city: "Mumbai",
        rating: 4.9,
        isVerified: false,
        banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000",
        shopImage: "https://cdn-icons-png.flaticon.com/512/3081/3081966.png",
        location: {
          type: "Point",
          coordinates: [baseLng + (Math.random() - 0.5) * 0.1, baseLat + (Math.random() - 0.5) * 0.1]
        }
      },
      {
        shopName: "Urban Clothing Co.",
        description: "Trendy streetwear and fashion accessories.",
        city: "Mumbai",
        rating: 4.2,
        isVerified: true,
        banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000",
        shopImage: "https://cdn-icons-png.flaticon.com/512/2956/2956826.png",
        location: {
          type: "Point",
          coordinates: [baseLng + (Math.random() - 0.5) * 0.1, baseLat + (Math.random() - 0.5) * 0.1]
        }
      }
    ];

    for (let shopData of mockShops) {
      const shop = new Shop({
        ownerId: mockUser._id, // Assigning all mock shops to the same mock user for simplicity
        ...shopData,
        address: `${Math.floor(Math.random() * 100)} Main St`,
        pincode: "400001",
        deliveryOptions: { pickup: true, selfDelivery: true, platformDelivery: false }
      });
      await shop.save();
      console.log(`Created shop: ${shop.shopName}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedShops();
