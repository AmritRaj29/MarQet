"use client";

import { MapPin } from "lucide-react";

const newShops = [
  { name: "Organic Oasis", category: "Fresh Produce", emoji: "🥬", offer: "20% off first order", location: "Sector 17, Chandigarh" },
  { name: "Gadget Galaxy", category: "Electronics", emoji: "📱", offer: "Free Shipping", location: "Elante Mall, Chandigarh" },
  { name: "The Sweet Tooth", category: "Bakery", emoji: "🧁", offer: "Buy 1 Get 1 Free", location: "Sector 35, Chandigarh" },
  { name: "Pet Paradise", category: "Pet Supplies", emoji: "🐕", offer: "10% off on treats", location: "Sector 22, Chandigarh" },
];

export default function NewShopsGrid() {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8">
      <div className="relative">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 px-2">New Shops in Your Area</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newShops.map((shop, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white dark:bg-zinc-900 transition-colors cursor-pointer group shadow-lg">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shrink-0">
                {shop.emoji}
              </div>
              <div className="flex flex-col">
                <h3 className="text-zinc-900 dark:text-white font-bold text-[15px] leading-tight mb-0.5 group-hover:text-teal-300 transition-colors">{shop.name}</h3>
                <span className="text-zinc-500 dark:text-white/50 text-[11px] mb-1.5">{shop.category}</span>
                <span className="text-emerald-400 text-[11px] font-bold mb-1.5">{shop.offer}</span>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-white/40">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{shop.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
