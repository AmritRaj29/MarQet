"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Package, CheckCircle, XCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SellerOrdersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'shopkeeper') {
      router.push("/login/seller");
      return;
    }

    const fetchShopAndOrders = async () => {
      try {
        const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
        
        // 1. Get Shop ID
        const shopRes = await fetch(`http://localhost:5000/api/shops/owner`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShop(shopData);
          
          // 2. Get Orders
          const ordersRes = await fetch(`http://localhost:5000/api/orders/shop/${shopData._id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          
          if (ordersRes.ok) {
            const ordersData = await ordersRes.json();
            setOrders(ordersData);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopAndOrders();
  }, [isAuthenticated, user, router]);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
      
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        // Update local state
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-10 w-48 bg-secondary/50 rounded-lg animate-pulse mb-8"></div>
        {[1,2,3].map(i => <div key={i} className="h-40 bg-secondary/50 rounded-2xl animate-pulse"></div>)}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Order Management</h1>
          <p className="text-muted-foreground">Accept, decline, and track your incoming orders.</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 font-bold">
          {orders.filter(o => o.status === 'pending').length} Pending
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-card/40 border border-white/5 rounded-3xl backdrop-blur-sm">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h3 className="text-2xl font-bold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">When customers buy your products, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order: any, idx: number) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-card/40 backdrop-blur-md border rounded-2xl p-6 transition-all ${
                order.status === 'pending' ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-white/5'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                
                {/* Order Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">#{order._id.slice(-8).toUpperCase()}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-white font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1
                      ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : ''}
                      ${order.status === 'accepted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
                      ${order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : ''}
                      ${order.status === 'declined' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                    `}>
                      {order.status === 'pending' && <Clock className="w-3 h-3" />}
                      {order.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                      {order.status === 'declined' && <XCircle className="w-3 h-3" />}
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {order.products.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-white"><span className="text-muted-foreground mr-2">{item.qty}x</span> {item.name}</span>
                        <span className="text-muted-foreground">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <p className="text-sm text-muted-foreground mb-0.5">Customer</p>
                      <p className="font-medium text-white">{order.userId?.name || "Guest User"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-0.5">Total</p>
                      <p className="text-xl font-bold text-emerald-500">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {order.status === 'pending' && (
                  <div className="flex lg:flex-col gap-3 lg:w-48 shrink-0 justify-end">
                    <button 
                      onClick={() => updateStatus(order._id, 'accepted')}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(order._id, 'declined')}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 py-3 bg-destructive/20 hover:bg-destructive/40 text-destructive border border-destructive/30 font-bold rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                  </div>
                )}

                {order.status === 'accepted' && (
                  <div className="flex lg:flex-col gap-3 lg:w-48 shrink-0 justify-end">
                    <button 
                      onClick={() => updateStatus(order._id, 'completed')}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-2 py-3 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-500 border border-emerald-500/30 font-bold rounded-xl transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark Completed
                    </button>
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
