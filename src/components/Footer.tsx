import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";
import { scrollToElement } from "../utils/scroll";

interface FooterProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

export default function Footer({ currentPath, onNavigate }: FooterProps) {
  const { identity } = portfolioContent;

  const quickLinks = [
    { label: "Home", target: "#home" },
    { label: "About Me", target: "#about" },
    { label: "Services", target: "#services" },
    { label: "Works", target: "#projects" },
    { label: "Contact", target: "#contact" },
  ];

  const handleLinkClick = (target: string) => {
    if (currentPath === "/") {
      scrollToElement(target);
    } else {
      onNavigate("/", target);
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full pt-20 pb-16 px-6 md:px-16 bg-dark-surface text-dark-text border-t border-white/5 overflow-hidden"
    >
      {/* Procedural fine SVG noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start pb-20">
        {/* Left Column: Big Bold Statement */}
        <div className="md:col-span-5">
          <ScrollReveal>
            <p className="font-sans font-extrabold text-4xl md:text-[54px] text-white leading-[0.95] tracking-tighter">
              Engineering <br />
              Autonomous <br />
              Workflows.
            </p>
          </ScrollReveal>
        </div>

        {/* Center Column: Quick Links */}
        <div className="md:col-span-4 flex flex-col space-y-4">
          <ScrollReveal delay={100}>
            <span className="font-mono text-xs tracking-widest text-dark-muted uppercase">
              /Quick Links
            </span>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2.5">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.target)}
                  className="px-4 py-2 text-xs font-sans font-semibold rounded-full bg-white/5 hover:bg-white text-dark-text hover:text-ink border border-white/10 transition-all duration-300 focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Direct Contact */}
        <div className="md:col-span-3 flex flex-col space-y-4">
          <ScrollReveal delay={200}>
            <span className="font-mono text-xs tracking-widest text-dark-muted uppercase">
              /Contact
            </span>
          </ScrollReveal>
          <ScrollReveal delay={250}>
            <a
              href={`mailto:${identity.email}`}
              className="font-sans font-semibold text-lg md:text-xl text-white hover:text-muted-light underline underline-offset-4 transition-colors break-all"
            >
              {identity.email}
            </a>
          </ScrollReveal>
        </div>
      </div>

      {/* Giant cropped background name wordmark */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none mt-8 h-20 md:h-32">
        <div className="absolute bottom-0 left-0 text-white/[0.02] font-black tracking-tighter text-[15vw] md:text-[18vw] leading-none translate-y-[22%] w-full whitespace-nowrap font-sans">
          YASH
        </div>
      </div>
    </footer>
  );
}
