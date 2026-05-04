"use client";

import { Truck, Clock, ShieldCheck, RefreshCcw } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "Orders above ₹299",
  },
  {
    icon: Clock,
    title: "Same Day Delivery",
    subtitle: "Order before 12 PM",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    subtitle: "100% Protected",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    subtitle: "No questions asked",
  },
];

export default function TrustBadges() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-white/10 py-4 px-4 w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full">
                <Icon className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-900 dark:text-white font-bold text-sm leading-tight">{badge.title}</span>
                <span className="text-zinc-500 dark:text-white/50 text-xs">{badge.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
