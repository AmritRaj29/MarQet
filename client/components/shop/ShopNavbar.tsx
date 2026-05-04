"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ShoppingCart, User, Sparkles, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useGeolocation } from "@/hooks/useGeolocation";
import Logo from "@/components/Logo";

const searchPlaceholders = [
  "Search milk...",
  "Search bread...",
  "Search local shops...",
  "Search fresh vegetables...",
];

export default function ShopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const { location, isLoading } = useGeolocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-lg"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/shop" className="block w-32">
            <Logo />
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative z-50">
          <motion.div
            className={`w-full relative rounded-full border transition-colors ${
              isSearchFocused ? "bg-black/10 border-primary" : "bg-black/5 border-zinc-200 dark:border-white/10"
            } overflow-hidden`}
            animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center px-4 py-2.5 h-12">
              <Search className="w-5 h-5 text-zinc-500 dark:text-white/50 shrink-0" />
              
              <div className="relative flex-1 h-full mx-3 flex items-center overflow-hidden">
                <input
                  type="text"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-zinc-900 dark:text-white z-10"
                />
                {!isSearchFocused && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={placeholderIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center text-zinc-400 dark:text-white/40 pointer-events-none"
                    >
                      {searchPlaceholders[placeholderIndex]}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              <button className="p-1.5 rounded-full hover:bg-black/10 transition-colors shrink-0 group">
                <Sparkles className="w-5 h-5 text-primary group-hover:text-teal-300 transition-colors" />
              </button>
            </div>
            
            {/* Search Dropdown */}
            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-white/10 w-full"
                >
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-white/50 uppercase tracking-wider mb-3">Recent Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Amul Milk", "Whole Wheat Bread", "Eggs", "Verma Dairy"].map((term) => (
                        <button key={term} className="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-full text-sm text-zinc-800 dark:text-white/90 transition-colors">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Backdrop for search focus */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/60 backdrop-blur-sm -z-10 w-screen h-screen"
                style={{ top: "80px", left: 0 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          {/* Location Pill */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-zinc-200 dark:border-white/10 hover:bg-black/10 transition-colors max-w-[200px]">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <div className="flex flex-col items-start truncate">
              <span className="text-[10px] uppercase font-bold text-zinc-500 dark:text-white/50 leading-none">Delivering to</span>
              <span className="text-sm font-semibold truncate text-zinc-900 dark:text-white leading-tight w-full">
                {isLoading ? "Locating..." : location ? "Your Location" : "Select Location"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-white/50 ml-1 shrink-0" />
          </button>

          {/* Cart Icon */}
          <button 
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-black/5 border border-zinc-200 dark:border-white/10 hover:bg-black/10 transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 text-zinc-900 dark:text-white group-hover:text-primary transition-colors" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-teal-400 to-primary rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-900 dark:text-white shadow-lg border border-background"
                >
                  {cartCount}
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Profile Dropdown */}
          <button className="w-10 h-10 rounded-full border border-zinc-300 dark:border-white/20 overflow-hidden relative group">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
