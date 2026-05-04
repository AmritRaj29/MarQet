"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ShoppingBag, ArrowRight, Zap, Coffee, Shirt, MonitorSmartphone, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { useGeolocation } from "@/hooks/useGeolocation";
import Link from "next/link";
import AIBot from "@/components/AIBot";

const categories = [
  { name: "Groceries", icon: Coffee, color: "from-orange-400 to-amber-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { name: "Electronics", icon: MonitorSmartphone, color: "from-blue-400 to-indigo-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { name: "Fashion", icon: Shirt, color: "from-pink-400 to-rose-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  { name: "Essentials", icon: Zap, color: "from-emerald-400 to-teal-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export default function CustomerHomepage() {
  const { user } = useAuthStore();
  const { location, isLoading: locationLoading } = useGeolocation();
  
  const [shops, setShops] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch nearby shops
        let shopUrl = "http://localhost:5000/api/shops";
        if (location) {
          shopUrl = `http://localhost:5000/api/shops/nearby?lat=${location.lat}&lng=${location.lng}`;
        }
        const shopRes = await fetch(shopUrl);
        const shopData = await shopRes.json();
        setShops(Array.isArray(shopData) ? shopData.slice(0, 4) : []);

        // Fetch trending products (mocking trending by taking first few)
        const prodRes = await fetch("http://localhost:5000/api/products");
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData.slice(0, 4) : []);

      } catch (error) {
        console.error("Error fetching homepage data", error);
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) fetchData();
  }, [location, locationLoading]);

  const firstName = user?.name?.split(" ")[0] || "Guest";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 overflow-hidden relative">
      <Navbar />
      
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -z-10 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div className="flex-1 max-w-7xl mx-auto px-6 w-full pb-24 relative z-10 space-y-16">
        
        {/* HERO SECTION */}
        <section className="pt-10 md:pt-16 pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-500 dark:to-zinc-500 leading-tight">
              Welcome back, <br className="hidden md:block" />
              <span className="text-primary">{firstName}</span>!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">What are you looking for today? Discover instant delivery from premium local sellers.</p>
            
            <div className="relative max-w-2xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-card border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <Search className="absolute left-4 w-6 h-6 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for groceries, electronics, fashion..." 
                  className="w-full pl-14 pr-4 py-5 bg-transparent border-none focus:outline-none focus:ring-0 text-lg"
                />
                <button className="absolute right-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* QUICK CATEGORIES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">Explore Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className={`group cursor-pointer p-6 rounded-3xl border ${cat.border} ${cat.bg} backdrop-blur-sm hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}
                >
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${cat.color} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-bold text-lg">{cat.name}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* NEARBY SHOPS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-500 flex items-center gap-2">
              <Store className="w-8 h-8 text-primary" /> Top Shops Nearby
            </h2>
            <Link href="/shops" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-3xl bg-secondary/50 animate-pulse" />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shops.map((shop, i) => (
                <Link href={`/shops/${shop._id}`} key={shop._id}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="group bg-card/40 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div className="h-32 relative overflow-hidden bg-secondary">
                      {shop.banner ? (
                        <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-secondary" />
                      )}
                      <div className="absolute -bottom-5 left-4 z-20 w-12 h-12 rounded-xl border-2 border-background overflow-hidden bg-secondary">
                        <img src={shop.shopImage || "https://via.placeholder.com/100"} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-background/90 backdrop-blur text-xs font-bold rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {shop.rating?.toFixed(1) || "New"}
                      </div>
                    </div>
                    <div className="p-4 pt-8">
                      <h3 className="font-bold text-lg line-clamp-1">{shop.shopName}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {shop.city}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* TRENDING PRODUCTS */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-500 flex items-center gap-2">
              <Zap className="w-8 h-8 text-amber-500 fill-amber-500/20" /> Trending Deals
            </h2>
            <Link href="/explore" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[1, 2, 3, 4].map(i => <div key={i} className="h-80 rounded-3xl bg-secondary/50 animate-pulse" />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="group bg-card/40 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-3xl p-3 hover:border-primary/30 transition-all flex flex-col"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary mb-3">
                    <img src={product.images[0] || "https://via.placeholder.com/200"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur text-[10px] font-bold rounded-lg border border-white/10 uppercase text-primary">
                      {product.category}
                    </div>
                  </div>
                  <h3 className="font-semibold line-clamp-1 px-1">{product.name}</h3>
                  <div className="mt-auto pt-3 px-1 flex items-center justify-between">
                    <span className="font-black text-lg">${product.price.toFixed(2)}</span>
                    <button className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

      </div>
      <AIBot />
      <Footer />
    </main>
  );
}
