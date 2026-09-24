import { useState, FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";
import { analytics } from "../utils/analytics";

export default function ContactSection() {
  const { identity } = portfolioContent;
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) {
      alert("Please fill in all fields.");
      return;
    }
    setStatus("submitting");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.project);

      const response = await fetch("https://forminit.com/f/anlnjlea", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", project: "" });
        analytics?.trackContactClick();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Forminit submission error:", err);
      setStatus("error");
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: identity.links.github || "https://github.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: identity.links.linkedin || "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: identity.links.twitter || "https://x.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Let's talk & Social links */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <ScrollReveal>
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none">
              Let's talk.
            </h2>
          </ScrollReveal>
          <p className="font-sans text-lg text-ink-soft leading-relaxed max-w-sm">
            Have a project or need help? Fill out the form, and we'll get back to you soon.
          </p>

          {/* Social media grid buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${identity.name} on ${social.name}`}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-paper-deep border border-ink/10 text-ink hover:bg-ink hover:text-paper hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ink/20"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Form Panel */}
        <div className="lg:col-span-7 w-full">
          <ScrollReveal delay={150}>
            <div className="relative p-8 md:p-10 rounded-3xl bg-dark-surface text-dark-text border border-white/5 shadow-2xl overflow-hidden">
              {/* Tactical noise overlay */}
              <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay pointer-events-none" />

              {status === "success" ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-white">Message Sent!</h3>
                  <p className="font-sans text-sm text-dark-muted max-w-xs">
                    Thank you for reaching out, {identity.name} will respond to your email at your convenience.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold rounded-xl text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  action="https://forminit.com/f/anlnjlea"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="relative z-10 flex flex-col space-y-6"
                >
                  {/* Name field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name-input" className="font-mono text-xs tracking-wider text-dark-muted uppercase">
                      Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-5 py-4 border border-white/10 rounded-2xl bg-white/[0.02] text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all duration-200"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email-input" className="font-mono text-xs tracking-wider text-dark-muted uppercase">
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 border border-white/10 rounded-2xl bg-white/[0.02] text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all duration-200"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="project-input" className="font-mono text-xs tracking-wider text-dark-muted uppercase">
                      Your Project
                    </label>
                    <textarea
                      id="project-input"
                      name="message"
                      required
                      rows={4}
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                      placeholder="Tell me about what you are building..."
                      className="w-full px-5 py-4 border border-white/10 rounded-2xl bg-white/[0.02] text-white placeholder-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all duration-200 resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="text-red-400 font-sans text-xs bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl animate-fade-in">
                      Oops! Something went wrong while submitting. Please check your network and try again.
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-white hover:bg-[#eae6e1] active:scale-[0.99] disabled:bg-white/25 disabled:cursor-not-allowed text-ink font-sans font-bold rounded-2xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
