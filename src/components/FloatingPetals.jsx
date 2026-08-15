import React, { useMemo } from 'react';

export const FloatingPetals = ({ count = 18 }) => {
  // Generate random petals with varying sizes, positions, rotation and animation delays
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const left = Math.random() * 100; // 0% to 100%
      const duration = 9 + Math.random() * 12; // 9s to 21s
      const delay = Math.random() * 10; // 0s to 10s
      const size = 16 + Math.random() * 18; // 16px to 34px
      const opacity = 0.35 + Math.random() * 0.45; // 0.35 to 0.8
      const spinSpeed = 4 + Math.random() * 8; // rotation speed

      return {
        id: index,
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: `${size * 1.3}px`,
        opacity,
        spinDuration: `${spinSpeed}s`
      };
    });
  }, [count]);

  return (
    <div
      className="floating-petals-container no-print"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="floral-petal"
          style={{
            position: 'absolute',
            top: '-50px',
            left: petal.left,
            width: petal.width,
            height: petal.height,
            opacity: petal.opacity,
            animation: `petalFall ${petal.animationDuration} linear infinite`,
            animationDelay: petal.animationDelay
          }}
        >
          <svg
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%',
              height: '100%',
              animation: `petalSway ${petal.spinDuration} ease-in-out infinite alternate`,
              filter: 'drop-shadow(0 2px 4px rgba(236, 72, 153, 0.15))'
            }}
          >
            {/* Elegant petal gradient */}
            <defs>
              <linearGradient id={`petalGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f472b6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
              </linearGradient>
            </defs>
            <path
              d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
              fill={`url(#petalGrad-${petal.id})`}
            />
            {/* Subtle center petal vein line */}
            <path
              d="M15 6 Q16 20 15 34"
              stroke="#fce7f3"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
