"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import SparklesBackground from "./SparklesBackground";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-105"
        >
          {/* Using a high-quality abstract tech/city video from a CDN as a placeholder */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-on-a-bridge-at-night-aerial-view-34586-large.mp4" type="video/mp4" />
        </video>
        
        {/* Perfect Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/10 mix-blend-overlay"></div>
      </div>
      
      <SparklesBackground />
      
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          The New Standard for Local Commerce
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-6 max-w-5xl leading-[1.1]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Elevate Your <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            Local Experience
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl text-white/60 max-w-2xl mb-12 font-light"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Immersive discovery. Instant connection. The most premium hyperlocal marketplace designed for the modern world.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              Start Exploring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="group px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            <Play className="w-4 h-4 fill-white" /> Watch Trailer
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-white">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
}
