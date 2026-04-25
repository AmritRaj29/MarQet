const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { normalizeProduct, getAllSynonyms } = require('../utils/normalizeProduct');
const { haversineDistance } = require('../utils/distanceCalculator');

exports.searchProducts = async ({ query, userLat, userLng, radiusKm = 5 }) => {
  if (!query) return [];

  // 1. Process query
  const canonical = normalizeProduct(query);
  const synonyms = getAllSynonyms(canonical);

  // 2. Find nearby shops
  let shopFilter = {};
  if (userLat && userLng) {
    const radiusMeters = radiusKm * 1000;
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $maxDistance: radiusMeters,
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(userLng), parseFloat(userLat)]
          }
        }
      }
    }).select('_id location shopName isSubscribed');

    if (nearbyShops.length === 0) return [];
    
    // Map them for easy distance calculation later
    const shopMap = {};
    nearbyShops.forEach(shop => {
      shopMap[shop._id.toString()] = shop;
    });

    shopFilter = { shopId: { $in: Object.keys(shopMap) } };
  }

  // 3. Find matching products
  const regexPattern = synonyms.join('|');
  const products = await Product.find({
    ...shopFilter,
    $or: [
      { name: { $regex: regexPattern, $options: 'i' } },
      { normalizedName: { $regex: regexPattern, $options: 'i' } }
    ]
  }).populate('shopId', 'shopName location isSubscribed');

  // 4. Compute distances and format
  let results = products.map(product => {
    const shop = product.shopId;
    let distanceKm = null;

    if (userLat && userLng && shop && shop.location && shop.location.coordinates) {
      distanceKm = haversineDistance(
        parseFloat(userLat),
        parseFloat(userLng),
        shop.location.coordinates[1], // lat
        shop.location.coordinates[0]  // lng
      );
    }

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images && product.images.length > 0 ? product.images[0] : null,
      shopId: shop ? shop._id : null,
      shopName: shop ? shop.shopName : 'Unknown Shop',
      distanceKm: distanceKm ? parseFloat(distanceKm.toFixed(2)) : null,
      isFastDelivery: shop ? shop.isSubscribed : false,
    };
  });

  // 5. Sort by price
  results.sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    return priceA - priceB;
  });

  // Mark cheapest
  if (results.length > 0) {
    results[0].isCheapest = true;
  }

  return results;
};