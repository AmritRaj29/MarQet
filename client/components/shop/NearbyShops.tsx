"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Star, Zap, MapPin, ChevronRight } from "lucide-react";

interface Shop {
  _id: string;
  shopName: string;
  bannerImage?: string;
  distance?: number;
  rating?: number;
  isSubscribed?: boolean;
}

interface NearbyShopsProps {
  shops: Shop[];
  isLoading: boolean;
}

function ShopCard({ shop, index }: { shop: Shop; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const rotateX = useMotionTemplate`${mouseY.get() * -0.02}deg`;
  const rotateY = useMotionTemplate`${mouseX.get() * 0.02}deg`;

  // Fallback image if no banner
  const bgImage = shop.bannerImage || "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=500";

  return (
    <Link href={`/shop/${shop._id}`}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-[280px] h-[320px] rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shrink-0 relative cursor-pointer overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(45,212,191,0.2)] transition-shadow"
      >
        {/* Banner Image */}
        <div className="absolute inset-0 w-full h-[60%] z-0 overflow-hidden">
          <img 
            src={bgImage} 
            alt={shop.shopName} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-white/50 dark:via-zinc-900/50 to-transparent"></div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10" style={{ transform: "translateZ(30px)" }}>
          {shop.isSubscribed ? (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Zap className="w-3 h-3 fill-emerald-400" /> Fast Delivery
            </div>
          ) : <div></div>}
          
          <div className="flex items-center gap-1 px-2 py-1 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-full text-zinc-900 dark:text-white text-xs font-bold border border-zinc-200 dark:border-white/10">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {shop.rating?.toFixed(1) || "4.5"}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-5 z-10 bg-gradient-to-t from-white dark:from-zinc-900 via-white dark:via-zinc-900 to-transparent pt-12" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 line-clamp-1 group-hover:text-teal-300 transition-colors">
            {shop.shopName}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-white/50 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              {shop.distance ? `${shop.distance.toFixed(1)} km away` : "Nearby"}
            </div>
            <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
              <ChevronRight className="w-4 h-4 text-zinc-900 dark:text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function NearbyShops({ shops, isLoading }: NearbyShopsProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          Shops Near You <span className="text-2xl">🏪</span>
        </h2>
        <Link href="/shops" className="text-primary hover:text-teal-300 text-sm font-semibold flex items-center gap-1 transition-colors">
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="w-full overflow-x-auto pb-8 pt-4 hide-scrollbar -mt-4">
        <div className="flex gap-6 px-4 md:px-0 w-max perspective-1000">
          {isLoading ? (
            // Skeletons
            [...Array(4)].map((_, i) => (
              <div key={i} className="w-[280px] h-[320px] rounded-3xl bg-black/5 animate-pulse shrink-0 border border-zinc-200 dark:border-white/10" />
            ))
          ) : shops.length > 0 ? (
            shops.map((shop, index) => (
              <ShopCard key={shop._id} shop={shop} index={index} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-[320px] text-zinc-500 dark:text-white/50 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl">
              No shops found nearby.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
