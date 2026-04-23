"use client";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, Store, MapPin, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { token, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [paymentType, setPaymentType] = useState<"cash_pickup" | "upi">("cash_pickup");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <Navbar />
        <div className="text-center p-8 bg-card rounded-3xl border border-white/5 max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">Thank you for supporting local businesses. Your order has been placed successfully.</p>
          <button 
            onClick={() => router.push("/explore")}
            className="w-full py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);

    try {
      const payload = {
        items,
        mode,
        paymentType,
        deliveryAddress: mode === "delivery" ? address : undefined,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Order creation failed");

      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-white/5">
            <p className="text-xl text-muted-foreground">Your cart is empty.</p>
            <button 
              onClick={() => router.push("/explore")}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Go Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Delivery Mode */}
              <div className="bg-card p-6 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Delivery Method
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setMode("pickup")}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${mode === "pickup" ? "border-primary bg-primary/5" : "border-white/5 hover:border-white/10 bg-secondary/50"}`}
                  >
                    <Store className={`w-6 h-6 mb-3 ${mode === "pickup" ? "text-primary" : "text-muted-foreground"}`} />
                    <h3 className="font-semibold text-foreground">Store Pickup</h3>
                    <p className="text-xs text-muted-foreground mt-1">Pick up directly from the shop</p>
                  </button>
                  <button 
                    onClick={() => setMode("delivery")}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${mode === "delivery" ? "border-primary bg-primary/5" : "border-white/5 hover:border-white/10 bg-secondary/50"}`}
                  >
                    <Truck className={`w-6 h-6 mb-3 ${mode === "delivery" ? "text-primary" : "text-muted-foreground"}`} />
                    <h3 className="font-semibold text-foreground">Local Delivery</h3>
                    <p className="text-xs text-muted-foreground mt-1">Delivered to your address</p>
                  </button>
                </div>

                {mode === "delivery" && (
                  <div className="mt-6 space-y-3">
                    <label className="text-sm font-medium text-foreground ml-1">Delivery Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-card p-6 rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                </h2>
                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentType === "cash_pickup" ? "border-primary bg-primary/5" : "border-white/5 bg-secondary/50"}`}>
                    <input type="radio" name="payment" value="cash_pickup" checked={paymentType === "cash_pickup"} onChange={() => setPaymentType("cash_pickup")} className="w-5 h-5 accent-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Pay on Pickup / Delivery</h3>
                      <p className="text-xs text-muted-foreground">Pay with cash when you receive your items</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentType === "upi" ? "border-primary bg-primary/5" : "border-white/5 bg-secondary/50"}`}>
                    <input type="radio" name="payment" value="upi" checked={paymentType === "upi"} onChange={() => setPaymentType("upi")} className="w-5 h-5 accent-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">Pay Online (Mock)</h3>
                      <p className="text-xs text-muted-foreground">Secure online payment</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="bg-card p-6 rounded-3xl border border-white/5 h-fit sticky top-28">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10 mb-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>{mode === "pickup" ? "Free" : "$5.00"}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2">
                  <span>Total</span>
                  <span>${(totalPrice() + (mode === "pickup" ? 0 : 5)).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading || (mode === "delivery" && !address)}
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
