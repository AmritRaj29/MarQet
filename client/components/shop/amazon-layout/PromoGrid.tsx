"use client";

import Link from "next/link";

const blocks = [
  {
    title: "Revamp Your Home 🏠",
    items: [
      { name: "Decor", emoji: "🖼️" },
      { name: "Lighting", emoji: "💡" },
      { name: "Bedding", emoji: "🛏️" },
      { name: "Furniture", emoji: "🛋️" },
    ],
    link: "See home deals →"
  },
  {
    title: "Electronics Deals ⚡",
    items: [
      { name: "Laptops", emoji: "💻" },
      { name: "Audio", emoji: "🎧" },
      { name: "Cameras", emoji: "📷" },
      { name: "Wearables", emoji: "⌚" },
    ],
    link: "See electronics deals →"
  },
  {
    title: "Fresh Groceries 🌽",
    items: [
      { name: "Vegetables", emoji: "🥬" },
      { name: "Fruits", emoji: "🍎" },
      { name: "Dairy", emoji: "🥛" },
      { name: "Meat", emoji: "🥩" },
    ],
    link: "See grocery deals →"
  },
  {
    title: "Bestselling Books 📚",
    items: [
      { name: "Fiction", emoji: "📖" },
      { name: "Self-Help", emoji: "🧘" },
      { name: "Comics", emoji: "🦸" },
      { name: "Sci-Fi", emoji: "🚀" },
    ],
    link: "See book deals →"
  }
];

export default function PromoGrid() {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks.map((block, idx) => (
          <div key={idx} className="bg-gray-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-xl p-5 flex flex-col shadow-lg">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">{block.title}</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
              {block.items.map((item, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 dark:bg-zinc-800 hover:border-teal-400/30 transition-colors">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-xs text-zinc-700 dark:text-white/70 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
            
            <Link href="#" className="text-[13px] font-bold text-blue-400 hover:text-teal-300 hover:underline transition-colors mt-auto">
              {block.link}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
