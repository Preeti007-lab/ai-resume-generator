import React from 'react';
import { FloatingPetals } from './FloatingPetals';

export const FloralBackdrop = () => {
  return (
    <div className="floral-backdrop-root no-print" aria-hidden="true">
      {/* Animated Falling & Drifting Flower Petals */}
      <FloatingPetals count={22} />

      {/* Top-Left Botanical Floral Blossom Cluster */}
      <div className="floral-corner-tl" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '360px',
        height: '360px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
        filter: 'drop-shadow(0 10px 25px rgba(236, 72, 153, 0.12))'
      }}>
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="roseGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="violetFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="60%" stopColor="#d8b4fe" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Gentle botanical stem / vine */}
          <path d="M-20 -20 Q120 80 180 200 Q210 260 250 320" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
          <path d="M40 30 Q140 160 220 180" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

          {/* Leaves */}
          <path d="M120 80 C150 70 170 95 160 120 C130 130 110 105 120 80 Z" fill="url(#leafGrad)" opacity="0.75" />
          <path d="M180 200 C215 190 235 220 220 245 C185 255 165 225 180 200 Z" fill="url(#leafGrad)" opacity="0.75" />
          <path d="M60 40 C90 20 110 45 95 70 C65 90 45 65 60 40 Z" fill="url(#leafGrad)" opacity="0.6" />

          {/* Large Peony Flower (Top Left) */}
          <g transform="translate(45, 45)">
            {/* Outer Petals */}
            <circle cx="0" cy="0" r="48" fill="url(#roseGrad1)" opacity="0.4" />
            <ellipse cx="-20" cy="-10" rx="35" ry="24" transform="rotate(-25)" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="20" cy="-10" rx="35" ry="24" transform="rotate(25)" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="-15" cy="20" rx="32" ry="22" transform="rotate(-60)" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="15" cy="20" rx="32" ry="22" transform="rotate(60)" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="0" cy="-25" rx="30" ry="22" fill="url(#roseGrad1)" opacity="0.9" />
            {/* Center Core */}
            <circle cx="0" cy="0" r="18" fill="#f43f5e" opacity="0.85" />
            <circle cx="0" cy="0" r="10" fill="#fef08a" opacity="0.95" />
          </g>

          {/* Medium Blossom (Top Right of stem) */}
          <g transform="translate(180, 110)">
            <ellipse cx="0" cy="-18" rx="18" ry="14" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="-18" cy="0" rx="18" ry="14" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="18" cy="0" rx="18" ry="14" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="-12" cy="14" rx="16" ry="12" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="12" cy="14" rx="16" ry="12" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <circle cx="0" cy="0" r="7" fill="#fde047" />
          </g>

          {/* Small Cherry Blossom */}
          <g transform="translate(240, 260)">
            <circle cx="0" cy="-12" r="10" fill="#fda4af" opacity="0.85" />
            <circle cx="-12" cy="0" r="10" fill="#fda4af" opacity="0.85" />
            <circle cx="12" cy="0" r="10" fill="#fda4af" opacity="0.85" />
            <circle cx="-8" cy="10" r="9" fill="#fda4af" opacity="0.85" />
            <circle cx="8" cy="10" r="9" fill="#fda4af" opacity="0.85" />
            <circle cx="0" cy="0" r="4.5" fill="#facc15" />
          </g>
        </svg>
      </div>

      {/* Top-Right Botanical Floral Cluster */}
      <div className="floral-corner-tr" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        height: '380px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.82,
        filter: 'drop-shadow(0 10px 25px rgba(168, 85, 247, 0.12))'
      }}>
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Vines */}
          <path d="M420 -20 Q280 80 220 190 Q180 260 140 330" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* Leaves */}
          <path d="M280 80 C250 70 230 95 240 120 C270 130 290 105 280 80 Z" fill="url(#leafGrad)" opacity="0.75" />
          <path d="M220 190 C185 180 165 210 180 235 C215 245 235 215 220 190 Z" fill="url(#leafGrad)" opacity="0.7" />

          {/* Radiant Peony / Blossom (Top Right) */}
          <g transform="translate(330, 60)">
            <ellipse cx="0" cy="-26" rx="32" ry="24" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="-26" cy="0" rx="32" ry="24" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="26" cy="0" rx="32" ry="24" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="-18" cy="22" rx="28" ry="20" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <ellipse cx="18" cy="22" rx="28" ry="20" fill="url(#violetFlowerGrad)" opacity="0.85" />
            <circle cx="0" cy="0" r="14" fill="#a855f7" opacity="0.9" />
            <circle cx="0" cy="0" r="8" fill="#fef08a" />
          </g>

          {/* Soft Rose Blossom */}
          <g transform="translate(210, 140)">
            <ellipse cx="0" cy="-16" rx="20" ry="15" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="-16" cy="0" rx="20" ry="15" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="16" cy="0" rx="20" ry="15" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="-12" cy="14" rx="18" ry="13" fill="url(#roseGrad1)" opacity="0.85" />
            <ellipse cx="12" cy="14" rx="18" ry="13" fill="url(#roseGrad1)" opacity="0.85" />
            <circle cx="0" cy="0" r="7" fill="#f43f5e" opacity="0.85" />
            <circle cx="0" cy="0" r="4" fill="#fef08a" />
          </g>

          {/* Cherry Blossom */}
          <g transform="translate(140, 270)">
            <circle cx="0" cy="-14" r="11" fill="#fbcfe8" opacity="0.9" />
            <circle cx="-14" cy="0" r="11" fill="#fbcfe8" opacity="0.9" />
            <circle cx="14" cy="0" r="11" fill="#fbcfe8" opacity="0.9" />
            <circle cx="-9" cy="11" r="10" fill="#fbcfe8" opacity="0.9" />
            <circle cx="9" cy="11" r="10" fill="#fbcfe8" opacity="0.9" />
            <circle cx="0" cy="0" r="5" fill="#facc15" />
          </g>
        </svg>
      </div>

      {/* Bottom Floating Soft Floral Accents */}
      <div className="floral-corner-br" style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '320px',
        height: '320px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
        filter: 'drop-shadow(0 -10px 20px rgba(244, 114, 182, 0.1))'
      }}>
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M420 420 Q280 320 200 220 Q160 160 120 80" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path d="M280 320 C250 330 230 305 240 280 C270 270 290 295 280 320 Z" fill="url(#leafGrad)" opacity="0.7" />

          {/* Blossom */}
          <g transform="translate(260, 260)">
            <ellipse cx="0" cy="-22" rx="26" ry="18" fill="url(#roseGrad1)" opacity="0.8" />
            <ellipse cx="-22" cy="0" rx="26" ry="18" fill="url(#roseGrad1)" opacity="0.8" />
            <ellipse cx="22" cy="0" rx="26" ry="18" fill="url(#roseGrad1)" opacity="0.8" />
            <ellipse cx="-15" cy="18" rx="22" ry="15" fill="url(#roseGrad1)" opacity="0.8" />
            <ellipse cx="15" cy="18" rx="22" ry="15" fill="url(#roseGrad1)" opacity="0.8" />
            <circle cx="0" cy="0" r="10" fill="#f43f5e" opacity="0.85" />
            <circle cx="0" cy="0" r="5" fill="#fef08a" />
          </g>
        </svg>
      </div>
    </div>
  );
};
