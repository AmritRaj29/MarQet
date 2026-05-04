"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, Activity, ArrowUpRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function EarningsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingPayout: 0,
    completedOrders: 0,
    thisMonth: 0
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'shopkeeper') {
      router.push("/login/seller");
      return;
    }

    const fetchEarnings = async () => {
      try {
        const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
        
        // Mocking the earnings calculation from orders
        const shopRes = await fetch(`http://localhost:5000/api/shops/owner`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (shopRes.ok) {
          const shopData = await shopRes.json();
          const ordersRes = await fetch(`http://localhost:5000/api/orders/shop/${shopData._id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          
          if (ordersRes.ok) {
            const orders = await ordersRes.json();
            
            let total = 0;
            let pending = 0;
            let completed = 0;
            
            orders.forEach((o: any) => {
              if (o.status === 'completed') {
                total += o.totalAmount;
                completed++;
              }
              if (o.status === 'accepted') {
                pending += o.totalAmount;
              }
            });
            
            setStats({
              totalEarnings: total,
              pendingPayout: pending,
              completedOrders: completed,
              thisMonth: total * 0.8 // mockup
            });
          }
        }
      } catch (error) {
        console.error("Error fetching earnings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-32 bg-secondary/50 rounded-2xl animate-pulse"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">Financial Overview</h1>
          <p className="text-muted-foreground">Track your revenue, payouts, and business growth.</p>
        </div>
        <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 dark:text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
          Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="bg-card/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><DollarSign className="w-24 h-24" /></div>
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">Total Earnings</p>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white">${stats.totalEarnings.toFixed(2)}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10"><CreditCard className="w-24 h-24" /></div>
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-4 border border-yellow-500/30">
            <CreditCard className="w-6 h-6" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">Pending Payout</p>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white">${stats.pendingPayout.toFixed(2)}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-emerald-500 p-6 rounded-3xl relative overflow-hidden shadow-xl shadow-emerald-500/20">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-zinc-900 dark:text-white"><Activity className="w-24 h-24" /></div>
          <div className="w-12 h-12 bg-black/20 text-zinc-900 dark:text-white rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-emerald-100 font-medium mb-1">Completed Orders</p>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white">{stats.completedOrders}</h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-6 md:p-8 rounded-3xl h-96 flex flex-col justify-center items-center text-center">
          <Activity className="w-16 h-16 text-muted-foreground opacity-30 mb-4" />
          <h3 className="text-xl font-bold mb-2">Detailed Charts Coming Soon</h3>
          <p className="text-muted-foreground max-w-sm">We're building an advanced analytics dashboard to help you visualize your growth over time.</p>
        </div>
        
        <div className="bg-card/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
          {stats.completedOrders === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground text-sm">No transactions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white text-sm">Payout Processed</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-500">+$45.00</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
