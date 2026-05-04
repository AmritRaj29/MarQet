"use client";

import Link from "next/link";

export default function DenseFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-8 bg-white dark:bg-zinc-900 flex flex-col">
      {/* Back to top strip */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-[13px] font-medium py-4 transition-colors focus:outline-none"
      >
        Back to top
      </button>

      {/* Links Grid */}
      <div className="bg-gray-50 dark:bg-zinc-950 w-full pt-10 pb-16">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Get to Know Us</h4>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">About MarQet</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Careers</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Press Releases</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">MarQet Science</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Make Money with Us</h4>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Sell on MarQet</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Protect and Build Your Brand</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Become an Affiliate</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Advertise Your Products</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Let Us Help You</h4>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Your Account</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Returns Centre</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">100% Purchase Protection</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Help</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-zinc-900 dark:text-white font-bold mb-2">Connect with Us</h4>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Twitter</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Instagram</Link>
            <Link href="#" className="text-zinc-700 dark:text-white/70 hover:underline text-[13px]">Facebook</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white dark:bg-zinc-900 w-full py-8 border-t border-zinc-200 dark:border-white/10">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col items-center gap-4">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            MarQet
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] text-zinc-500 dark:text-white/50">
            <Link href="#" className="hover:underline">Conditions of Use & Sale</Link>
            <Link href="#" className="hover:underline">Privacy Notice</Link>
            <Link href="#" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-white/50">© 2026, MarQet, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}
