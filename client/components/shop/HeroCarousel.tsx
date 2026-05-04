"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Fresh Morning Deals",
    subtitle: "Up to 40% OFF on Dairy & Bakery",
    cta: "Shop Now",
    gradient: "from-pink-500/20 via-purple-500/20 to-indigo-500/20",
    border: "border-teal-400/20",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Weekly Grocery Haul",
    subtitle: "Free Delivery on orders above ₹500",
    cta: "Explore Staples",
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    border: "border-emerald-500/20",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "AI Price Compare",
    subtitle: "Find the absolute cheapest prices nearby.",
    cta: "Try AI Search",
    gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    border: "border-blue-500/20",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800",
    isAi: true,
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[250px] md:h-[300px] lg:h-[400px] rounded-3xl overflow-hidden mt-6">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Parallax effect simulation */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={banners[currentIndex].image} 
              alt={banners[currentIndex].title}
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          
          {/* Gradients */}
          <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentIndex].gradient}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 z-10">
            {banners[currentIndex].isAi && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/10 backdrop-blur-md rounded-full text-xs font-bold text-zinc-900 dark:text-white w-fit mb-4 border border-zinc-300 dark:border-white/20"
              >
                <Sparkles className="w-3 h-3 text-pink-400" /> Powered by Gemini
              </motion.div>
            )}
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight"
            >
              {banners[currentIndex].title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-zinc-800 dark:text-white/90 text-base md:text-xl max-w-lg mb-6 font-medium"
            >
              {banners[currentIndex].subtitle}
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-full w-fit hover:scale-105 transition-transform"
            >
              {banners[currentIndex].cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full h-2 ${
              idx === currentIndex ? "w-8 bg-white dark:bg-zinc-900" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
