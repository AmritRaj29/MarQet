"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { DollarSign, Package, ShoppingCart, TrendingUp, Plus, Upload, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  
  // Product Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    images: ""
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.split(',').map(url => url.trim()).filter(url => url)
      };

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess("Product added successfully!");
        setFormData({ name: "", price: "", stock: "", category: "", description: "", images: "" });
      }
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setLoading(false);
    }
  };

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
              className="p-6 rounded-2xl bg-card border border-zinc-200 dark:border-white/10 shadow-sm hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
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
        {/* Add Product Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-card/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Add New Product</h2>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-xl text-sm font-medium">
              {success}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Organic Apples" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Groceries" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Stock Quantity</label>
                <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="100" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Describe your product..."></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Image URLs (comma separated)</label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input required type="text" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} className="w-full bg-secondary/50 border border-zinc-200 dark:border-white/10 rounded-xl p-3 pl-10 text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="https://image1.jpg, https://image2.jpg" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 dark:text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Publish Product</>}
            </button>
          </form>
        </div>
        
        {/* Quick Tips */}
        <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-50">
          <h3 className="text-lg font-bold text-emerald-500 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Quick Tips</h3>
          <ul className="space-y-4 text-sm text-emerald-100/70">
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div> Upload high-quality, bright images to attract more customers.</li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div> Keep descriptions concise but include all key details and dimensions.</li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div> Competitive pricing significantly boosts visibility on the Explore page.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
