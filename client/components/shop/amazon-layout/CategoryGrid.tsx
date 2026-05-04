"use client";

const categories = [
  { name: "Groceries", emoji: "🥦", hoverColor: "hover:bg-emerald-500/20 hover:border-emerald-500/50" },
  { name: "Electronics", emoji: "💻", hoverColor: "hover:bg-blue-500/20 hover:border-blue-500/50" },
  { name: "Fashion", emoji: "👗", hoverColor: "hover:bg-teal-400/20 hover:border-teal-400/50" },
  { name: "Books", emoji: "📚", hoverColor: "hover:bg-amber-500/20 hover:border-amber-500/50" },
  { name: "Home & Kitchen", emoji: "🏠", hoverColor: "hover:bg-orange-500/20 hover:border-orange-500/50" },
  { name: "Bakery", emoji: "🍞", hoverColor: "hover:bg-yellow-500/20 hover:border-yellow-500/50" },
  { name: "Plants", emoji: "🌿", hoverColor: "hover:bg-green-500/20 hover:border-green-500/50" },
  { name: "Beauty", emoji: "💄", hoverColor: "hover:bg-rose-500/20 hover:border-rose-500/50" },
];

export default function CategoryGrid() {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 mt-6">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className={`flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${cat.hoverColor} group`}
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
            <span className="text-zinc-900 dark:text-white text-xs font-bold text-center leading-tight">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
