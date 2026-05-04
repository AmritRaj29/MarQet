"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, Bell, Shield, Store, CreditCard, Check } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("store");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: "store", label: "Store Info", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-emerald-500" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage your shop preferences and account settings</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-zinc-900 dark:text-white font-bold rounded-xl flex items-center gap-2 transition-all disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <Check className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-zinc-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          {activeTab === "store" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
              <h2 className="text-xl font-bold border-b border-zinc-200 dark:border-white/10 pb-4">Store Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Contact Email</label>
                  <input type="email" defaultValue={user?.email} className="w-full px-4 py-2.5 bg-secondary border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <input type="tel" defaultValue="+1 234 567 8900" className="w-full px-4 py-2.5 bg-secondary border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Store Description</label>
                  <textarea rows={4} defaultValue="Your local neighborhood store for daily essentials." className="w-full px-4 py-2.5 bg-secondary border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                </div>
              </div>

              <h2 className="text-xl font-bold border-b border-zinc-200 dark:border-white/10 pb-4 pt-6">Operating Hours</h2>
              <div className="space-y-4">
                {['Monday - Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="font-medium">{day}</span>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="09:00" className="px-3 py-1.5 bg-secondary rounded-lg border border-zinc-200 dark:border-white/10 text-sm" />
                      <span>to</span>
                      <input type="time" defaultValue="18:00" className="px-3 py-1.5 bg-secondary rounded-lg border border-zinc-200 dark:border-white/10 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
              <h2 className="text-xl font-bold border-b border-zinc-200 dark:border-white/10 pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { title: "New Orders", desc: "Get notified when a customer places a new order." },
                  { title: "Low Stock Alerts", desc: "Receive alerts when products fall below 5 items." },
                  { title: "Customer Messages", desc: "Get notified about direct inquiries." },
                  { title: "Weekly Reports", desc: "Receive an email summary of your shop's performance." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-4 bg-secondary/50 rounded-2xl border border-zinc-200 dark:border-white/5">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input type="checkbox" defaultChecked={i !== 3} className="sr-only peer" />
                      <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === "security" || activeTab === "billing") && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                {activeTab === "security" ? <Shield className="w-8 h-8 text-emerald-500" /> : <CreditCard className="w-8 h-8 text-emerald-500" />}
              </div>
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">This section is currently under development. Check back later for updates.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
