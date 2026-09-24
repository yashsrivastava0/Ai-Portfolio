import { useState, useEffect, useRef } from "react";
import { portfolioContent } from "../data";
import { scrollToElement } from "../utils/scroll";

interface FixedNavProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
  visible?: boolean;
}

export default function FixedNav({ currentPath, onNavigate, visible = true }: FixedNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "About Me", target: "#about" },
    { label: "Services", target: "#services" },
    { label: "Projects", target: "#projects" },
    { label: "Contact", target: "#contact" },
  ];

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = (target: string) => {
    setIsOpen(false);
    if (currentPath === "/") {
      scrollToElement(target);
    } else {
      // Go to home and pass target as hash
      onNavigate("/", target);
    }
  };

  return (
    <div
      ref={menuRef}
      id="fixed-navigation"
      className="fixed top-6 left-1/2 z-50 w-[320px] bg-dark-surface text-dark-text border border-white/10 shadow-2xl transition-all duration-[1400ms] cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden will-change-[transform,height,opacity]"
      style={{
        borderRadius: "24px",
        height: isOpen ? "310px" : "64px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, -30px)",
        pointerEvents: visible ? "all" : "none",
      }}
    >
      {/* Closed State Header / Expand Control */}
      <div className="flex items-center justify-between h-[64px] px-6">
        <button
          onClick={() => onNavigate("/")}
          className="font-sans font-extrabold tracking-tight text-white hover:opacity-80 transition-opacity text-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg px-2 py-1"
        >
          {portfolioContent.identity.name.split(" ")[0].toUpperCase()}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          aria-controls="navigation-menu-links"
          className="flex items-center justify-center w-11 h-11 bg-[#f4f0eb] hover:bg-white text-ink rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          {isOpen ? (
            <svg
              className="w-5 h-5 transition-transform duration-300 rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="flex space-x-1">
              <span className="w-1.5 h-1.5 bg-ink rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-ink rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-ink rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Expanded Links */}
      <div
        id="navigation-menu-links"
        className="flex flex-col space-y-4 px-6 pb-6 pt-2 transition-all duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        <div className="w-full h-px bg-white/10 my-1" />
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => handleLinkClick(item.target)}
            className="font-sans font-medium text-left text-lg text-dark-muted hover:text-white transition-colors duration-200 focus:outline-none focus:text-white py-1"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
