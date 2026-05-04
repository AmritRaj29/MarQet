"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm your MarQet AI assistant. Want me to compare prices for a specific product?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userQuery = query.trim();
    setQuery("");
    setMessages(prev => [...prev, { role: 'user', text: userQuery }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("auth-storage") ? JSON.parse(localStorage.getItem("auth-storage") as string)?.state?.token : null;
      
      const res = await fetch("http://localhost:5000/api/bot/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productQuery: userQuery })
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I encountered an error. Please try again later." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Network error. Please make sure you are connected." }]);
    } finally {
      setLoading(false);
    }
  };

  // Always render the button, but we can handle auth inside the chat window if needed
  // if (!isAuthenticated) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 text-zinc-900 dark:text-white shadow-[0_0_30px_rgba(45,212,191,0.5)] border-2 border-zinc-300 dark:border-white/20 hover:scale-110 active:scale-95 transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 -z-10"
          />
          <Sparkles className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[380px] h-[550px] bg-card/90 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/20 to-transparent border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-zinc-900 dark:text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">MarQet AI</h3>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground hover:text-zinc-900 dark:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-zinc-900 dark:text-white rounded-br-sm' 
                      : 'bg-secondary text-foreground rounded-bl-sm border border-zinc-200 dark:border-white/10'
                  }`}>
                    {/* Render markdown style loosely */}
                    <div className="text-sm space-y-2 whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary p-3 rounded-2xl rounded-bl-sm border border-zinc-200 dark:border-white/10 flex gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-primary rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-200 dark:border-white/10 bg-background/50">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask to compare prices..." 
                  className="w-full bg-secondary/80 border border-zinc-200 dark:border-white/10 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-zinc-900 dark:text-white transition-all"
                />
                <button 
                  type="submit"
                  disabled={!query.trim() || loading}
                  className="absolute right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-zinc-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
