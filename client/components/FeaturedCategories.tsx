"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Laptop, Shirt, Wrench, Utensils, BookOpen, Coffee, Camera } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, color: "bg-blue-500/10 text-blue-500" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-500/10 text-pink-500" },
  { name: "Local Services", icon: Wrench, color: "bg-orange-500/10 text-orange-500" },
  { name: "Food & Dining", icon: Utensils, color: "bg-green-500/10 text-green-500" },
  { name: "Books", icon: BookOpen, color: "bg-purple-500/10 text-purple-500" },
  { name: "Cafe", icon: Coffee, color: "bg-yellow-500/10 text-yellow-500" },
  { name: "Photography", icon: Camera, color: "bg-teal-500/10 text-teal-500" },
  { name: "Groceries", icon: ShoppingCart, color: "bg-red-500/10 text-red-500" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground">Find exactly what you are looking for in your local neighborhood. From fresh food to freelance services, we have it all.</p>
        </div>
        <button className="mt-4 md:mt-0 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          View All Categories &rarr;
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="h-full flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
              <div className={`p-4 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 ${cat.color}`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground text-center">{cat.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
