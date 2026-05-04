"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";


export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-2xl" 
          : "py-5 bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-primary drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                MarQet
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-zinc-800 dark:text-white/90">
            <Link href="/shops" className="hover:text-zinc-900 dark:text-white transition-colors">Shop</Link>
            <Link href="/register?role=shopkeeper" className="hover:text-zinc-900 dark:text-white transition-colors">Sellers</Link>
            <Link href="#about" className="hover:text-zinc-900 dark:text-white transition-colors">About</Link>
            <Link href="#contact" className="hover:text-zinc-900 dark:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 dark:text-white/50" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-white/20 shadow-sm text-zinc-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 transition-all hover:border-zinc-400 dark:hover:border-white/50 dark:border-white/50 placeholder:text-zinc-400 dark:text-white/40"
            />
          </div>
          

          <button onClick={toggleCart} className="p-2 hover:bg-black/10 rounded-full transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-zinc-800 dark:text-white/90" />
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-r from-teal-400 to-primary text-zinc-900 dark:text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                {items.length}
              </span>
            )}
          </button>

          {mounted && isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              {user?.role === 'shopkeeper' ? (
                <Link href="/dashboard" className="p-2 hover:bg-black/10 rounded-full transition-colors flex items-center gap-2 text-sm text-emerald-400">
                  <LayoutDashboard className="w-4 h-4" />
                </Link>
              ) : (
                <Link href="/account" className="p-2 hover:bg-black/10 rounded-full transition-colors flex items-center gap-2 text-sm text-primary">
                  <User className="w-4 h-4" />
                </Link>
              )}
              <div className="text-sm text-zinc-600 dark:text-white/60 px-2 border-l border-zinc-300 dark:border-white/20">
                {user?.name?.split(' ')[0]}
              </div>
              <button onClick={() => logout()} className="p-2 hover:bg-black/10 rounded-full transition-colors" title="Logout">
                <LogOut className="w-4 h-4 text-destructive/80 hover:text-destructive" />
              </button>
            </div>
          ) : mounted ? (
            <div className="hidden md:flex items-center gap-3 ml-2">
              <Link href="/login" className="text-sm font-semibold text-zinc-800 dark:text-white/90 hover:text-zinc-900 dark:text-white transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm font-bold text-zinc-900 dark:text-white bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all transform hover:scale-105">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="w-32 h-9 hidden md:block"></div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-800 dark:text-white/90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
        >
          <Link href="/shops" className="text-lg font-semibold text-zinc-800 dark:text-white/90">Shop</Link>
          <Link href="/register?role=shopkeeper" className="text-lg font-semibold text-zinc-800 dark:text-white/90">Sellers</Link>
          <Link href="#about" className="text-lg font-semibold text-zinc-800 dark:text-white/90">About</Link>
          <Link href="#contact" className="text-lg font-semibold text-zinc-800 dark:text-white/90">Contact</Link>
          
          <hr className="border-zinc-200 dark:border-white/10 my-2" />
          
          {isAuthenticated ? (
            <div className="flex flex-col gap-4">
               <span className="text-zinc-600 dark:text-white/60">Hello, {user?.name}</span>
               <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-destructive font-semibold">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link href="/login" className="text-lg font-semibold text-zinc-900 dark:text-white">Login</Link>
              <Link href="/register" className="px-4 py-3 text-center text-sm font-bold text-zinc-900 dark:text-white bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl">
                Get Started
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
