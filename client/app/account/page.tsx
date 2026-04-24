"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function UserAccountPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login/user");
      return;
    }

    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [isAuthenticated, router, activeTab, user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
      const res = await fetch(`http://localhost:5000/api/orders/user/${user?._id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) return null;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === "profile" ? "bg-primary text-white shadow-lg" : "hover:bg-secondary text-muted-foreground hover:text-white"}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <Settings className="w-5 h-5" /> Profile Settings
                </div>
                {activeTab === "profile" && <ChevronRight className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === "orders" ? "bg-primary text-white shadow-lg" : "hover:bg-secondary text-muted-foreground hover:text-white"}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <Package className="w-5 h-5" /> Order History
                </div>
                {activeTab === "orders" && <ChevronRight className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeTab === "addresses" ? "bg-primary text-white shadow-lg" : "hover:bg-secondary text-muted-foreground hover:text-white"}`}
              >
                <div className="flex items-center gap-3 font-medium">
                  <MapPin className="w-5 h-5" /> Saved Addresses
                </div>
                {activeTab === "addresses" && <ChevronRight className="w-4 h-4" />}
              </button>

              <div className="pt-4 mt-4 border-t border-white/10">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-destructive/10 text-destructive font-medium"
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-bold text-white mb-8">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <input type="text" defaultValue={user.name} disabled className="w-full bg-secondary/50 border border-white/5 rounded-xl p-3 text-white opacity-70 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <input type="email" defaultValue={user.email} disabled className="w-full bg-secondary/50 border border-white/5 rounded-xl p-3 text-white opacity-70 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Account Role</label>
                  <input type="text" defaultValue="Customer" disabled className="w-full bg-secondary/50 border border-white/5 rounded-xl p-3 text-white opacity-70 cursor-not-allowed" />
                </div>
              </div>
              <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
                <h3 className="text-lg font-bold text-primary mb-2">Want to upgrade?</h3>
                <p className="text-sm text-muted-foreground mb-4">You can apply to become a verified local seller and start managing your own storefront.</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">Apply as Seller</button>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-bold text-white mb-8">Order History</h2>
              
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-32 bg-secondary/50 animate-pulse rounded-2xl"></div>)}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-secondary/30 rounded-2xl border border-white/5">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                  <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">Looks like you haven't made your first purchase.</p>
                  <button onClick={() => router.push('/explore')} className="px-6 py-2 bg-primary text-white rounded-full font-medium">Start Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order: any) => (
                    <div key={order._id} className="bg-secondary/40 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Order #{order._id.slice(-8).toUpperCase()}</p>
                          <p className="font-medium text-white">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
                            ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : ''}
                            ${order.status === 'accepted' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
                            ${order.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                            ${order.status === 'declined' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                          `}>
                            {order.status === 'pending' && <Clock className="w-3 h-3" />}
                            {order.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                            {order.status === 'declined' && <XCircle className="w-3 h-3" />}
                            {order.status.toUpperCase()}
                          </span>
                          <span className="text-xl font-black text-white">${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-background overflow-hidden border border-white/10 shrink-0">
                              <img src={item.productId?.images?.[0] || "https://via.placeholder.com/100"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-white">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "addresses" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-3xl font-bold text-white mb-8">Saved Addresses</h2>
              <div className="text-center py-20 bg-secondary/30 rounded-2xl border border-white/5 border-dashed">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
                <h3 className="text-lg font-medium text-white mb-2">No addresses saved</h3>
                <p className="text-muted-foreground mb-6 text-sm">Save an address during checkout for faster purchases.</p>
              </div>
            </motion.div>
          )}

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
