"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mockProducts = [
  { id: 1, name: "Fresh Organic Milk", price: "₹30", shop: "Verma Dairy", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60", isCheapest: true },
  { id: 2, name: "Whole Wheat Bread", price: "₹45", shop: "Gupta Bakers", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "Farm Eggs (12)", price: "₹80", shop: "Sharma General Store", img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&auto=format&fit=crop&q=60", isCheapest: true },
  { id: 4, name: "Basmati Rice 1kg", price: "₹120", shop: "Super Mart", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Sunflower Oil 1L", price: "₹150", shop: "Daily Needs", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60" },
  { id: 6, name: "Apples 1kg", price: "₹200", shop: "Fresh Fruits", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?w=500&auto=format&fit=crop&q=60", isCheapest: true },
];

function TiltCard({ product }: { product: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const rotateX = useMotionTemplate`${mouseY.get() * -0.05}deg`;
  const rotateY = useMotionTemplate`${mouseX.get() * 0.05}deg`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-[300px] h-[400px] rounded-3xl bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-sm p-4 flex flex-col justify-between shrink-0 relative cursor-pointer"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 shadow-2xl">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        {product.isCheapest && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-zinc-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-white" /> Cheapest
          </div>
        )}
      </div>
      
      <div style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{product.name}</h3>
        <p className="text-zinc-600 dark:text-white/60 text-sm mb-4">{product.shop}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-primary">{product.price}</span>
          <button className="px-4 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full text-zinc-900 dark:text-white text-sm font-semibold transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    let ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth - window.innerWidth;
      
      gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          scrub: 0.1,
          end: () => `+=${scrollWidth}`,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-background relative overflow-hidden pt-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-primary">Essentials.</span>
          </h2>
          <p className="text-xl text-zinc-600 dark:text-white/60 max-w-2xl mt-4">
            Scroll to explore exactly what's available right now from shops down your street.
          </p>
        </div>

        <div className="overflow-hidden w-full pl-6">
          <div ref={scrollRef} className="flex gap-8 w-max pr-24">
            {mockProducts.map((product) => (
              <TiltCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
