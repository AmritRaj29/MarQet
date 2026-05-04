"use client";

import { useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const deals = [
  { id: "1", emoji: "🎧", name: "Wireless Noise-Cancelling Headphones", seller: "TechStore", rating: 4.8, reviews: 1245, price: 2999, originalPrice: 5999, discount: 50, tag: "Best Seller" },
  { id: "2", emoji: "👟", name: "Running Shoes - Light & Breathable", seller: "FitGear", rating: 4.5, reviews: 890, price: 1499, originalPrice: 2499, discount: 40, tag: "Trending" },
  { id: "3", emoji: "🥑", name: "Fresh Hass Avocados (Pack of 4)", seller: "GreenMart", rating: 4.9, reviews: 320, price: 299, originalPrice: 450, discount: 33, tag: "Fresh" },
  { id: "4", emoji: "⌚", name: "Smart Fitness Watch Series 7", seller: "GadgetHub", rating: 4.6, reviews: 2100, price: 1999, originalPrice: 3999, discount: 50, tag: "Deal of the Day" },
  { id: "5", emoji: "🧴", name: "Organic Hydrating Face Serum", seller: "GlowBeauty", rating: 4.7, reviews: 560, price: 799, originalPrice: 1200, discount: 33, tag: "Popular" },
  { id: "6", emoji: "🎒", name: "Waterproof Travel Backpack", seller: "Wanderlust", rating: 4.4, reviews: 430, price: 899, originalPrice: 1500, discount: 40, tag: "Limited Time" },
  { id: "7", emoji: "🎮", name: "Wireless Gaming Controller", seller: "GameZone", rating: 4.8, reviews: 1800, price: 2499, originalPrice: 3500, discount: 28, tag: "Best Seller" },
  { id: "8", emoji: "🪴", name: "Indoor Snake Plant with Pot", seller: "GreenThumb", rating: 4.9, reviews: 150, price: 399, originalPrice: 600, discount: 33, tag: "New" },
];

interface TodaysDealsProps {
  onAddToCart: (name: string) => void;
}

export default function TodaysDeals({ onAddToCart }: TodaysDealsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=100", // placeholder
      shopId: "shop-" + product.seller,
      shopName: product.seller,
    });
    onAddToCart(product.name);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8">
      <div className="bg-gray-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 relative">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Today's Deals</h2>
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-3 py-1 rounded-sm text-xs font-bold tracking-widest">
            ENDS IN 06:42:18
          </div>
        </div>

        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-900 dark:text-white" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 text-zinc-900 dark:text-white" />
        </button>

        {/* Products */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar scroll-smooth"
        >
          {deals.map((deal) => (
            <div key={deal.id} className="min-w-[220px] w-[220px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl p-3 group hover:border-teal-400/30 transition-colors flex flex-col">
              {/* Image Area */}
              <div className="bg-gray-100 dark:bg-zinc-800 h-[180px] rounded-lg mb-3 relative flex items-center justify-center overflow-hidden">
                <span className="text-[80px] group-hover:scale-110 transition-transform">{deal.emoji}</span>
                <span className="absolute top-2 left-2 bg-red-600 text-zinc-900 dark:text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  {deal.discount}% off
                </span>
                <button 
                  onClick={() => toggleWishlist(deal.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/40 rounded-full hover:bg-white/60 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wishlist[deal.id] ? "fill-red-500 text-red-500" : "text-zinc-900 dark:text-white"}`} />
                </button>
                <span className="absolute bottom-2 left-2 bg-teal-400 text-zinc-900 dark:text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                  {deal.tag}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1">
                <h3 className="text-zinc-900 dark:text-white text-sm font-medium line-clamp-2 leading-tight mb-1">{deal.name}</h3>
                <p className="text-zinc-500 dark:text-white/50 text-[11px] mb-1">{deal.seller}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-zinc-900 dark:text-white text-xs">{deal.rating}</span>
                  <span className="text-blue-400 text-[10px]">({deal.reviews.toLocaleString()})</span>
                </div>

                <div className="mt-auto pt-2 flex flex-col gap-2">
                  <div className="flex items-end gap-1.5">
                    <span className="text-red-500 font-medium text-lg leading-none">₹{deal.price.toLocaleString()}</span>
                    <span className="text-zinc-400 dark:text-white/40 text-xs line-through leading-none">₹{deal.originalPrice.toLocaleString()}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(deal)}
                    className="w-full py-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-zinc-900 dark:text-white text-xs font-bold rounded-full transition-all shadow-md active:scale-95"
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
