"use client";

import { motion } from "framer-motion";
import { Search, Map, CreditCard, Box } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Search for anything from electronics to fresh groceries in your immediate neighborhood.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400"
  },
  {
    icon: Map,
    title: "Locate",
    description: "Find verified local sellers right around the corner. Support your community directly.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    icon: CreditCard,
    title: "Transact",
    description: "Secure, instant payments powered by MarQet's highly encrypted infrastructure.",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400"
  },
  {
    icon: Box,
    title: "Receive",
    description: "Pick up instantly or get same-day hyper-local delivery straight to your door.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-emerald-400"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 relative z-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            A frictionless journey from discovery to delivery, engineered for speed and simplicity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative h-full bg-card/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
                <div className={`w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-8 border border-white/5 ${step.iconColor}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
