import { useEffect, useState, FormEvent } from "react";
import { Thought } from "../types";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import { useScrollTracker } from "../hooks/useScrollTracker";

interface ThoughtDetailPageProps {
  thought: Thought;
  onNavigate: (path: string, hash?: string) => void;
}

export default function ThoughtDetailPage({ thought, onNavigate }: ThoughtDetailPageProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Premium Reading Progress Bar states
  const [scrollPercent, setScrollPercent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pagesRemaining, setPagesRemaining] = useState(0);
  const [showProgressHeader, setShowProgressHeader] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // 1. Accessibility: Detect OS reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Calculate total word count of article content for high-fidelity reading analysis
  const totalWords = thought.content.reduce((acc, block) => {
    if (typeof block.text === "string") {
      return acc + block.text.split(/\s+/).length;
    } else if (Array.isArray(block.text)) {
      return acc + block.text.reduce((sum, item) => sum + item.split(/\s+/).length, 0);
    }
    return acc;
  }, 0);

  // Average reading speed (~200 words per minute)
  const totalReadTimeMin = Math.max(1, Math.ceil(totalWords / 200));

  // Handle dynamic scroll depth and remaining pages
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollable = scrollHeight - clientHeight;

      // Only display the premium reading header when scrolled past a small threshold
      setShowProgressHeader(scrollTop > 120);

      if (totalScrollable <= 0) {
        setScrollPercent(100);
        setTimeLeft(0);
        setPagesRemaining(0);
        return;
      }

      const percentage = Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100));
      setScrollPercent(percentage);

      // Remaining time estimation
      const timeRemaining = Math.max(0, Math.ceil(totalReadTimeMin * (1 - percentage / 100)));
      setTimeLeft(timeRemaining);

      // Pages left estimation
      const totalPages = Math.ceil(scrollHeight / clientHeight);
      const currentPage = Math.min(totalPages, Math.max(1, Math.round(scrollTop / clientHeight) + 1));
      const rem = Math.max(0, totalPages - currentPage);
      setPagesRemaining(rem);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [thought.slug, totalReadTimeMin]);

  // Use scroll progress tracking hook for the article page
  useScrollTracker(`thought-${thought.slug}`);

  // Always scroll to top when mounting a detail page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [thought.slug]);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-paper w-full pt-32 overflow-hidden flex flex-col justify-between">
      {/* Subtle Reading Progress Header */}
      <div
        className={`fixed top-0 left-0 w-full h-[52px] bg-paper/90 backdrop-blur-md border-b border-ink/5 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ease-out ${
          showProgressHeader
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={reducedMotion ? { transition: "opacity 0.2s ease" } : undefined}
      >
        {/* Left column: Title and identifier */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="font-mono text-[10px] tracking-widest text-muted-main uppercase font-bold shrink-0">
            Reading
          </span>
          <span className="text-muted-light shrink-0">•</span>
          <span className="font-sans text-xs font-bold text-ink truncate max-w-[140px] sm:max-w-xs md:max-w-md lg:max-w-xl">
            {thought.title}
          </span>
        </div>

        {/* Right column: Progress statistics */}
        <div className="flex items-center space-x-3 md:space-x-4 shrink-0 font-mono text-[10px] tracking-wider uppercase">
          <span className="text-ink font-bold">
            {Math.round(scrollPercent)}% read
          </span>
          <span className="text-muted-light">•</span>
          <span className="text-muted-main whitespace-nowrap">
            {timeLeft > 0 ? `~${timeLeft} min left` : "Finished"}
          </span>
          <span className="text-muted-light hidden sm:inline">•</span>
          <span className="text-muted-main hidden sm:inline">
            {pagesRemaining > 0 ? `${pagesRemaining} page${pagesRemaining > 1 ? "s" : ""} left` : "Last page"}
          </span>
        </div>

        {/* Dynamic Micro Progress line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-ink/5">
          <div
            className="h-full bg-ink transition-all duration-100 ease-out"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      {/* Background grain noise layer */}
      <div className="fixed inset-0 noise-overlay opacity-[0.045] mix-blend-multiply pointer-events-none z-40" />

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1200px] mx-auto px-6 md:px-16 w-full mb-24">
        {/* Back navigation button */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate("/")}
            className="inline-flex items-center space-x-2 font-sans font-bold text-sm text-ink hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ink/20"
          >
            <svg
              className="w-4 h-4 transform hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Heading Header Column */}
        <div className="max-w-[800px] mb-12">
          <ScrollReveal className="flex items-center space-x-3 mb-4">
            <span className="font-mono text-[11px] tracking-wider text-muted-main uppercase">
              {thought.date}
            </span>
            <span className="text-muted-light">•</span>
            <span className="font-mono text-[11px] tracking-wider text-ink uppercase font-semibold">
              {thought.category}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              {thought.title}
            </h1>
          </ScrollReveal>
        </div>

        {/* Large wide banner image */}
        <ScrollReveal delay={150} className="mb-16">
          <div className="relative overflow-hidden aspect-[16/9] w-full rounded-[24px] bg-paper-deep border border-ink/5 shadow-md">
            <img
              src={thought.image}
              alt={thought.title}
              className="w-full h-full object-cover grayscale brightness-95"
              referrerPolicy="no-referrer"
            />
          </div>
        </ScrollReveal>

        {/* Editorial Content Grid: 8 columns article, 4 columns newsletter sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Article Contents */}
          <article className="lg:col-span-8 flex flex-col space-y-8 font-sans text-lg text-ink-soft leading-relaxed tracking-tight">
            {thought.content.map((block, idx) => {
              if (block.type === "heading") {
                return (
                  <ScrollReveal key={idx} className="pt-4">
                    <h2 className="font-sans font-bold text-2xl md:text-3xl text-ink tracking-tight leading-snug">
                      {block.text as string}
                    </h2>
                  </ScrollReveal>
                );
              }

              if (block.type === "list") {
                const listItems = block.text as string[];
                return (
                  <ScrollReveal key={idx}>
                    <ul className="list-disc pl-6 space-y-3 font-sans text-base md:text-lg text-ink-soft">
                      {listItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                );
              }

              return (
                <ScrollReveal key={idx}>
                  <p className="font-sans text-base md:text-lg text-ink-soft">
                    {block.text as string}
                  </p>
                </ScrollReveal>
              );
            })}
          </article>

          {/* Sidebar Area: Join the Newsletter Card */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <ScrollReveal delay={200}>
              <div className="relative p-8 rounded-3xl bg-dark-surface text-dark-text border border-white/5 shadow-xl overflow-hidden">
                {/* fine grain noise texture */}
                <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay pointer-events-none" />

                <div className="relative z-10 flex flex-col space-y-4">
                  <h3 className="font-serif italic text-2xl text-white leading-tight">
                    Join the newsletter
                  </h3>
                  <p className="font-sans text-sm text-dark-muted leading-relaxed">
                    Get monthly design strategies, curated software patterns, and modern framework insights delivered directly to your inbox.
                  </p>

                  {subscribed ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-emerald-400 space-y-2 animate-fade-in">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <span className="font-sans font-bold text-sm">Successfully Subscribed!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-3 pt-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 border border-white/10 rounded-2xl bg-white/[0.02] text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all duration-200"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-white hover:bg-[#eae6e1] active:scale-[0.99] text-ink font-sans font-bold text-sm rounded-2xl transition-all duration-200 shadow-md focus:outline-none"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <Footer currentPath={thought.slug} onNavigate={onNavigate} />
    </div>
  );
}
