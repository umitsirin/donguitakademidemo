import React, { useMemo } from 'react';

// Shared Falling Code Background Component
interface FallingCodeProps {
  count?: number;
  snippets?: string[];
  colorClass?: string;
  opacityRange?: [number, number];
}

export const FallingCodeBackground: React.FC<FallingCodeProps> = ({ 
  count = 25, 
  snippets = ["const tech = 'Döngü';", "function future() {", "return coding;"],
  colorClass = "text-brand-orange dark:text-white/40",
  opacityRange = [0.04, 0.1]
}) => {
  const codeLines = useMemo(() => {
    return [...Array(count)].map(() => ({
      text: snippets[Math.floor(Math.random() * snippets.length)],
      left: Math.random() * 100,
      delay: -(Math.random() * 20),
      duration: 12 + Math.random() * 12,
      opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0])
    }));
  }, [count, snippets, opacityRange]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {codeLines.map((code, i) => (
        <div 
          key={i} 
          className={`code-line animate-code-fall ${colorClass}`}
          style={{ 
            left: `${code.left}%`, 
            animationDelay: `${code.delay}s`,
            animationDuration: `${code.duration}s`,
            opacity: code.opacity
          }}
        >
          {code.text}
        </div>
      ))}
    </div>
  );
};

// GALAXY SPACE BACKGROUND - ENRICHED WITH MORE PLANETS & SHADOWED STARS
export const GalaxyBackground: React.FC = () => {
  // Increased star count to 150
  const stars = useMemo(() => [...Array(150)].map((_, i) => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    size: Math.random() * 2.5 + 1 + "px", // Slightly varied sizes
    delay: Math.random() * 5 + "s",
    duration: Math.random() * 3 + 2 + "s",
    opacity: Math.random() * 0.7 + 0.3,
    isOrange: Math.random() > 0.85 // 15% chance of being an orange star
  })), []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white dark:bg-brand-dark transition-colors duration-500">
       {/* Subtle Space Gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-orange-50/30 dark:from-[#0f0f11] dark:via-[#1a1a1c] dark:to-[#150a05] opacity-100"></div>
       
       {/* Twinkling Stars with Drop-Shadow (Glow) */}
       <div className="absolute inset-0 pointer-events-none">
          {stars.map((s, i) => (
             <div 
               key={i}
               className={`absolute rounded-full animate-pulse ${
                 s.isOrange 
                   ? 'bg-brand-orange shadow-[0_0_8px_rgba(241,153,28,0.8)]' 
                   : 'bg-slate-300 dark:bg-slate-400 shadow-[0_0_4px_rgba(255,255,255,0.6)] dark:shadow-[0_0_4px_rgba(255,255,255,0.3)]'
               }`}
               style={{
                 top: s.top,
                 left: s.left,
                 width: s.size,
                 height: s.size,
                 animationDelay: s.delay,
                 animationDuration: s.duration,
                 opacity: s.opacity
               }}
             />
          ))}
       </div>

       {/* --- PLANETS LAYER --- */}
       
       {/* 1. Large Saturn (Top Left) */}
       <div className="absolute top-10 -left-10 lg:left-[5%] opacity-20 dark:opacity-15 animate-float" style={{ animationDuration: '25s' }}>
          <PlanetSaturn size={180} className="text-orange-400 dark:text-orange-800/50 drop-shadow-xl" />
       </div>

       {/* 2. Cratered Blue/Grey Planet (Bottom Left) */}
       <div className="absolute bottom-20 left-[15%] opacity-15 dark:opacity-10 animate-float" style={{ animationDuration: '30s', animationDelay: '2s' }}>
          <PlanetCratered size={120} className="text-blue-400 dark:text-slate-600 drop-shadow-lg" />
       </div>

       {/* 3. Small Distant Red Planet (Top Right Center) */}
       <div className="absolute top-[15%] right-[40%] opacity-20 dark:opacity-10 animate-float" style={{ animationDuration: '40s', animationDelay: '1s' }}>
          <div className="w-10 h-10 rounded-full bg-red-300 dark:bg-red-900/60 shadow-[0_0_15px_rgba(252,165,165,0.4)]"></div>
       </div>

       {/* 4. Tiny Cyan Moon (Near Rocket path) */}
       <div className="absolute top-[40%] right-[15%] opacity-30 dark:opacity-20 animate-float" style={{ animationDuration: '18s', animationDelay: '4s' }}>
          <div className="w-6 h-6 rounded-full bg-cyan-200 dark:bg-cyan-800 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
       </div>

       {/* 5. Large Blur Nebula Orb (Center Background) */}
       <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-5 animate-pulse" style={{ animationDuration: '8s' }}>
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-purple-300 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 blur-3xl"></div>
       </div>

       {/* 6. Ringed Planet (Bottom Right) */}
        <div className="absolute -bottom-10 right-[25%] opacity-10 dark:opacity-5 animate-float" style={{ animationDuration: '35s', animationDelay: '3s' }}>
          <svg width="140" height="140" viewBox="0 0 100 100" className="text-green-300 dark:text-emerald-800">
             <circle cx="50" cy="50" r="30" fill="currentColor" />
             <path d="M10 50 Q 50 80 90 50" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
             <path d="M10 50 Q 50 20 90 50" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.3" />
          </svg>
       </div>


       {/* Rocket Container - Positioned Right with Lower Opacity & Shadow */}
       <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-end pr-[2%] lg:pr-[8%]">
          <svg 
            width="350" 
            height="550" 
            viewBox="0 0 350 550" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transform scale-[0.6] lg:scale-[0.8] opacity-50 dark:opacity-30 drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="rocketFireGrad" x1="175" y1="420" x2="175" y2="550" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24" /> {/* Amber */}
                <stop offset="40%" stopColor="#ea5438" /> {/* Red/Orange */}
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="bodyShadow" x="-20%" y="-20%" width="140%" height="140%">
                 <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* Rocket Group - Floating Animation */}
            <g className="animate-float" style={{ animationDuration: '6s' }}>
              
              {/* Fire Stream - Dynamic Flicker Animation */}
              <path 
                d="M150 430 Q175 440 200 430 Q220 490 175 550 Q130 490 150 430" 
                fill="url(#rocketFireGrad)" 
                className="origin-top"
                opacity="0.8"
              >
                <animateTransform 
                  attributeName="transform" 
                  type="scale" 
                  values="1 1; 0.9 0.95; 1.1 1.05; 1 1" 
                  dur="0.3s" 
                  repeatCount="indefinite" 
                  additive="sum" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </path>
              
              {/* Rocket Fins */}
              <path d="M100 360 L60 440 L110 420 Q105 390 100 360" fill="#ea5438" stroke="#c2412d" strokeWidth="2" />
              <path d="M250 360 L290 440 L240 420 Q245 390 250 360" fill="#ea5438" stroke="#c2412d" strokeWidth="2" />
              <path d="M175 390 L175 440" stroke="#ea5438" strokeWidth="12" strokeLinecap="round" />

              {/* Main Body */}
              <path 
                d="M175 60 Q250 160 250 360 Q250 430 175 430 Q100 430 100 360 Q100 160 175 60" 
                fill="#f8fafc" 
                stroke="#cbd5e1" 
                strokeWidth="2"
                filter="url(#bodyShadow)"
                className="dark:fill-slate-200"
              />

              {/* Red Nose Cone */}
              <path d="M175 60 Q225 130 238 190 L112 190 Q125 130 175 60" fill="#ea5438" />
              <path d="M112 190 L238 190" stroke="#c2412d" strokeWidth="2" />

              {/* Window */}
              <circle cx="175" cy="260" r="35" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="6" />
              <path d="M160 245 Q170 240 180 245" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              
              {/* Rivets */}
              <circle cx="175" cy="330" r="4" fill="#cbd5e1" />
              <circle cx="175" cy="360" r="4" fill="#cbd5e1" />
              <circle cx="175" cy="390" r="4" fill="#cbd5e1" />

            </g>
          </svg>
       </div>
    </div>
  );
};

// SPACE ELEMENTS: PLANETS
export const PlanetSaturn: React.FC<{ size?: number; className?: string }> = ({ size = 200, className = "" }) => (
  <svg width={size} height={size / 1.5} viewBox="0 0 300 200" fill="none" className={className}>
    <ellipse cx="150" cy="100" rx="140" ry="30" stroke="currentColor" strokeWidth="4" opacity="0.3" transform="rotate(-15 150 100)" />
    <circle cx="150" cy="100" r="60" fill="currentColor" opacity="0.2" />
    <path d="M20 115 C 20 115, 50 145, 150 145 C 250 145, 280 115, 280 115" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.4" transform="rotate(-15 150 100)" />
  </svg>
);

export const PlanetCratered: React.FC<{ size?: number; className?: string }> = ({ size = 150, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
    <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2" />
    <circle cx="30" cy="30" r="8" fill="currentColor" opacity="0.3" />
    <circle cx="70" cy="45" r="12" fill="currentColor" opacity="0.3" />
    <circle cx="45" cy="75" r="6" fill="currentColor" opacity="0.3" />
  </svg>
);