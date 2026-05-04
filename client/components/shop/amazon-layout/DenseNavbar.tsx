"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, Heart, Menu, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";


export default function DenseNavbar() {
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Hardcoded wishlist count for demo
  const wishlistCount = 3;

  return (
    <header className="sticky top-0 w-full z-50 flex flex-col text-sm">
      {/* Row 1: Main Nav */}
      <div className="bg-gray-50 dark:bg-zinc-950 flex items-center px-4 py-2 gap-4 h-16">
        
        {/* Logo */}
        <Link href="/shop" className="flex items-center gap-1 border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1.5 rounded-sm transition-colors shrink-0">
          <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            MarQet
          </span>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1.5 rounded-sm transition-colors cursor-pointer shrink-0">
          <MapPin className="w-4 h-4 text-zinc-700 dark:text-white/70 mt-3" />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-zinc-700 dark:text-white/70">Deliver to</span>
            <span className="font-bold text-zinc-900 dark:text-white text-[13px]">Chandigarh 160014</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex rounded-md overflow-hidden bg-white dark:bg-zinc-900 h-10 border-2 border-transparent focus-within:border-teal-400 transition-colors">
          <select className="bg-white text-zinc-900 text-xs px-2 border-r border-zinc-300 dark:border-white/20 outline-none cursor-pointer w-auto max-w-[120px]">
            <option>All Categories</option>
            <option>Groceries</option>
            <option>Electronics</option>
          </select>
          <input 
            type="text" 
            placeholder="Search MarQet..." 
            className="flex-1 px-3 bg-white text-zinc-900 text-[15px] outline-none"
          />
          <button className="bg-gradient-to-r from-teal-400 to-cyan-400 w-12 flex items-center justify-center hover:opacity-90 transition-opacity">
            <Search className="w-5 h-5 text-zinc-900" />
          </button>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-2 shrink-0">
          


          {/* Account */}
          <div className="flex flex-col border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1.5 rounded-sm transition-colors cursor-pointer leading-tight">
            <span className="text-[11px] text-zinc-700 dark:text-white/70">Hello, Sign in</span>
            <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-0.5">Account & Lists <ChevronDown className="w-3 h-3 text-zinc-500 dark:text-white/50" /></span>
          </div>

          {/* Returns & Orders */}
          <div className="hidden lg:flex flex-col border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1.5 rounded-sm transition-colors cursor-pointer leading-tight">
            <span className="text-[11px] text-zinc-700 dark:text-white/70">Returns</span>
            <span className="font-bold text-zinc-900 dark:text-white">& Orders</span>
          </div>

          {/* Wishlist */}
          <div className="relative border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1.5 rounded-sm transition-colors cursor-pointer flex items-end">
            <div className="relative">
              <Heart className="w-6 h-6 text-zinc-900 dark:text-white" />
              <span className="absolute -top-1 -right-2 text-teal-400 font-bold text-sm bg-gray-50 dark:bg-zinc-950 px-1 rounded-full">{wishlistCount}</span>
            </div>
            <span className="font-bold text-zinc-900 dark:text-white ml-2 hidden sm:block">Wishlist</span>
          </div>

          {/* Cart */}
          <div className="relative border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-2 rounded-sm transition-colors cursor-pointer flex items-end">
            <div className="relative flex items-center">
              <ShoppingCart className="w-8 h-8 text-zinc-900 dark:text-white" />
              <span className="absolute top-[-4px] left-[14px] text-teal-400 font-bold text-[15px] bg-gray-50 dark:bg-zinc-950 px-1 rounded-full text-center leading-none">
                {cartCount}
              </span>
            </div>
            <span className="font-bold text-zinc-900 dark:text-white ml-1 hidden sm:block">Cart</span>
          </div>
          
        </div>
      </div>

      {/* Row 2: Secondary Nav */}
      <div className="bg-white dark:bg-zinc-900 flex items-center px-4 h-10 gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap text-[13px] font-medium border-b border-zinc-200 dark:border-white/10 shadow-md">
        <button className="flex items-center gap-1 border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1 rounded-sm transition-colors shrink-0">
          <Menu className="w-5 h-5 text-zinc-900 dark:text-white" />
          <span className="font-bold">All</span>
        </button>
        
        {[
          "Today's Deals", 
          "Top Sellers", 
          "Fresh & Grocery", 
          "Electronics", 
          "Fashion", 
          "Books", 
          "Home & Kitchen", 
          "Beauty", 
          "Plants & Garden", 
          "New Arrivals", 
          "Sell on MarQet"
        ].map((link) => (
          <Link key={link} href="#" className="border border-transparent hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 p-1 rounded-sm transition-colors text-zinc-800 dark:text-white/90">
            {link}
          </Link>
        ))}
      </div>
    </header>
  );
}
