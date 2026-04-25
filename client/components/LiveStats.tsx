"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  { label: "Local Shops", prefix: "", value: 1200, suffix: "+", color: "text-pink-500" },
  { label: "Orders Delivered", prefix: "", value: 50, suffix: "K+", color: "text-purple-500" },
  { label: "Average Rating", prefix: "", value: 4.8, suffix: "★", decimals: 1, color: "text-yellow-500" },
  { label: "Avg Delivery (min)", prefix: "", value: 30, suffix: "", color: "text-cyan-500" },
];

export default function LiveStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-black relative border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-accent/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col items-center text-center ${index !== 0 ? "pl-12" : ""}`}
            >
              <div className={`text-5xl md:text-7xl font-black mb-4 tracking-tighter ${stat.color} drop-shadow-[0_0_15px_currentColor]`}>
                {stat.prefix}
                {inView ? (
                  <CountUp 
                    end={stat.value} 
                    decimals={stat.decimals || 0} 
                    duration={2.5} 
                    separator=","
                  />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>
              <div className="text-white/60 text-lg uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
