"use client";

import { motion } from "framer-motion";
import { ArrowRight, Store } from "lucide-react";
import SparklesBackground from "./SparklesBackground";
import HeroScene from "./HeroScene";
import Link from "next/link";

export default function Hero() {
  const titleText = "Your Neighborhood. Reimagined.";
  const titleWords = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      {/* Background Gradients and Sparkles (Kept from original) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-background to-pink-900/10 mix-blend-overlay animate-pulse-slow"></div>
        
        {/* Animated blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -50, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"
        />
      </div>
      
      <SparklesBackground />
      
      <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left: Content */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live in 500+ neighborhoods
          </motion.div>
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]"
          >
            {titleWords.map((word, index) => (
              <motion.span 
                key={index} 
                variants={wordVariants}
                className={`inline-block mr-4 ${word === "Reimagined." ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-primary drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/60 max-w-xl mb-10 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            MarQet connects you with local shops around you — order instantly, compare prices intelligently, and get it delivered fast.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/shops" className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(236,72,153,0.3)] w-full sm:w-auto text-center">
              <span className="relative flex items-center justify-center gap-2">
                Shop Nearby <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link href="/register?role=shopkeeper" className="group px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
              <Store className="w-4 h-4" /> Become a Seller
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <motion.div 
          className="hidden lg:block relative h-[600px] w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}
