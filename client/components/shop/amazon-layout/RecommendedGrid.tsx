"use client";

import { Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const products = [
  { id: "r1", name: "Ultra-Soft Cotton Bath Towel", emoji: "🧖‍♀️", rating: 4.5, reviews: 342, price: 499, originalPrice: 799, tag: "Prime" },
  { id: "r2", name: "Ceramic Coffee Mug Set (4 pcs)", emoji: "☕", rating: 4.8, reviews: 1024, price: 599, originalPrice: 999, tag: "Popular" },
  { id: "r3", name: "Aromatherapy Essential Oil Diffuser", emoji: "🌸", rating: 4.6, reviews: 856, price: 1299, originalPrice: 1999, tag: "Bestseller" },
  { id: "r4", name: "Premium Yoga Mat with Alignment Lines", emoji: "🧘", rating: 4.9, reviews: 2100, price: 899, originalPrice: 1499, tag: "New" },
  { id: "r5", name: "Stainless Steel Water Bottle 1L", emoji: "💧", rating: 4.7, reviews: 1560, price: 699, originalPrice: 999, tag: "Prime" },
  { id: "r6", name: "Wireless Bluetooth Earbuds", emoji: "🎵", rating: 4.4, reviews: 3210, price: 1499, originalPrice: 2999, tag: "Trending" },
  { id: "r7", name: "Adjustable Laptop Stand", emoji: "💻", rating: 4.8, reviews: 940, price: 899, originalPrice: 1500, tag: "Popular" },
  { id: "r8", name: "Organic Green Tea Bags (50 pcs)", emoji: "🍵", rating: 4.6, reviews: 670, price: 349, originalPrice: 450, tag: "Prime" },
];

interface RecommendedGridProps {
  onAddToCart: (name: string) => void;
}

export default function RecommendedGrid({ onAddToCart }: RecommendedGridProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any) => {
    addItem({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=100", // placeholder
      shopId: "shop-marqet",
      shopName: "MarQet Warehouse",
    });
    onAddToCart(product.name);
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8">
      <div className="bg-gray-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-white/10">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Recommended for You</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-4 flex flex-col group hover:-translate-y-1 hover:border-teal-400/30 transition-all shadow-lg">
              {/* Image Area */}
              <div className="bg-gray-100 dark:bg-zinc-800 h-40 rounded-lg mb-4 relative flex items-center justify-center overflow-hidden">
                <span className="text-[60px] group-hover:scale-110 transition-transform">{product.emoji}</span>
                <span className="absolute top-2 left-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-zinc-900 dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-md">
                  {product.tag}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1">
                <h3 className="text-zinc-900 dark:text-white text-sm font-medium line-clamp-2 leading-snug mb-1">{product.name}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-zinc-300 dark:text-white/20"}`} />
                  ))}
                  <span className="text-blue-400 text-[11px] ml-1">{product.reviews.toLocaleString()}</span>
                </div>

                <div className="mt-auto pt-2 flex flex-col gap-2">
                  <div className="flex items-end gap-1.5">
                    <span className="text-red-500 font-medium text-lg leading-none">₹{product.price.toLocaleString()}</span>
                    <span className="text-zinc-400 dark:text-white/40 text-[11px] line-through leading-none">M.R.P: ₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 bg-gradient-to-r from-teal-400 to-cyan-400 hover:opacity-90 text-zinc-900 dark:text-white text-sm font-bold rounded-lg transition-all shadow-md active:scale-95 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
