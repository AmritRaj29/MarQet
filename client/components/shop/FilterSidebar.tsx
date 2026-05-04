"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [distance, setDistance] = useState(5);
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [deliveryType, setDeliveryType] = useState("all");

  const handleApply = () => {
    // In a real app, this would trigger a refetch with new filter params
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div
        className={`fixed inset-y-0 right-0 w-[300px] sm:w-[350px] bg-gray-50 dark:bg-zinc-950 border-l border-zinc-200 dark:border-white/10 shadow-2xl z-50 flex flex-col lg:relative lg:block lg:w-64 lg:z-0 lg:border-l-0 lg:border-r lg:bg-transparent lg:shadow-none transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 lg:p-0 lg:mb-6 border-b border-zinc-200 dark:border-white/10 lg:border-none">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </h3>
          <button onClick={onClose} className="p-2 rounded-full bg-black/5 hover:bg-black/10 lg:hidden">
            <X className="w-5 h-5 text-zinc-900 dark:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-0 space-y-8 hide-scrollbar">
          {/* Distance Filter */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-800 dark:text-white/90">Distance</label>
              <span className="text-sm text-primary font-bold">Up to {distance} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className="w-full accent-primary bg-black/10 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
          </div>

          {/* Delivery Type */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-zinc-800 dark:text-white/90">Delivery Options</label>
            <div className="flex flex-col gap-2">
              {["all", "fast_delivery", "pickup"].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border border-zinc-300 dark:border-white/20 group-hover:border-primary transition-colors">
                    {deliveryType === type && <div className="w-2.5 h-2.5 bg-primary rounded-sm" />}
                  </div>
                  <input 
                    type="radio" 
                    name="delivery" 
                    className="hidden" 
                    checked={deliveryType === type}
                    onChange={() => setDeliveryType(type)}
                  />
                  <span className="text-sm text-zinc-700 dark:text-white/70 group-hover:text-zinc-900 dark:text-white capitalize">
                    {type.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-zinc-800 dark:text-white/90">Minimum Rating</label>
            <div className="flex flex-col gap-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                    selectedRating === rating ? "bg-black/10" : "hover:bg-black/5"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-300 dark:text-white/20"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-white/50">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-800 dark:text-white/90">Max Price</label>
              <span className="text-sm text-primary font-bold">₹{priceRange}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="5000" 
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-primary bg-black/10 rounded-lg appearance-none h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Apply Button (Sticky bottom on mobile) */}
        <div className="p-4 lg:p-0 lg:mt-8 border-t border-zinc-200 dark:border-white/10 lg:border-none bg-gray-50 dark:bg-zinc-950 lg:bg-transparent">
          <button 
            onClick={handleApply}
            className="w-full py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors shadow-lg shadow-white/10"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </>
  );
}
