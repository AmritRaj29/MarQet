"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

const sellers = [
  { id: "s1", name: "Fresh Farms Grocery", emoji: "🍎", category: "Groceries", rating: 4.8, reviews: 3420, distance: "1.2 km", orders: "10k+", color: "bg-emerald-500" },
  { id: "s2", name: "Tech Haven", emoji: "💻", category: "Electronics", rating: 4.6, reviews: 1890, distance: "3.5 km", orders: "5k+", color: "bg-blue-500" },
  { id: "s3", name: "The Daily Bread", emoji: "🥐", category: "Bakery", rating: 4.9, reviews: 850, distance: "0.8 km", orders: "8k+", color: "bg-yellow-600" },
  { id: "s4", name: "Style Hub", emoji: "👗", category: "Fashion", rating: 4.5, reviews: 2100, distance: "2.1 km", orders: "4k+", color: "bg-teal-400" },
  { id: "s5", name: "Urban Jungle", emoji: "🪴", category: "Plants", rating: 4.7, reviews: 420, distance: "4.0 km", orders: "2k+", color: "bg-green-600" },
  { id: "s6", name: "Beauty Spot", emoji: "✨", category: "Beauty", rating: 4.8, reviews: 3100, distance: "1.5 km", orders: "12k+", color: "bg-cyan-400" },
];

export default function TopSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8">
      <div className="relative">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 px-2">Top Sellers Near You</h2>

        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-[60%] -translate-y-1/2 w-10 h-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-900 dark:text-white" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-[60%] -translate-y-1/2 w-10 h-20 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 text-zinc-900 dark:text-white" />
        </button>

        {/* Shops */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar scroll-smooth px-2"
        >
          {sellers.map((shop) => (
            <div key={shop.id} className="min-w-[260px] w-[260px] bg-gray-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden group hover:-translate-y-1 transition-transform shadow-lg">
              {/* Banner */}
              <div className={`h-16 ${shop.color} bg-opacity-20 flex items-center justify-center relative border-b border-zinc-200 dark:border-white/10`}>
                <span className="text-3xl absolute -bottom-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  {shop.emoji}
                </span>
              </div>
              
              {/* Info */}
              <div className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <h3 className="text-zinc-900 dark:text-white font-bold text-[15px] leading-tight mb-0.5">{shop.name}</h3>
                <span className="text-zinc-500 dark:text-white/50 text-[11px] mb-2">{shop.category}</span>
                
                <div className="flex items-center gap-3 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    <span className="text-zinc-900 dark:text-white font-medium">{shop.rating}</span>
                    <span className="text-zinc-400 dark:text-white/40">({shop.reviews})</span>
                  </div>
                  <div className="w-1 h-1 bg-black/20 rounded-full" />
                  <div className="flex items-center gap-1 text-zinc-700 dark:text-white/70">
                    <ShoppingBag className="w-3 h-3" />
                    <span>{shop.orders} orders</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-600 dark:text-white/60 mb-4 bg-black/5 px-2 py-1 rounded-sm">
                  <MapPin className="w-3 h-3" />
                  <span>{shop.distance}</span>
                </div>

                <Link href={`/shop/${shop.id}`} className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Enter Storefront <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
