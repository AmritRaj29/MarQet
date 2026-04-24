const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Shop = require('./models/Shop');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marqet';

const shopDetails = [
  { name: "Organic Oasis", category: "Groceries", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Organic+Oasis&background=10b981&color=fff&size=200" },
  { name: "Tech Haven", category: "Electronics", img: "https://images.unsplash.com/photo-1531297172868-cc65a2bd99b9?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Tech+Haven&background=3b82f6&color=fff&size=200" },
  { name: "Fashion Forward", category: "Clothing", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Fashion+Forward&background=ec4899&color=fff&size=200" },
  { name: "Bookworm's Corner", category: "Books", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Bookworm+Corner&background=f59e0b&color=fff&size=200" },
  { name: "Fitness Factory", category: "Sports", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Fitness+Factory&background=ef4444&color=fff&size=200" },
  { name: "The Artisanal Bakery", category: "Food", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Artisanal+Bakery&background=f97316&color=fff&size=200" },
  { name: "Green Thumb Nursery", category: "Gardening", img: "https://images.unsplash.com/photo-1416879598555-279169600a74?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Green+Thumb&background=84cc16&color=fff&size=200" },
  { name: "Beauty Bliss", category: "Cosmetics", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Beauty+Bliss&background=d946ef&color=fff&size=200" },
  { name: "Home Essentials", category: "Home & Decor", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Home+Essentials&background=6366f1&color=fff&size=200" },
  { name: "Pet Paradise", category: "Pets", img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80", logo: "https://ui-avatars.com/api/?name=Pet+Paradise&background=14b8a6&color=fff&size=200" }
];

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", // headphones
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600", // watch
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", // shoes
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600", // camera
  "https://images.unsplash.com/photo-1505739998589-00fc191ce01d?auto=format&fit=crop&q=80&w=600", // sunglasses
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600", // cosmetics
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600", // apple watch
  "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=600", // perfume
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600", // vans
  "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600"  // laptop
];

const generateProducts = (shopId, category) => {
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const randomImg = productImages[Math.floor(Math.random() * productImages.length)];
    items.push({
      shopId: shopId,
      name: `${category} Item ${i}`,
      description: `Premium quality ${category.toLowerCase()} item.`,
      category: category,
      price: Math.floor(Math.random() * 90) + 10,
      stock: Math.floor(Math.random() * 50) + 10,
      images: [randomImg],
      rating: (Math.random() * 2 + 3).toFixed(1),
    });
  }
  return items;
};

const seedFull = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected for full seeding...');

    // 1. Clear existing data to remove old mock shops
    await Shop.deleteMany({});
    await Product.deleteMany({});
    // Delete only shopkeepers to not delete admin/regular users
    await User.deleteMany({ role: 'shopkeeper' });
    console.log('Cleared existing shopkeepers, shops, and products.');

    const baseLat = 19.0760;
    const baseLng = 72.8777;

    for (let i = 0; i < shopDetails.length; i++) {
      const details = shopDetails[i];
      
      // 2. Create User
      const user = new User({
        name: `${details.name} Owner`,
        email: `shop${i+1}@marqet.com`,
        password: 'password123',
        phone: `987654321${i}`,
        role: 'shopkeeper'
      });
      await user.save();

      // 3. Create Shop
      const shop = new Shop({
        ownerId: user._id,
        shopName: details.name,
        description: `The best place for ${details.category.toLowerCase()} in your local area.`,
        city: "Mumbai",
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
        isVerified: Math.random() > 0.5,
        banner: details.img,
        shopImage: details.logo,
        address: `${i * 10 + 1} Main Street`,
        pincode: "400001",
        deliveryOptions: { pickup: true, selfDelivery: true, platformDelivery: false },
        location: {
          type: "Point",
          coordinates: [baseLng + (Math.random() - 0.5) * 0.1, baseLat + (Math.random() - 0.5) * 0.1]
        }
      });
      await shop.save();

      // 4. Create Products
      const products = generateProducts(shop._id, details.category);
      await Product.insertMany(products);

      console.log(`Created shop ${i+1}: ${details.name} with 5 products.`);
    }

    console.log('Full seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedFull();
