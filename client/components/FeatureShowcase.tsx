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
    if (!containerRef.current || !leftColRef.current || !rightColRef.current) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".feature-card") as HTMLElement[];
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * cards.length),
            cards.length - 1
          );
          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        },
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${i * window.innerHeight} top`,
            end: () => `top+=${(i + 1) * window.innerHeight} top`,
            scrub: true,
            toggleClass: { targets: card, className: "opacity-100" },
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section ref={containerRef} className="h-screen w-full bg-background relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background z-0"></div>
      
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

          <div className="relative h-[400px] w-full">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === activeIndex;
              return (
                <div 
                  key={feature.id}
                  className={`feature-card absolute top-0 left-0 w-full transition-all duration-700 ease-[0.16,1,0.3,1] ${isActive ? "opacity-100 translate-y-0" : "opacity-20 translate-y-8"}`}
                >
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Central Mockup */}
        <div ref={rightColRef} className="hidden lg:flex h-full items-center justify-center relative">
          <div className="w-[400px] h-[800px] bg-black rounded-[50px] border-[12px] border-white/10 p-4 relative shadow-[0_0_100px_rgba(139,92,246,0.2)] overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-50"></div>
            
            {/* Screen Content */}
            <div className="w-full h-full bg-zinc-900 rounded-[35px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-0 bg-gradient-to-br ${features[activeIndex].color} opacity-20`}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`icon-${activeIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {(() => {
                      const ActiveIcon = features[activeIndex].icon;
                      return <ActiveIcon className="w-32 h-32 text-white mb-8 drop-shadow-2xl" />;
                    })()}
                    <h4 className="text-3xl font-bold text-white">{features[activeIndex].title}</h4>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
