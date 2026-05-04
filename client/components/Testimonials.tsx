"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Bangalore",
    quote: "MarQet has completely changed how I do my daily groceries. The AI price compare is magic!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=ravi",
    delay: 0.1,
  },
  {
    name: "Neha Sharma",
    location: "Delhi",
    quote: "I love the PayLater feature. I can grab what I need immediately and settle the bill on payday.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=neha",
    delay: 0.3,
  },
  {
    name: "Amit Patel",
    location: "Mumbai",
    quote: "As a shopkeeper, the dashboard is incredibly intuitive. My sales went up 40% in the first month.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=amit",
    delay: 0.2,
  },
  {
    name: "Priya Singh",
    location: "Pune",
    quote: "The delivery is always under 30 minutes because the shops are literally down my street.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=priya",
    delay: 0.4,
  },
  {
    name: "Vikram Reddy",
    location: "Hyderabad",
    quote: "Beautiful interface. The app feels so premium compared to other clunky delivery apps.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=vikram",
    delay: 0.5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-background relative border-y border-zinc-200 dark:border-white/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Loved by Locals</h2>
          <p className="text-xl text-zinc-600 dark:text-white/60">Don't just take our word for it.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: t.delay }}
              className="break-inside-avoid bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-zinc-300 dark:text-white/20"}`} 
                  />
                ))}
              </div>
              <p className="text-lg text-zinc-800 dark:text-white/90 font-medium leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-zinc-500 dark:text-white/50">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
