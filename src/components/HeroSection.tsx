import React, { useState, useEffect, useRef } from "react";
import { PORTRAIT_DARK_URL, PORTRAIT_RED_URL, portfolioContent } from "../data";

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  stage: number;
}

export default function HeroSection({ onNavigate, stage }: HeroSectionProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isDarkLoaded, setIsDarkLoaded] = useState(false);
  const [isRedLoaded, setIsRedLoaded] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const { identity } = portfolioContent;
  const [rolePart1, rolePart2] = identity.role.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    // Max tilt is 8 degrees for a premium subtle and high-end reaction
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setTilt({ x: 0, y: 0 });
  };

  const scrollParallax = scrollY * 0.35;
  const scrollTiltX = Math.min(12, scrollY * 0.04);
  const scrollTiltZ = Math.min(3, scrollY * 0.01);

  return (
    <section
      id="home"
      className="relative flex flex-col justify-between w-full min-h-[100svh] px-6 md:px-16 pt-32 pb-12 overflow-hidden bg-paper"
    >
      {/* Decorative SVG: Glossy Star (Top-Left Offset) */}
      <div
        className="absolute top-28 left-6 md:left-24 w-12 h-12 md:w-16 md:h-16 z-10 will-change-[transform,opacity]"
        style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0) rotate(12deg)" : "translateY(30px) rotate(0deg)",
          transition: stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="70%" stopColor="#252525" />
              <stop offset="100%" stopColor="#111111" />
            </radialGradient>
            <linearGradient id="starEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <path
            d="M50 0L59 36L95 27L68 53L85 85L50 67L15 85L32 53L5 27L41 36L50 0Z"
            fill="url(#starGlow)"
            stroke="url(#starEdge)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Decorative SVG: Glossy Bolt (Right Offset) */}
      <div
        className="absolute top-44 right-6 md:right-28 w-10 h-10 md:w-14 md:h-14 z-10 will-change-[transform,opacity]"
        style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0) rotate(-8deg)" : "translateY(30px) rotate(0deg)",
          transition: stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="boltEdge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M60 0L15 55H45L30 100L85 40H50L60 0Z"
            fill="#111111"
            stroke="url(#boltEdge)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Main Large Typography Stage */}
      <div className="flex-1 flex flex-col justify-center items-center relative w-full select-none">
        <h1
          className="hero-title text-center text-[#111111] font-black tracking-tighter leading-[0.85] flex flex-col items-center will-change-transform"
          style={{
            transform: stage >= 2 ? "translateY(-120px) scale(0.95)" : "translateY(0) scale(1)",
            transition: stage >= 2 ? "transform 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* First Line */}
          <span
            className="will-change-[transform,filter,opacity,color]"
            style={{
              opacity: stage >= 1 ? 1 : 0.35,
              filter: stage >= 1 ? "blur(0px)" : "blur(20px)",
              color: stage >= 1 ? "#111111" : "#a19e9b",
              transition: stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {rolePart1}
          </span>

          {/* Second Line */}
          <span
            className="mt-1 md:mt-2 will-change-[transform,filter,opacity,color]"
            style={{
              opacity: stage >= 1 ? 1 : 0.35,
              filter: stage >= 1 ? "blur(0px)" : "blur(20px)",
              color: stage >= 1 ? "#111111" : "#a19e9b",
              transition: stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {rolePart2 || ""}
          </span>
        </h1>

        {/* 3D Perspective Portrait Card */}
        <div
          className="absolute mt-12 md:mt-20 w-[180px] h-[240px] md:w-[240px] md:h-[320px] z-20 cursor-pointer will-change-[transform,filter,opacity]"
          style={{
            opacity: stage >= 2 ? Math.max(0, 1 - scrollY / 500) : (stage === 1 ? 0.5 : 0),
            transform: `translateY(${stage >= 2 ? (110 + scrollParallax) : (stage === 1 ? 280 : 420)}px) scale(${stage >= 2 ? (1 - Math.min(0.15, scrollY / 1000)) : 0.9}) rotateX(${stage >= 2 ? scrollTiltX : 0}deg) rotateZ(${stage >= 2 ? scrollTiltZ : 0}deg)`,
            filter: stage >= 2 ? "blur(0px)" : (stage === 1 ? "blur(12px)" : "blur(32px)"),
            perspective: "1000px",
            // Remove transitions entirely on active scroll to eliminate lag, keep them smooth on load stage changes
            transition: scrollY > 0 ? "none" : (stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "all 900ms cubic-bezier(0.16, 1, 0.3, 1)"),
          }}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            ref={cardRef}
            className="relative w-full h-full preserve-3d shadow-xl"
            style={{
              transform: `rotateX(${tilt.y}deg) rotateY(${isFlipped ? 180 + tilt.x : tilt.x}deg)`,
              borderRadius: "24px",
              // Elegant fluid animation on active cursor tilt and flipping (1000ms for heavy luxury feeling)
              transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseMove={handleMouseMove}
          >
            {/* Front Face: Dark Portrait */}
            <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-white/10 bg-neutral-900">
              <img
                src={PORTRAIT_DARK_URL}
                alt="Portrait Dark"
                className={`w-full h-full object-cover filter grayscale brightness-[0.8] contrast-[1.15] transition-all duration-700 ease-out ${
                  isDarkLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
                }`}
                onLoad={() => setIsDarkLoaded(true)}
                referrerPolicy="no-referrer"
              />
              {/* Premium Shimmer skeleton loader */}
              {!isDarkLoaded && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white/40 animate-spin" />
                </div>
              )}
              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Back Face: Crimson Portrait */}
            <div
              className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-red-500/20 bg-neutral-950"
              style={{ transform: "rotateY(180deg)" }}
            >
              <img
                src={PORTRAIT_RED_URL}
                alt="Portrait Crimson"
                className={`w-full h-full object-cover filter grayscale brightness-[0.9] contrast-[1.15] transition-all duration-700 ease-out ${
                  isRedLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
                }`}
                onLoad={() => setIsRedLoaded(true)}
                referrerPolicy="no-referrer"
              />
              {/* Premium Shimmer skeleton loader */}
              {!isRedLoaded && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-red-500/40 animate-spin" />
                </div>
              )}
              {/* Saturated Crimson Multiply Layer */}
              <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata row */}
      <div
        className="flex flex-col sm:flex-row justify-between items-center w-full mt-16 pt-6 border-t border-ink/10 z-10 will-change-[transform,opacity]"
        style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? "translateY(0)" : "translateY(30px)",
          pointerEvents: stage >= 2 ? "all" : "none",
          transition: stage >= 2 ? "all 1600ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
      >
        <span className="font-sans font-medium text-ink hover:opacity-80 transition-opacity mb-2 sm:mb-0">
          © {identity.copyright}
        </span>
        <span className="font-mono text-xs tracking-widest text-[#111111] uppercase">
          /{identity.since}
        </span>
      </div>
    </section>
  );
}
