"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export default function CallToAction() {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-background min-h-[600px] flex items-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-400/10 to-gray-50 dark:to-zinc-950 z-0"></div>
      
      {/* Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: ["0vh", "-100vh"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-zinc-400/30 blur-[1px]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: "-10%",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
            Ready to discover <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-primary drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]">
              your neighborhood?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-white/60 max-w-2xl mx-auto mb-12 font-medium">
            Join the revolution of hyperlocal commerce. Connect with your community today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/shops" className="group relative px-10 py-5 bg-gradient-to-r from-teal-400 to-cyan-500 text-zinc-900 dark:text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(45,212,191,0.4)] w-full sm:w-auto flex items-center justify-center gap-2 text-lg">
              <span className="relative flex items-center justify-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/register?role=shopkeeper" className="group px-10 py-5 bg-black/5 dark:bg-white/5 border border-zinc-300 dark:border-white/20 backdrop-blur-md text-zinc-900 dark:text-white font-bold rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto text-lg">
              <Store className="w-5 h-5" /> Sell on MarQet
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
