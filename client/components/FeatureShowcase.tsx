"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Store, Bot, CreditCard, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: 0,
    title: "Nearby Shops",
    description: "Instantly discover the highest-rated local sellers around your exact location.",
    icon: Store,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 1,
    title: "Price Compare AI",
    description: "Search naturally. Our system compares prices across all local shops instantly.",
    icon: Bot,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 2,
    title: "Pay Later Credit",
    description: "Build trust with local shops. Buy now, pay later with 0% interest.",
    icon: CreditCard,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 3,
    title: "Real-time Orders",
    description: "Live socket notifications track your order from placed to delivered.",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
];

export default function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${features.length * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * features.length),
            features.length - 1
          );
          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="h-screen w-full bg-background relative overflow-hidden flex items-center">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container px-6 mx-auto grid lg:grid-cols-2 h-full items-center z-10 gap-12 relative">
        
        {/* Left Column: Pinned Text / Cards */}
        <div ref={leftColRef} className="flex flex-col justify-center h-full relative space-y-12">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
              Powerful tools for a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                seamless experience.
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Everything you need to shop local, built with cutting-edge technology.
            </p>
          </div>

          <div className="relative h-[400px] w-full perspective-1000">
            <AnimatePresence>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = index === activeIndex;
                if (!isActive) return null;
                
                return (
                  <motion.div 
                    key={feature.id}
                    initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: -50, scale: 1.05, rotateX: 10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                      <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-white/60 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Central Mockup */}
        <div ref={rightColRef} className="hidden lg:flex h-full items-center justify-center relative">
          
          {/* Mockup Floating Animation container */}
          <motion.div 
            className="relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glowing Ring Behind Phone */}
            <motion.div 
              className={`absolute -inset-4 rounded-[60px] opacity-30 blur-2xl transition-colors duration-1000 bg-gradient-to-br ${features[activeIndex].color}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="w-[400px] h-[800px] bg-black rounded-[50px] border-[12px] border-white/10 p-4 relative shadow-2xl overflow-hidden backdrop-blur-3xl z-10">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50"></div>
              
              {/* Screen Content */}
              <div className="w-full h-full bg-zinc-950 rounded-[35px] relative overflow-hidden shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${features[activeIndex].color} opacity-20`}
                  />
                </AnimatePresence>
                
                {/* Simulated UI App Grid */}
                <div className="absolute inset-0 p-6 pt-16 flex flex-col gap-4 opacity-30">
                  <div className="w-full h-12 bg-white/10 rounded-2xl"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-white/10 rounded-3xl"></div>
                    <div className="aspect-square bg-white/10 rounded-3xl"></div>
                  </div>
                  <div className="w-full flex-1 bg-white/10 rounded-3xl"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 backdrop-blur-[2px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`icon-${activeIndex}`}
                      initial={{ opacity: 0, y: 30, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 1.5 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    >
                      {(() => {
                        const ActiveIcon = features[activeIndex].icon;
                        return (
                          <div className="relative">
                            <ActiveIcon className="w-32 h-32 text-white mb-8 relative z-10" />
                            {/* Inner glow for icon */}
                            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full z-0"></div>
                          </div>
                        );
                      })()}
                      <h4 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">{features[activeIndex].title}</h4>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
