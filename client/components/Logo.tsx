import React from 'react';

export default function Logo({ className = "w-8 h-8", textClassName = "text-2xl" }: { className?: string, textClassName?: string }) {
  return (
    <div className="flex items-center gap-2.5 group">
      {/* The Icon */}
      <div className="relative flex items-center justify-center">
        <svg 
          className={`${className} transition-transform duration-500 group-hover:scale-110`} 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="marqetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" /> {/* Purple */}
              <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
            </linearGradient>
            <linearGradient id="marqetGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" /> 
              <stop offset="100%" stopColor="#2563EB" /> 
            </linearGradient>
          </defs>
          {/* Background rounded square */}
          <rect width="40" height="40" rx="12" fill="url(#marqetGrad)" fillOpacity="0.15" className="transition-opacity duration-300 group-hover:fill-opacity-100 group-hover:fill-[url(#marqetGradDark)]" />
          
          {/* Abstract 'M' and Map Pin representation */}
          <path 
            d="M12 26V16C12 14.8954 12.8954 14 14 14H15.5C16.3284 14 17 14.6716 17 15.5V21L20 23L23 21V15.5C23 14.6716 23.6716 14 24.5 14H26C27.1046 14 28 14.8954 28 16V26" 
            stroke="url(#marqetGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:stroke-white transition-colors duration-300"
          />
          <circle cx="20" cy="11" r="2.5" fill="url(#marqetGrad)" className="group-hover:fill-white transition-colors duration-300" />
        </svg>
      </div>

      {/* The Typography */}
      <span className={`${textClassName} font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:from-primary group-hover:to-blue-400 transition-all duration-300`}>
        MarQet
      </span>
    </div>
  );
}
