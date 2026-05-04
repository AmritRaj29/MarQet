"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGeolocation } from "@/hooks/useGeolocation";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function ShopsDirectory() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { location, isLoading: locationLoading } = useGeolocation();

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:5000/api/shops";
        if (location) {
          url = `http://localhost:5000/api/shops/nearby?lat=${location.lat}&lng=${location.lng}`;
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

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 overflow-hidden">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute top-60 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="flex-1 max-w-7xl mx-auto px-6 w-full pb-24 relative z-10">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {location ? "Nearby You" : "All Locations"}
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white dark:from-zinc-900 via-white dark:via-zinc-900 to-white/50">
            Discover Local Shops
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the best verified sellers and premium local businesses in your neighborhood. Support your community with instant delivery.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] bg-secondary/30 rounded-3xl animate-pulse border border-zinc-200 dark:border-white/10"></div>
            ))}
          </div>
        ) : shops.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Store className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No shops found</h2>
            <p>We couldn't find any shops matching your criteria.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {shops.map((shop) => (
              <Link href={`/shops/${shop._id}`} key={shop._id}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px -10px rgba(139,92,246,0.3)" 
                  }}
                  className="group relative border border-zinc-200 dark:border-white/10 bg-card/40 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="h-56 relative overflow-hidden bg-secondary">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
                    {shop.banner ? (
                      <motion.img 
                        src={shop.banner} 
                        alt={shop.shopName} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/50">
                        <Store className="w-16 h-16 opacity-30" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      {shop.isVerified && (
                        <span className="px-3 py-1 bg-blue-500/90 backdrop-blur text-zinc-900 dark:text-white text-xs font-bold rounded-full shadow-lg border border-blue-400/30">
                          Verified
                        </span>
                      )}
                      <span className="px-3 py-1 bg-background/80 backdrop-blur text-zinc-900 dark:text-white text-xs font-bold rounded-full shadow-lg border border-zinc-200 dark:border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {shop.rating?.toFixed(1) || "New"}
                      </span>
                    </div>

                    <div className="absolute -bottom-6 left-6 z-20">
                      <div className="w-20 h-20 rounded-2xl border-4 border-background overflow-hidden bg-secondary shadow-xl shadow-black/50 group-hover:scale-110 transition-transform duration-500">
                        <img src={shop.shopImage || "https://via.placeholder.com/150"} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-10 flex-1 flex flex-col">
                    <h3 className="font-bold text-2xl text-zinc-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{shop.shopName}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                      {shop.description || "Premium local business providing top quality products."}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-auto">
                      <div className="flex items-center gap-2 bg-secondary/50 border border-zinc-200 dark:border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-zinc-800 dark:text-white/90 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all">
                        <MapPin className="w-4 h-4" />
                        {shop.city || "Local"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </main>
  );
}
