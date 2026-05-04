"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User as UserIcon, Store, Phone, MapPin, Navigation } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [role, setRole] = useState<"user" | "shopkeeper">("user");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", address: "", lat: "", lng: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginAction = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const payload = {
      ...formData,
      role
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      loginAction({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }, data.token);
      
      router.push(role === "shopkeeper" ? "/dashboard" : "/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-12">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ backgroundColor: role === "user" ? "rgba(139, 92, 246, 0.15)" : "rgba(16, 185, 129, 0.15)" }}
          className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen transition-colors duration-700"
        ></motion.div>
        <motion.div 
          animate={{ backgroundColor: role === "user" ? "rgba(59, 130, 246, 0.15)" : "rgba(234, 179, 8, 0.15)" }}
          className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen transition-colors duration-700 delay-100"
        ></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg p-8 relative z-10"
      >
        <div className="backdrop-blur-2xl bg-card/40 border border-zinc-200 dark:border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2rem]" />

          <div className="text-center mb-8 relative z-10 flex flex-col items-center">
            <Link href="/" className="inline-block mb-4">
              <Logo className="w-12 h-12" textClassName="text-4xl" />
            </Link>
            <p className="text-muted-foreground text-sm">Create your new account</p>
          </div>

          {/* User/Seller Toggle */}
          <div className="flex p-1 bg-secondary/50 rounded-2xl mb-8 relative z-10">
            <button
              type="button" onClick={() => setRole("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all relative z-10 ${role === "user" ? "text-zinc-900 dark:text-white" : "text-muted-foreground hover:text-zinc-900 dark:text-white"}`}
            >
              <UserIcon className="w-4 h-4" /> Customer
            </button>
            <button
              type="button" onClick={() => setRole("shopkeeper")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-xl transition-all relative z-10 ${role === "shopkeeper" ? "text-zinc-900 dark:text-white" : "text-muted-foreground hover:text-zinc-900 dark:text-white"}`}
            >
              <Store className="w-4 h-4" /> Shopkeeper
            </button>
            
            <motion.div
              layoutId="register-toggle"
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl"
              initial={false}
              animate={{
                left: role === "user" ? "4px" : "calc(50% + 2px)",
                backgroundColor: role === "user" ? "var(--primary)" : "#10b981",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ zIndex: 0 }}
            />
          </div>

          <form onSubmit={handleRegister} className="space-y-4 relative z-10">
            <AnimatePresence mode="popLayout">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2">
                <label className="text-xs font-medium text-foreground ml-1">{role === "shopkeeper" ? "Shop Name" : "Full Name"}</label>
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground" placeholder={role === "shopkeeper" ? "Tech Haven" : "John Doe"} />
                </div>
              </div>

              <div className="space-y-1 col-span-2 md:col-span-1">
                <label className="text-xs font-medium text-foreground ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground" placeholder="you@example.com" />
                </div>
              </div>

              <div className="space-y-1 col-span-2 md:col-span-1">
                <label className="text-xs font-medium text-foreground ml-1">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="space-y-1 col-span-2">
                <label className="text-xs font-medium text-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground" placeholder="••••••••" />
                </div>
              </div>

              <AnimatePresence>
                {role === "shopkeeper" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="col-span-2 space-y-4 pt-2"
                  >
                    <div className="h-[1px] bg-black/10 w-full mb-2"></div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground ml-1">Shop Address</label>
                      <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-green-500 transition-colors" />
                        <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-foreground" placeholder="123 Market St, New York" />
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={isLoading}
              className="w-full py-3.5 mt-4 px-4 text-zinc-900 dark:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: role === "user" ? "var(--primary)" : "#10b981",
                boxShadow: role === "user" ? "0 0 20px rgba(139,92,246,0.4)" : "0 0 20px rgba(16,185,129,0.4)",
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground relative z-10">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium" style={{ color: role === "user" ? "var(--primary)" : "#10b981" }}>
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
