"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Store, Package, Edit, Trash2, ExternalLink, MapPin, ShieldCheck, Eye } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShopManagerPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'shopkeeper') {
      router.push("/login/seller");
      return;
    }

    const fetchShopAndProducts = async () => {
      try {
        const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
        
        // 1. Get Shop
        const shopRes = await fetch(`http://localhost:5000/api/shops/owner`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShop(shopData);
          
          // 2. Get Products
          const productsRes = await fetch(`http://localhost:5000/api/products/shop/${shopData._id}`);
          if (productsRes.ok) {
            const productsData = await productsRes.json();
            setProducts(productsData);
          }
        }
      } catch (error) {
        console.error("Error fetching shop/products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopAndProducts();
  }, [isAuthenticated, user, router]);

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-64 bg-secondary/50 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-64 bg-secondary/50 rounded-2xl animate-pulse"></div>)}
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Store className="w-20 h-20 text-muted-foreground opacity-30 mb-6" />
        <h2 className="text-3xl font-bold mb-4">No Shop Found</h2>
        <p className="text-muted-foreground mb-8">You haven't set up your storefront yet.</p>
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold">Create Storefront</button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Shop Profile Header */}
      <div className="relative w-full h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden bg-secondary border border-white/10 group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
        {shop.banner ? (
          <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Store className="w-24 h-24 text-muted-foreground opacity-30" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-background overflow-hidden bg-secondary shadow-xl shrink-0">
              <img src={shop.shopImage || "https://via.placeholder.com/200"} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">{shop.shopName}</h1>
                {shop.isVerified && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
              </div>
              <p className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                <MapPin className="w-4 h-4 text-emerald-500" /> {shop.address}, {shop.city}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-secondary/80 backdrop-blur-md hover:bg-secondary border border-white/10 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
            <Link href={`/shops/${shop._id}`} target="_blank" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <Eye className="w-4 h-4" /> View Live Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-emerald-500" /> Listed Products ({products.length})
          </h2>
          <Link href="/dashboard" className="px-4 py-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 rounded-xl text-sm font-medium transition-colors">
            + Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-card/40 border border-white/5 rounded-3xl backdrop-blur-sm">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-2xl font-bold mb-2">No products listed</h3>
            <p className="text-muted-foreground mb-6">You haven't added any products to your storefront yet.</p>
            <Link href="/dashboard" className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary">
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/300"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur text-white flex items-center justify-center hover:bg-emerald-500 transition-colors border border-white/10">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteProduct(product._id)} className="w-8 h-8 rounded-lg bg-background/80 backdrop-blur text-destructive flex items-center justify-center hover:bg-destructive hover:text-white transition-colors border border-white/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {product.stock <= 5 && (
                     <div className="absolute bottom-3 left-3 bg-orange-500/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white border border-orange-400/30">
                       Low Stock: {product.stock}
                     </div>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-xs text-emerald-500 font-bold uppercase mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{product.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-bold text-lg text-white">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">Stock: {product.stock}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
