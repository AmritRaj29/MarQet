"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/70 border-b border-white/10"
    >
      <div className="flex items-center gap-8">
        <Link href="/">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            MarQet
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
          <Link href="/deals" className="hover:text-foreground transition-colors">Local Deals</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search items, shops..." 
            className="pl-9 pr-4 py-2 text-sm bg-secondary/50 border border-white/5 rounded-full focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
          />
        </div>
        
        <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-secondary rounded-full transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </motion.nav>
  );
}
