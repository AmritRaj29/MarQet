"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User as UserIcon, Store, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function LoginGateway() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen bg-primary/20"
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen bg-emerald-500/10 delay-100"
        ></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl p-8 relative z-10"
      >
        <div className="text-center mb-12 relative z-10 flex flex-col items-center">
          <Link href="/" className="inline-block mb-6">
            <Logo className="w-16 h-16" textClassName="text-5xl" />
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Welcome to MarQet</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Choose your portal to continue. Are you shopping for local goods or managing your business?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Customer Portal Option */}
          <Link href="/login/user">
            <motion.div 
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group h-full bg-card/40 backdrop-blur-xl border border-primary/20 p-8 rounded-[2rem] cursor-pointer hover:border-primary/50 transition-all flex flex-col items-center text-center shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)]"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Customer</h2>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                Discover nearby shops, browse premium products, and manage your orders.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold">
                Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Seller Portal Option */}
          <Link href="/login/seller">
            <motion.div 
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group h-full bg-card/40 backdrop-blur-xl border border-emerald-500/20 p-8 rounded-[2rem] cursor-pointer hover:border-emerald-500/50 transition-all flex flex-col items-center text-center shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Store className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Shopkeeper</h2>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                Manage your storefront, upload products, and track your business earnings.
              </p>
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground relative z-10">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-white hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
