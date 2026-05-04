"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const recent = [
  { id: "rv1", name: "Premium Coffee Beans", emoji: "☕", price: 450 },
  { id: "rv2", name: "Wireless Mouse", emoji: "🖱️", price: 799 },
  { id: "rv3", name: "Yoga Mat", emoji: "🧘", price: 899 },
  { id: "rv4", name: "Desk Lamp", emoji: "💡", price: 599 },
  { id: "rv5", name: "Water Bottle", emoji: "💧", price: 399 },
  { id: "rv6", name: "Notebook Set", emoji: "📓", price: 299 },
  { id: "rv7", name: "Running Socks", emoji: "🧦", price: 199 },
];

export default function RecentlyViewed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8 mb-8">
      <div className="bg-gray-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-white/10 relative shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Recently Viewed</h2>
          <span className="text-teal-400 text-xs font-bold hover:underline cursor-pointer">Clear History</span>
        </div>

        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 w-8 h-12 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-900 dark:text-white" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 w-8 h-12 bg-white/80 dark:bg-zinc-800/80 hover:bg-gray-300 dark:hover:bg-zinc-700 backdrop-blur border border-zinc-200 dark:border-white/10 flex items-center justify-center rounded z-10 shadow-lg hidden md:flex"
        >
          <ChevronRight className="w-5 h-5 text-zinc-900 dark:text-white" />
        </button>

        {/* Products */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar scroll-smooth"
        >
          {recent.map((item) => (
            <div key={item.id} className="min-w-[140px] w-[140px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg p-3 group hover:border-teal-400/30 transition-colors flex flex-col cursor-pointer">
              <div className="bg-gray-100 dark:bg-zinc-800 h-20 rounded-md mb-2 flex items-center justify-center overflow-hidden">
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              </div>
              <h3 className="text-zinc-900 dark:text-white text-xs font-medium line-clamp-2 leading-tight mb-1">{item.name}</h3>
              <span className="text-red-500 font-bold text-sm mt-auto">₹{item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
