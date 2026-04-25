"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Find Shops",
    description: "Discover verified local sellers around your exact location. Compare prices instantly.",
    color: "from-pink-500 to-rose-500",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 stroke-white/80 stroke-[3] stroke-linecap-round stroke-linejoin-round">
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          d="M50 15C33.4 15 20 28.4 20 45C20 65 50 85 50 85C50 85 80 65 80 45C80 28.4 66.6 15 50 15Z" 
        />
        <motion.circle 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          cx="50" cy="45" r="10" 
        />
      </svg>
    )
  },
  {
    num: "02",
    title: "Add to Cart",
    description: "Browse products and add them to your cart. Request 'Pay Later' if needed.",
    color: "from-purple-500 to-indigo-500",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 stroke-white/80 stroke-[3] stroke-linecap-round stroke-linejoin-round">
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          d="M20 25L30 25L40 65L80 65L90 35L35 35" 
        />
        <motion.circle 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          cx="45" cy="75" r="4" 
        />
        <motion.circle 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
          cx="75" cy="75" r="4" 
        />
      </svg>
    )
  },
  {
    num: "03",
    title: "Pickup or Delivery",
    description: "Pick it up instantly or get it delivered. Track your order in real-time.",
    color: "from-blue-500 to-cyan-500",
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 stroke-white/80 stroke-[3] stroke-linecap-round stroke-linejoin-round">
        <motion.rect 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          x="20" y="35" width="60" height="40" rx="4" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          d="M30 35L50 20L70 35" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
          d="M20 50L80 50" 
        />
      </svg>
    )
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">How It Works</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-medium">
            A frictionless journey from discovery to delivery, engineered for speed and simplicity.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[120px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-white/20 z-0">
            <motion.div 
              className="absolute top-[-2px] left-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
              style={{ width: lineHeight }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-full flex justify-center mb-8 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 w-48 h-48 mx-auto`}></div>
                  <div className="w-48 h-48 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center relative z-10 shadow-2xl overflow-hidden group-hover:border-white/30 transition-colors">
                    {step.svg}
                    <div className="absolute top-4 right-6 text-5xl font-black text-white/5">{step.num}</div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{step.title}</h3>
                <p className="text-white/60 leading-relaxed max-w-[280px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
