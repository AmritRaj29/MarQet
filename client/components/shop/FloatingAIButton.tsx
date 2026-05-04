"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FloatingAIButtonProps {
  onClick: () => void;
}

export default function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
      <motion.button
        onClick={onClick}
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 text-zinc-900 dark:text-white shadow-[0_0_30px_rgba(45,212,191,0.5)] border-2 border-zinc-300 dark:border-white/20 hover:scale-110 active:scale-95 transition-transform"
      >
        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 -z-10"
        />
        
        <Sparkles className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
      </motion.button>
    </div>
  );
}
