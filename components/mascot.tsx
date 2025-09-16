"use client"

import React from "react"

export default function Mascot({ className = "h-40 w-40" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8ee07b" />
            <stop offset="1" stopColor="#3ecf6b" />
          </linearGradient>
        </defs>

        {/* body blob */}
        <g>
          <ellipse cx="60" cy="66" rx="48" ry="38" fill="url(#g1)" opacity="0.95" />
          {/* face */}
          <circle cx="60" cy="42" r="26" fill="#fff" />
          <circle cx="48" cy="38" r="3" fill="#222" />
          <circle cx="72" cy="38" r="3" fill="#222" />
          <path d="M48 48 q12 12 24 0" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* sprout */}
          <path d="M60 16 c0 6 10 6 14 0" stroke="#2a9d3b" strokeWidth="3" fill="none" strokeLinecap="round" transform="rotate(-10 67 19)" />
          <path d="M60 16 c0 6 -10 6 -14 0" stroke="#2a9d3b" strokeWidth="3" fill="none" strokeLinecap="round" transform="rotate(10 53 19)" />
        </g>
      </svg>
    </div>
  )
}
