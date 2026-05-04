"use client";

import { motion } from "framer-motion";
import { Store, BellRing, LineChart, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Store, text: "Manage products easily with our intuitive dashboard" },
  { icon: BellRing, text: "Real-time order alerts via secure WebSockets" },
  { icon: LineChart, text: "Deep earnings analytics and customer insights" },
  { icon: Truck, text: "Subscribe for platform-managed delivery logistics" },
];

export default function ForSellers() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-emerald-900/10 to-background"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Floating Dashboard Mockup */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-lg aspect-[4/3] bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden"
              style={{ transformPerspective: "1000px" }}
            >
              {/* Mockup Header */}
              <div className="h-12 border-b border-zinc-200 dark:border-white/10 flex items-center px-4 gap-2 bg-black/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              
              {/* Mockup Body */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 h-24 bg-black/5 rounded-xl border border-zinc-200 dark:border-white/10 p-4 flex flex-col justify-center">
                  <div className="w-24 h-3 bg-black/10 rounded-full mb-3"></div>
                  <div className="w-48 h-8 bg-emerald-500/20 rounded-md"></div>
                </div>
                <div className="h-32 bg-black/5 rounded-xl border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500"></div>
                </div>
                <div className="h-32 bg-black/5 rounded-xl border border-zinc-200 dark:border-white/10 flex flex-col gap-3 p-4">
                  <div className="w-full h-3 bg-black/10 rounded-full"></div>
                  <div className="w-3/4 h-3 bg-black/10 rounded-full"></div>
                  <div className="w-1/2 h-3 bg-emerald-500/50 rounded-full mt-auto"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -right-4 top-1/4 bg-black/10 backdrop-blur-xl border border-zinc-300 dark:border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <BellRing className="w-5 h-5 text-zinc-900 dark:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">New Order!</p>
                <p className="text-xs text-zinc-600 dark:text-white/60">₹450 via PayLater</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Grow your business <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                  exponentially.
                </span>
              </h2>
              <p className="text-xl text-zinc-600 dark:text-white/60 mb-10">
                Join thousands of local shopkeepers who have digitized their inventory and expanded their reach with MarQet.
              </p>
            </motion.div>

            <div className="space-y-6 mb-12">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-lg text-zinc-800 dark:text-white/90 font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/register?role=shopkeeper" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-900 dark:text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                Start Selling Today
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
