"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Filter, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGeolocation } from "@/hooks/useGeolocation";
import AIBot from "@/components/AIBot";
import Link from "next/link";

export default function ExploreShops() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { location, isLoading: locationLoading } = useGeolocation();

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/shops?keyword=${keyword}`;
        if (location) {
          url = `http://localhost:5000/api/shops/nearby?lat=${location.lat}&lng=${location.lng}&radius=50&keyword=${keyword}`;
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
      const timeoutId = setTimeout(() => {
        fetchShops();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [keyword, location, locationLoading]);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-6 w-full pb-24">
        
        {/* Search Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Explore Neighborhood</h1>
            <p className="text-muted-foreground">Discover the best local shops and sellers in your area.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search shops..." 
                className="w-full pl-10 pr-4 py-3 bg-card border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-secondary border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-secondary/80 transition-colors">
              <Filter className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Shop Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-secondary/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Store className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">No shops found</p>
            <p>Try adjusting your search or location.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shops.map((shop, index) => (
              <Link href={`/shops/${shop._id}`} key={shop._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-card/60 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="h-48 relative overflow-hidden bg-secondary">
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
                      <span className="px-2.5 py-1 bg-background/80 backdrop-blur text-zinc-900 dark:text-white text-xs font-bold rounded-full shadow-md border border-zinc-200 dark:border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {shop.rating?.toFixed(1) || "New"}
                      </span>
                    </div>

                    <div className="absolute -bottom-5 left-5 z-20">
                      <div className="w-16 h-16 rounded-2xl border-4 border-background overflow-hidden bg-secondary shadow-lg">
                        <img src={shop.shopImage || "https://via.placeholder.com/150"} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-8 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-1 line-clamp-1">{shop.shopName}</h3>
                    <div className="flex items-center gap-1.5 text-primary font-medium text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {shop.city || "Local Area"}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {shop.description || "Premium quality products delivered to you."}
                    </p>
                    <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center text-sm font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                      Enter Storefront &rarr;
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <AIBot />
      <Footer />
    </main>
  );
}
