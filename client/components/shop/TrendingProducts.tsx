"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Zap } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  shopId: {
    _id: string;
    shopName: string;
  };
  isCheapest?: boolean;
}

interface TrendingProductsProps {
  products: Product[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500",
      shopId: product.shopId._id,
      shopName: product.shopId.shopName,
    });
    // Optional: Add toast notification here
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const bgImage = product.image || "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500";
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${product._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 0.5, delay: index % 4 * 0.1 }}
        className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-zinc-300 dark:border-white/20 transition-colors cursor-pointer h-full"
      >
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-black/5 dark:bg-white/5">
          <img 
            src={bgImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isCheapest && (
              <div className="px-2 py-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg text-[10px] font-bold text-zinc-900 dark:text-white shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> Cheapest
              </div>
            )}
            {discount > 0 && (
              <div className="px-2 py-1 bg-emerald-500 rounded-lg text-[10px] font-bold text-zinc-900 dark:text-white shadow-lg">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md flex items-center justify-center border border-zinc-200 dark:border-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors z-10"
          >
            <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-teal-400 text-teal-400" : "text-zinc-900 dark:text-white"}`} />
          </button>

          {/* Quick Add Button (Hover) */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button 
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-zinc-900 dark:text-white text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-zinc-500 dark:text-white/50 text-xs mb-3 truncate flex-1">
            Sold by {product.shopId.shopName}
          </p>
          
          <div className="flex items-end gap-2 mt-auto">
            <span className="text-lg font-black text-zinc-900 dark:text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm font-medium text-zinc-400 dark:text-white/40 line-through mb-0.5">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TrendingProducts({ products, isLoading, onLoadMore, hasMore }: TrendingProductsProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
          Trending Near You <span className="text-2xl">🔥</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
        
        {isLoading && (
          [...Array(8)].map((_, i) => (
            <div key={`skel-${i}`} className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden h-full">
              <div className="w-full aspect-square bg-black/5 dark:bg-white/5 animate-pulse"></div>
              <div className="p-4 flex flex-col gap-2">
                <div className="w-3/4 h-4 bg-black/10 dark:bg-white/10 rounded animate-pulse"></div>
                <div className="w-1/2 h-3 bg-black/5 dark:bg-white/5 rounded animate-pulse mb-2"></div>
                <div className="w-1/3 h-6 bg-black/10 dark:bg-white/10 rounded animate-pulse mt-auto"></div>
              </div>
            </div>
          ))
        )}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-zinc-500 dark:text-white/50 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl mx-4 md:mx-0">
          <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
          <p>No products found in this area.</p>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={onLoadMore}
            className="px-8 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-900 dark:text-white font-medium transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
}
