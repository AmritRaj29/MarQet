"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, ReceiptText, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/shop", icon: Home },
  { name: "Search", href: "/shop/search", icon: Search },
  { name: "Cart", href: "/shop/cart", icon: ShoppingBag, isCart: true },
  { name: "Orders", href: "/shop/orders", icon: ReceiptText },
  { name: "Account", href: "/shop/profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full text-zinc-500 dark:text-white/50 hover:text-zinc-800 dark:text-white/90 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-black/5 rounded-xl m-1"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  
                  {/* Cart Badge */}
                  {item.isCart && (
                    <AnimatePresence>
                      {cartCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1.5 -right-2 w-4 h-4 bg-gradient-to-r from-teal-400 to-primary rounded-full flex items-center justify-center text-[9px] font-bold text-zinc-900 dark:text-white"
                        >
                          {cartCount}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
