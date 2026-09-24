import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function TestimonialsSection() {
  const { testimonials } = portfolioContent;

  return (
    <section
      id="credentials"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-20">
          <ScrollReveal>
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none">
              Credentials &<br />
              Certifications
            </h2>
          </ScrollReveal>
        </div>

        {/* 4-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((cert, index) => (
            <ScrollReveal
              key={cert.author}
              delay={index * 100}
              className="h-full"
            >
              <div className="relative flex flex-col h-full min-h-[380px] p-8 rounded-[24px] bg-dark-surface text-dark-text border border-white/5 shadow-xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300">
                {/* Embedded Noise Overlay for dark tactile physical texture */}
                <div className="absolute inset-0 noise-overlay opacity-[0.05] mix-blend-overlay pointer-events-none" />

                {/* Issuer Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] text-dark-muted tracking-wider uppercase">
                    {cert.role}
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    {index % 2 === 0 ? (
                      <Award className="w-4 h-4 text-[#C5B358]" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-[#4BB543]" />
                    )}
                  </div>
                </div>

                {/* Certificate Name */}
                <h3 className="font-sans font-bold text-xl text-white tracking-tight leading-snug mb-3 group-hover:text-white/90 transition-colors">
                  {cert.author}
                </h3>

                {/* Skills/Details description */}
                <p className="font-sans text-sm text-dark-text/75 leading-relaxed mb-8">
                  {cert.quote}
                </p>

                {/* Bottom section */}
                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col space-y-4">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-dark-muted">CREDENTIAL ID</span>
                    <span className="text-dark-text font-medium">{cert.credentialId}</span>
                  </div>

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 font-sans font-bold text-xs text-white"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3 text-white/60 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
