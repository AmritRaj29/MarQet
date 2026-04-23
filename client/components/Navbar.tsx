"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/70 border-b border-white/10"
    >
      <div className="flex items-center gap-8">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <Link href="/shops" className="hover:text-foreground transition-colors">Local Shops</Link>
          <Link href="/deals" className="hover:text-foreground transition-colors">Deals</Link>
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

        {mounted && isAuthenticated ? (
          <div className="flex items-center gap-2">
            {user?.role === 'shopkeeper' && (
              <Link href="/dashboard" className="p-2 hover:bg-secondary rounded-full transition-colors flex items-center gap-2 text-sm text-green-500">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden md:inline font-medium">Dashboard</span>
              </Link>
            )}
            <div className="text-sm text-muted-foreground hidden md:block px-2 border-l border-white/10">
              {user?.name.split(' ')[0]}
            </div>
            <button onClick={() => logout()} className="p-2 hover:bg-secondary rounded-full transition-colors" title="Logout">
              <LogOut className="w-5 h-5 text-destructive" />
            </button>
          </div>
        ) : mounted ? (
          <Link href="/login" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
        ) : (
          <div className="w-9 h-9"></div>
        )}
      </div>
    </motion.nav>
  );
}
