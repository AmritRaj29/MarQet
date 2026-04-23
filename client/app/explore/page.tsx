"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Star, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function ExploreProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { location, isLoading: locationLoading } = useGeolocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/products?keyword=${keyword}`;
        if (location) {
          url += `&lat=${location.lat}&lng=${location.lng}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!locationLoading) {
      // Simple debounce
      const timeoutId = setTimeout(() => {
        fetchProducts();
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
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Explore</h1>
            <p className="text-muted-foreground">Find thousands of products from your local area.</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-3 bg-card border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all shadow-sm"
              />
            </div>
            <button className="p-3 bg-secondary border border-white/5 rounded-xl hover:bg-secondary/80 transition-colors">
              <Filter className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-secondary/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">No products found</p>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary">
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    {product.rating?.toFixed(1) || "New"}
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">By {product.shopId?.shopName || "Unknown Shop"}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
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
