"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Starting ₹99",
    subtitle: "Stock up on daily fresh groceries and essentials.",
    badge: "🔥 Today Only",
    badgeColor: "bg-red-500",
    gradient: "from-teal-900/80 via-white dark:via-zinc-900 to-white dark:to-zinc-900",
    image: "🛒",
  },
  {
    id: 2,
    title: "Up to 50% Off",
    subtitle: "Mega discounts on top electronic brands.",
    badge: "⚡ Flash Sale",
    badgeColor: "bg-emerald-500",
    gradient: "from-cyan-900/80 via-white dark:via-zinc-900 to-white dark:to-zinc-900",
    image: "💻",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Explore the latest trends in fashion and beauty.",
    badge: "✨ Just In",
    badgeColor: "bg-blue-500",
    gradient: "from-emerald-900/80 via-white dark:via-zinc-900 to-white dark:to-zinc-900",
    image: "👗",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slides[currentIndex].gradient} flex items-center px-8 md:px-20`}
        >
          <div className="max-w-2xl z-10">
            <span className={`inline-block px-3 py-1 rounded-sm text-zinc-900 dark:text-white font-bold text-sm mb-4 ${slides[currentIndex].badgeColor}`}>
              {slides[currentIndex].badge}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">
              {slides[currentIndex].title}
            </h2>
            <p className="text-xl text-zinc-800 dark:text-white/90 mb-8 max-w-md">
              {slides[currentIndex].subtitle}
            </p>
            <button className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:opacity-90 text-zinc-900 dark:text-white font-bold py-3 px-8 rounded-full transition-opacity shadow-lg shadow-teal-400/20">
              Shop Now
            </button>
          </div>

          <div className="absolute right-10 md:right-32 top-1/2 -translate-y-1/2 text-[150px] md:text-[250px] opacity-20 filter blur-[2px] pointer-events-none">
            {slides[currentIndex].image}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-16 border border-zinc-300 dark:border-white/20 bg-black/20 hover:bg-white/50 hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-sm z-20"
      >
        <ChevronLeft className="w-8 h-8 text-zinc-900 dark:text-white" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-16 border border-zinc-300 dark:border-white/20 bg-black/20 hover:bg-white/50 hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-sm z-20"
      >
        <ChevronRight className="w-8 h-8 text-zinc-900 dark:text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full h-2 ${
              idx === currentIndex ? "w-8 bg-white dark:bg-zinc-900" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
      
      {/* Bottom fade for seamless transition to content */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
