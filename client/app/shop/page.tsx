"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import HeroCarousel from "@/components/shop/amazon-layout/HeroCarousel";
import TrustBadges from "@/components/shop/amazon-layout/TrustBadges";
import CategoryGrid from "@/components/shop/amazon-layout/CategoryGrid";
import TodaysDeals from "@/components/shop/amazon-layout/TodaysDeals";
import TopSellers from "@/components/shop/amazon-layout/TopSellers";
import PromoGrid from "@/components/shop/amazon-layout/PromoGrid";
import RecommendedGrid from "@/components/shop/amazon-layout/RecommendedGrid";
import NewShopsGrid from "@/components/shop/amazon-layout/NewShopsGrid";
import RecentlyViewed from "@/components/shop/amazon-layout/RecentlyViewed";
import AppBanner from "@/components/shop/amazon-layout/AppBanner";
import DenseFooter from "@/components/shop/amazon-layout/DenseFooter";

import AIBot from "@/components/AIBot";

export default function DenseShopPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Toast Handler
  const showToast = (productName: string) => {
    setToastMessage(`Added ${productName} to cart`);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="flex flex-col relative w-full bg-white dark:bg-zinc-900 pb-0">
      <HeroCarousel />
      <TrustBadges />
      <CategoryGrid />
      <TodaysDeals onAddToCart={showToast} />
      <TopSellers />
      <PromoGrid />
      <RecommendedGrid onAddToCart={showToast} />
      <NewShopsGrid />
      <RecentlyViewed />
      <AppBanner />
      <DenseFooter />
      
      {/* Retained AI Bot */}
      <AIBot />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:right-32 bg-gray-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-teal-400/30 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[60]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
