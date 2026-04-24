"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Store, Star, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function NearbyShopsMarquee() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { location, isLoading: locationLoading } = useGeolocation();

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:5000/api/shops";
        if (location) {
          url = `http://localhost:5000/api/shops/nearby?lat=${location.lat}&lng=${location.lng}&radius=10`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setShops(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching shops", error);
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) {
      fetchShops();
    }
  }, [location, locationLoading]);

  if (loading || shops.length === 0) return null;

  // Duplicate shops to create an infinite loop effect if there are too few
  const displayShops = [...shops, ...shops, ...shops].slice(0, 10);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background z-0"></div>
      
      <div className="container relative z-10 px-4 md:px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {location ? "Trending Near You" : "Featured Shops"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover premium local sellers with the highest ratings in your area.
          </p>
        </div>
        <Link href="/shops" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors font-medium">
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative z-10 w-full overflow-hidden flex flex-col">
        {/* Left and right fade gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 w-max py-4 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {displayShops.map((shop, index) => (
            <Link href={`/shops/${shop._id}`} key={`${shop._id}-${index}`}>
              <div className="w-[350px] group relative border border-white/10 bg-card/60 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] flex flex-col shrink-0">
                <div className="h-40 relative overflow-hidden bg-secondary/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
                  {shop.banner ? (
                    <img 
                      src={shop.banner} 
                      alt={shop.shopName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Store className="w-12 h-12 opacity-30" />
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 bg-background/80 backdrop-blur text-white text-xs font-bold rounded-full shadow-md border border-white/10 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {shop.rating?.toFixed(1) || "New"}
                    </span>
                  </div>

                  <div className="absolute -bottom-5 left-5 z-20">
                    <div className="w-16 h-16 rounded-xl border-[3px] border-background overflow-hidden bg-secondary shadow-lg">
                      <img src={shop.shopImage || "https://via.placeholder.com/150"} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                
                <div className="p-5 pt-8 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-white mb-1 truncate">{shop.shopName}</h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {shop.city || "Local"}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {shop.description || "Premium quality products delivered to you."}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
      
      <div className="container px-4 md:hidden mt-6 text-center">
        <Link href="/shops" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-medium">
          View all locations <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
