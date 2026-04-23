"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="relative rounded-[3rem] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Intense Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
          
          {/* Animated Overlay Shapes */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/20 rounded-full blur-[80px] mix-blend-overlay"></div>

          <div className="relative z-10 py-24 px-8 md:px-20 flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Ready to redefine <br className="hidden md:block"/> local commerce?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 font-light">
              Join thousands of buyers and sellers already experiencing the future of neighborhood shopping.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <button className="px-10 py-5 bg-white text-black font-bold rounded-full text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Create Free Account
              </button>
              <button className="px-10 py-5 bg-black/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-lg hover:bg-black/30 transition-all hover:scale-105 active:scale-95">
                Explore as Guest
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
