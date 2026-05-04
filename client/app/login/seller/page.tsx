"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Phone, MessageSquare } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SellerLoginPage() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginAction = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      
      if (data.role !== 'shopkeeper') {
         throw new Error("Invalid account type. Please use Customer Login.");
      }

      loginAction(data, data.token);
      router.push("/dashboard"); // Seller Homepage
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      // MOCK Google Login
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Mock Google Seller",
          email: "mock_seller@example.com",
          googleId: "mock-google-id-seller-12345",
          role: "shopkeeper"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google Login failed");

      if (data.role !== 'shopkeeper') {
         throw new Error("Invalid account type. Please use Customer Login.");
      }

      loginAction(data, data.token);
      router.push("/dashboard"); // Seller Homepage
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, role: "shopkeeper", name: "Phone Seller", email: `seller_${phone}@example.com` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to verify OTP");

      if (data.role !== 'shopkeeper') {
         throw new Error("Invalid account type. Please use Customer Login.");
      }

      loginAction(data, data.token);
      router.push("/dashboard"); // Seller Homepage
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen bg-emerald-500/20"
        ></motion.div>
        <motion.div 
          className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen bg-yellow-500/20 delay-100"
        ></motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="backdrop-blur-2xl bg-card/40 border border-zinc-200 dark:border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2rem]" />

          <div className="text-center mb-6 relative z-10 flex flex-col items-center">
            <Link href="/" className="inline-block mb-4">
              <Logo className="w-12 h-12" textClassName="text-4xl" />
            </Link>
            <h2 className="text-2xl font-bold text-emerald-500 mb-1">Seller Portal</h2>
            <p className="text-muted-foreground text-sm">Manage your business on MarQet</p>
          </div>

          <div className="flex gap-2 mb-6 relative z-10">
            <button onClick={() => setMethod("email")} className={`flex-1 py-2 text-sm font-semibold rounded-lg border ${method === 'email' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-zinc-200 dark:border-white/10 text-muted-foreground'}`}>Email</button>
            <button onClick={() => setMethod("phone")} className={`flex-1 py-2 text-sm font-semibold rounded-lg border ${method === 'phone' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-zinc-200 dark:border-white/10 text-muted-foreground'}`}>Phone</button>
          </div>

          <AnimatePresence mode="popLayout">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 mb-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {method === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Business Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-foreground" placeholder="shop@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-foreground" placeholder="••••••••" />
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3.5 px-4 text-zinc-900 dark:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-2">
                {isLoading ? "Authenticating..." : "Access Dashboard"}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </form>
          ) : (
            <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                  <input type="tel" required value={phone} disabled={otpSent} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-foreground disabled:opacity-50" placeholder="+1 234 567 8900" />
                </div>
              </div>

              {otpSent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">OTP Code</label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                    <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-black/20 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-foreground" placeholder="123456" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-1 text-emerald-500">Hint: Enter 123456</p>
                </motion.div>
              )}

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3.5 px-4 text-zinc-900 dark:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-2">
                {isLoading ? "Processing..." : (otpSent ? "Verify & Login" : "Send OTP")}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </motion.button>
            </form>
          )}

          <div className="relative z-10 my-6 flex items-center">
            <div className="flex-1 border-t border-zinc-200 dark:border-white/10"></div>
            <span className="px-3 text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 border-t border-zinc-200 dark:border-white/10"></div>
          </div>

          <motion.button onClick={handleGoogleLogin} disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 w-full py-3 px-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-900 dark:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </motion.button>

          <div className="mt-6 text-center text-sm text-muted-foreground relative z-10">
            Want to become a seller?{" "}
            <Link href="/register" className="text-emerald-500 hover:underline font-medium">
              Apply here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
