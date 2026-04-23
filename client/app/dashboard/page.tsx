"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Total Revenue", value: "$12,450", icon: DollarSign, trend: "+14%" },
    { label: "Active Products", value: "45", icon: Package, trend: "+2" },
    { label: "New Orders", value: "12", icon: ShoppingCart, trend: "+5" },
    { label: "Store Views", value: "1,240", icon: TrendingUp, trend: "+22%" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-white/5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-white/5 h-96 flex items-center justify-center text-muted-foreground">
          Sales Chart Placeholder
        </div>
        <div className="p-6 rounded-2xl bg-card border border-white/5 h-96 flex items-center justify-center text-muted-foreground">
          Recent Orders Placeholder
        </div>
      </div>
    </div>
  );
}
