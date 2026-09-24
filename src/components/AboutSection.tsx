import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { portfolioContent, PORTRAIT_RED_URL } from "../data";
import { scrollToElement } from "../utils/scroll";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const { about } = portfolioContent;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Greeting & Intro */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="flex flex-col space-y-4">
            <ScrollReveal>
              <h2 className="font-serif italic text-6xl md:text-7xl text-ink font-light leading-none mb-2">
                {about.greeting}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-sans font-bold text-2xl md:text-3xl text-ink leading-tight tracking-tight">
                {about.shortBio}
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180}>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 pt-4 w-full lg:max-w-xs">
              <a
                href={portfolioContent.identity.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-4 py-3.5 bg-paper-deep/40 hover:bg-paper-deep border border-ink/10 hover:border-ink/20 rounded-2xl transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-ink/5 group-hover:bg-ink group-hover:text-paper transition-all duration-300">
                    <Github className="w-4 h-4 text-ink group-hover:text-paper transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[13px] text-ink leading-none">See my work</span>
                    <span className="font-mono text-[10px] text-ink-soft/70 leading-none mt-1">See my repos</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-soft/40 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              <a
                href={portfolioContent.identity.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-4 py-3.5 bg-paper-deep/40 hover:bg-paper-deep border border-ink/10 hover:border-ink/20 rounded-2xl transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-ink/5 group-hover:bg-ink group-hover:text-paper transition-all duration-300">
                    <Linkedin className="w-4 h-4 text-ink group-hover:text-paper transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[13px] text-ink leading-none">Here is my LinkedIn</span>
                    <span className="font-mono text-[10px] text-ink-soft/70 leading-none mt-1">Connect on LinkedIn</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-soft/40 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              <a
                href={portfolioContent.identity.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between w-full px-4 py-3.5 bg-paper-deep/40 hover:bg-paper-deep border border-ink/10 hover:border-ink/20 rounded-2xl transition-all duration-300 shadow-sm sm:col-span-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-ink/5 group-hover:bg-ink group-hover:text-paper transition-all duration-300 shrink-0">
                    <svg
                      className="w-4 h-4 text-ink group-hover:text-paper fill-current transition-colors"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[13px] text-ink leading-none">Let's connect on X</span>
                    <span className="font-mono text-[10px] text-ink-soft/70 leading-none mt-1">See my updates</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ink-soft/40 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Center Column: Red Portrait Card */}
        <div className="lg:col-span-4 flex justify-center">
          <ScrollReveal delay={200} className="w-full max-w-[280px]">
            <div
              className="relative aspect-[3/4] w-full bg-red-950 rounded-2xl overflow-hidden border border-red-500/10 shadow-xl transition-all duration-700 ease-out cursor-pointer"
              style={{
                transform: isHovered ? "rotate(0deg) scale(1.04)" : "rotate(-4deg) scale(1)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={PORTRAIT_RED_URL}
                alt="Portrait Red Accent"
                className="w-full h-full object-cover filter grayscale brightness-[0.9] contrast-[1.15]"
                referrerPolicy="no-referrer"
              />
              {/* Crimson color overlay */}
              <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/50 via-transparent to-transparent" />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Bio details & CTA */}
        <div className="lg:col-span-4 flex flex-col space-y-6 text-ink-soft">
          <ScrollReveal delay={300}>
            <div className="space-y-4 text-lg font-sans leading-relaxed tracking-tight">
              {about.longBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement("#contact");
              }}
              className="inline-flex items-center space-x-3 font-sans font-semibold text-ink group focus:outline-none"
            >
              <span>{about.cta}</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-ink/20 group-hover:bg-ink group-hover:text-paper transition-all duration-300">
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
