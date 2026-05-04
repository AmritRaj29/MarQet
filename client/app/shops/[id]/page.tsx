"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Store, Star, MapPin, ShoppingBag, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/useCartStore";

export default function ShopDetailsPage() {
  const params = useParams();
  const shopId = params.id as string;
  
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const [shopRes, productsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/shops/${shopId}`),
          fetch(`http://localhost:5000/api/products/shop/${shopId}`)
        ]);

        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShop(shopData);
        }
        
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(Array.isArray(productsData) ? productsData : []);
        }
      } catch (error) {
        console.error("Error fetching shop details", error);
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchShopData();
    }
  }, [shopId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-24">
        <Navbar />
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 animate-pulse">
          <div className="w-full h-64 md:h-96 bg-secondary/50 rounded-3xl mb-8"></div>
          <div className="w-1/3 h-12 bg-secondary/50 rounded-xl mb-4"></div>
          <div className="w-1/2 h-6 bg-secondary/50 rounded-md mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-64 bg-secondary/50 rounded-2xl"></div>
             <div className="h-64 bg-secondary/50 rounded-2xl"></div>
             <div className="h-64 bg-secondary/50 rounded-2xl"></div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!shop) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col pt-24">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Store className="w-20 h-20 text-muted-foreground opacity-50 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Shop Not Found</h1>
          <p className="text-muted-foreground mb-8">The shop you're looking for doesn't exist or was removed.</p>
          <Link href="/shops" className="px-6 py-3 bg-primary text-zinc-900 dark:text-white rounded-full font-medium hover:bg-primary/90 transition">
            Browse All Shops
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 pb-24">
      <Navbar />
      
      {/* Shop Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <Link href="/shops" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Shops
        </Link>
        
        <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden bg-secondary border border-zinc-200 dark:border-white/10 group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10"></div>
          {shop.banner ? (
            <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Store className="w-24 h-24 text-muted-foreground opacity-30" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-background overflow-hidden bg-secondary shadow-xl shrink-0">
              <img src={shop.shopImage || "https://via.placeholder.com/200"} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white">{shop.shopName}</h1>
                {shop.isVerified && (
                  <span className="bg-blue-500/90 backdrop-blur px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white rounded-full flex items-center gap-1 shadow-lg border border-blue-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
              <p className="text-zinc-800 dark:text-white/90 text-lg max-w-2xl mb-4 line-clamp-2 md:line-clamp-none">
                {shop.description || "Premium local seller offering high-quality products."}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-primary" /> {shop.city || "Local"}
                </span>
                <span className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {shop.rating?.toFixed(1) || "New"}
                </span>
                {shop.deliveryOptions?.pickup && (
                  <span className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white">
                    <Clock className="w-4 h-4 text-green-400" /> Pickup Available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Products Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex-1">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">
          <h2 className="text-3xl font-bold">Shop Products</h2>
          <span className="text-muted-foreground bg-secondary px-4 py-1.5 rounded-full text-sm font-medium">
            {products.length} Items
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-card border border-zinc-200 dark:border-white/10 rounded-3xl">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-2xl font-bold mb-2">No products yet</h3>
            <p className="text-muted-foreground">This shop hasn't listed any products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-card/40 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary">
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1 border border-zinc-200 dark:border-white/10">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {product.rating?.toFixed(1) || "New"}
                  </div>
                  {product.stock <= 5 && product.stock > 0 && (
                     <div className="absolute top-3 right-3 bg-orange-500/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-zinc-900 dark:text-white border border-orange-400/30">
                       Only {product.stock} left
                     </div>
                  )}
                  {product.stock === 0 && (
                     <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-sm">
                       <span className="text-zinc-900 dark:text-white font-bold text-lg rotate-12 bg-red-500 px-6 py-1 border-2 border-white border-dashed">OUT OF STOCK</span>
                     </div>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs text-primary font-bold tracking-wider uppercase mb-1">{product.category}</p>
                  <h3 className="font-semibold text-lg text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">${product.price.toFixed(2)}</span>
                    <button 
                      disabled={product.stock === 0}
                      onClick={() => {
                        addItem({
                          _id: product._id,
                          name: product.name,
                          price: product.price,
                          image: product.images?.[0] || "",
                          shopId: shop._id,
                          shopName: shop.shopName,
                        });
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        product.stock === 0 
                          ? "bg-secondary text-muted-foreground cursor-not-allowed" 
                          : "bg-primary/20 text-primary hover:bg-primary hover:text-zinc-900 dark:text-white hover:scale-110 active:scale-95"
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
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
