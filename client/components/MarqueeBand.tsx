"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";

export default function MarqueeBand() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Duplicate the content to make the loop seamless
      const content = document.querySelector(".marquee-content");
      if (content) {
        const clone = content.cloneNode(true);
        marqueeRef.current?.appendChild(clone);
      }

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const textItems = [
    "LOCAL SHOPS",
    "FAST DELIVERY",
    "BEST PRICES",
    "PAY LATER",
    "1000+ SHOPS",
  ];

  return (
    <section className="py-6 border-y border-white/10 bg-background/50 backdrop-blur-sm overflow-hidden flex items-center group">
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap"
        onMouseEnter={() => gsap.globalTimeline.pause()}
        onMouseLeave={() => gsap.globalTimeline.play()}
      >
        <div className="marquee-content flex items-center gap-8 px-4">
          {textItems.map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">
                {item}
              </span>
              <Star className="w-8 h-8 text-primary animate-spin-slow" />
            </div>
          ))}
          {/* Add one more padding element for smooth looping */}
          <div className="flex items-center gap-8">
            <span className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">
              {textItems[0]}
            </span>
            <Star className="w-8 h-8 text-primary animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
}
