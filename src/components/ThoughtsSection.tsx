import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";

interface ThoughtsSectionProps {
  onNavigate: (path: string) => void;
}

export default function ThoughtsSection({ onNavigate }: ThoughtsSectionProps) {
  const { thoughts } = portfolioContent;

  return (
    <section
      id="thoughts"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none">
              Thoughts
            </h2>
          </ScrollReveal>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 & 2: Dynamic Thought Articles */}
          {thoughts.map((thought, index) => (
            <ScrollReveal
              key={thought.slug}
              delay={index * 120}
              className="h-full"
            >
              <div
                onClick={() => onNavigate(`/thoughts/${thought.slug}`)}
                className="group relative flex flex-col justify-end h-[500px] p-8 rounded-3xl bg-paper-deep border border-ink/5 overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                {/* Background Image: Grayscale & Motion Blur styled */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={thought.image}
                    alt={thought.title}
                    className="w-full h-full object-cover grayscale blur-[2px] scale-105 group-hover:scale-100 group-hover:blur-[1px] transition-all duration-700 ease-out will-change-[transform,filter]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Heavy dark vignette to read white text clearly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 mix-blend-multiply opacity-90" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col space-y-3 text-white">
                  <span className="font-mono text-[11px] tracking-wider text-muted-light uppercase">
                    {thought.date}
                  </span>
                  <h3 className="font-sans font-bold text-2xl tracking-tight leading-snug">
                    {thought.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-light/90 leading-relaxed line-clamp-2">
                    {thought.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Card 3: Black Editorial Promo Card */}
          <ScrollReveal delay={240} className="h-full">
            <div
              onClick={() => {
                const thoughtsGrid = document.querySelector("#thoughts");
                if (thoughtsGrid) {
                  thoughtsGrid.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group relative flex flex-col justify-between h-[500px] p-8 rounded-3xl bg-dark-surface text-dark-text border border-white/5 overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              {/* Procedural fine SVG noise overlay */}
              <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay pointer-events-none" />

              {/* Promo Text */}
              <div className="mt-8">
                <p className="font-serif italic text-3xl md:text-4xl text-white/95 leading-tight tracking-tight">
                  See how we shape brands with clarity and craft - explore our thoughts.
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="flex items-center justify-between w-full pt-4 border-t border-white/10 mt-auto">
                <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-muted-light transition-colors">
                  View All Articles
                </span>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-ink group-hover:bg-muted-light transition-all duration-300">
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
