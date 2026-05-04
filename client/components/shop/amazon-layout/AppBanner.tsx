"use client";

export default function AppBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 dark:from-zinc-950 via-white dark:via-zinc-900 to-gray-50 dark:to-zinc-950 py-12 border-t border-zinc-200 dark:border-white/10 mt-8">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            📱 Get the MarQet App
          </h2>
          <p className="text-zinc-600 dark:text-white/60 text-lg max-w-xl">
            Experience the fastest hyperlocal delivery. Exclusive app-only discounts and real-time tracking.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg flex items-center justify-center gap-2">
            Download for iOS
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-zinc-900 dark:text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-teal-400/20 flex items-center justify-center gap-2">
            Get on Android
          </button>
        </div>
      </div>
    </div>
  );
}
