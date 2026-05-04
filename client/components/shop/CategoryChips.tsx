"use client";

import { motion } from "framer-motion";
import { 
  Store, 
  ShoppingCart, 
  Milk, 
  Croissant, 
  Apple, 
  Carrot, 
  Cookie, 
  Coffee 
} from "lucide-react";

const categories = [
  { id: "all", name: "All", icon: Store },
  { id: "grocery", name: "Grocery", icon: ShoppingCart },
  { id: "dairy", name: "Dairy", icon: Milk },
  { id: "bakery", name: "Bakery", icon: Croissant },
  { id: "fruits", name: "Fruits", icon: Apple },
  { id: "veggies", name: "Veggies", icon: Carrot },
  { id: "snacks", name: "Snacks", icon: Cookie },
  { id: "beverages", name: "Beverages", icon: Coffee },
];

interface CategoryChipsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryChips({ activeCategory, onSelectCategory }: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 hide-scrollbar">
      <div className="flex gap-3 px-4 md:px-0 w-max">
        {categories.map((cat, index) => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border ${
                isActive 
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 border-transparent text-zinc-900 dark:text-white shadow-lg shadow-teal-400/20 scale-105" 
                  : "bg-black/5 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white/70 hover:bg-black/10 hover:text-zinc-900 dark:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-white/50"}`} />
              <span className="font-semibold text-sm whitespace-nowrap">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
