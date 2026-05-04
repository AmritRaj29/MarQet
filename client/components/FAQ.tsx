"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How fast is the delivery?",
    a: "Because MarQet connects you with shops directly in your neighborhood, deliveries are incredibly fast. If you select 'Platform Delivery', you can expect your items in under 30 minutes on average."
  },
  {
    q: "How does the 'Price Compare AI' work?",
    a: "Just type what you need naturally (e.g., 'milk' or 'doodh'). Our system instantly scans all local shops in your radius, normalizes the terms, and sorts the results to show you the absolute cheapest option."
  },
  {
    q: "What is PayLater Credit?",
    a: "It's a micro-credit system built on local trust. You can request to pay later at checkout. If the shopkeeper approves it, you get your items immediately and settle your credit balance directly through the app later."
  },
  {
    q: "How do I become a seller?",
    a: "Click on 'Become a Seller' in the navigation. Fill out your shop details, and you'll get instant access to a powerful dashboard where you can manage inventory and track orders."
  },
  {
    q: "Are there any platform fees?",
    a: "For users, the app is completely free. For sellers, we offer a free tier to get started, and premium subscriptions if you want to utilize our integrated delivery fleet."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-background relative" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4">Frequently Asked</h2>
          <p className="text-xl text-zinc-600 dark:text-white/60">Everything you need to know about MarQet.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? "bg-black/5 dark:bg-white/5 border-zinc-300 dark:border-white/20" : "bg-transparent border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:border-white/20"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-xl font-bold text-zinc-900 dark:text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-primary text-zinc-900 dark:text-white" : "bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white"}`}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-lg text-zinc-600 dark:text-white/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
