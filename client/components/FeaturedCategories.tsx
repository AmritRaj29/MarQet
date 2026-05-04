"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Laptop, Shirt, Wrench, Utensils, BookOpen, Coffee, Camera } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, color: "bg-blue-500/10 text-blue-500" },
  { name: "Fashion", icon: Shirt, color: "bg-teal-400/10 text-teal-400" },
  { name: "Local Services", icon: Wrench, color: "bg-orange-500/10 text-orange-500" },
  { name: "Food & Dining", icon: Utensils, color: "bg-green-500/10 text-green-500" },
  { name: "Books", icon: BookOpen, color: "bg-cyan-400/10 text-cyan-400" },
  { name: "Cafe", icon: Coffee, color: "bg-yellow-500/10 text-yellow-500" },
  { name: "Photography", icon: Camera, color: "bg-teal-500/10 text-teal-500" },
  { name: "Groceries", icon: ShoppingCart, color: "bg-red-500/10 text-red-500" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Curated Categories</h2>
          <p className="text-xl text-muted-foreground font-light">Explore a world of local commerce, perfectly categorized for your convenience.</p>
        </motion.div>
        <motion.button 
          className="mt-6 md:mt-0 px-6 py-3 rounded-full border border-zinc-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          View Directory &rarr;
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color.replace('text', 'from')} to-transparent rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}></div>
            <div className="h-full flex flex-col items-center justify-center p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-secondary/20 backdrop-blur-sm hover:border-zinc-300 dark:border-white/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-secondary/40">
              <div className={`p-5 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 bg-white/40 border border-zinc-200 dark:border-white/10 ${cat.color}`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground text-center text-lg">{cat.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
