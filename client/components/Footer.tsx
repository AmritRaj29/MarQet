"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "For Users",
      links: [
        { label: "Explore Shops", href: "/shops" },
        { label: "How it Works", href: "#" },
        { label: "PayLater Credit", href: "#" },
        { label: "Refer a Friend", href: "#" },
      ],
    },
    {
      title: "For Sellers",
      links: [
        { label: "Become a Seller", href: "/register?role=shopkeeper" },
        { label: "Seller Dashboard", href: "/dashboard" },
        { label: "Pricing & Plans", href: "#" },
        { label: "Success Stories", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Safety Center", href: "#" },
        { label: "Community Guidelines", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-zinc-900 pt-24 pb-8 border-t border-zinc-200 dark:border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-zinc-600 dark:text-white/60 mb-8 max-w-sm leading-relaxed">
              Elevating the local shopping experience. Connect with neighborhood stores instantly, securely, and seamlessly.
            </p>
            
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-zinc-900 dark:text-white hover:border-primary transition-all hover:scale-110 active:scale-95 text-zinc-600 dark:text-white/60">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.href} className="text-zinc-600 dark:text-white/60 hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-white/10 pt-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 bg-black/5 dark:bg-white/5 p-2 rounded-full border border-zinc-200 dark:border-white/10 w-full md:w-auto">
            <input type="email" placeholder="Subscribe to our newsletter" className="bg-transparent border-none outline-none text-zinc-900 dark:text-white px-4 text-sm w-full md:w-64" />
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform shrink-0">
              <ArrowRight className="w-4 h-4 text-zinc-900 dark:text-white" />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="text-zinc-400 dark:text-white/40 text-sm">
              &copy; {new Date().getFullYear()} MarQet Technologies Inc. All rights reserved.
            </p>
            <p className="text-zinc-400 dark:text-white/40 text-sm flex items-center gap-1">
              Made with <span className="text-red-500 animate-pulse">❤️</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
