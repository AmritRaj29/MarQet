"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopsDirectory() {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/shops");
        const data = await res.json();
        setShops(data);
      } catch (error) {
        console.error("Error fetching shops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-6 w-full pb-24">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Local Shops</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover the best verified sellers and local businesses in your neighborhood. Support your community today.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-secondary/50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop, index) => (
              <motion.div
                key={shop._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group border border-white/10 bg-card rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden bg-secondary">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  {shop.banner ? (
                    <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Store className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border-2 border-white/10 overflow-hidden bg-background">
                      <img src={shop.shopImage || "https://via.placeholder.com/150"} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{shop.shopName}</h3>
                      {shop.isVerified && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium">Verified</span>}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {shop.description || "No description provided."}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-foreground/80">
                    <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {shop.city || "Local"}
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                      <Star className="w-3.5 h-3.5 text-yellow-500" />
                      {shop.rating?.toFixed(1) || "New"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
