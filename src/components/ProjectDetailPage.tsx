import { useEffect } from "react";
import { Project } from "../types";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import { useScrollTracker } from "../hooks/useScrollTracker";

interface ProjectDetailPageProps {
  project: Project;
  onNavigate: (path: string, hash?: string) => void;
}

export default function ProjectDetailPage({ project, onNavigate }: ProjectDetailPageProps) {
  // Use scroll progress tracking hook for the project page
  useScrollTracker(`project-${project.slug}`);

  // Always scroll to top when mounting a detail page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.slug]);

  return (
    <div className="relative min-h-screen bg-paper w-full pt-32 overflow-hidden flex flex-col justify-between">
      {/* Background grain noise layer */}
      <div className="fixed inset-0 noise-overlay opacity-[0.045] mix-blend-multiply pointer-events-none z-40" />

      {/* Main Container */}
      <div className="flex-1 max-w-[1200px] mx-auto px-6 md:px-16 w-full">
        {/* Back Link Row */}
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
            <span>Back to Works</span>
          </button>
        </div>

        {/* Header Grid: Large title left, description right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          {/* Left Area: Title and Metadata */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <ScrollReveal>
              <h1 className="font-serif italic text-6xl md:text-8xl text-ink font-light leading-none tracking-tight">
                {project.title}
              </h1>
            </ScrollReveal>

            {/* Metadata Row */}
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap items-center text-xs md:text-sm text-muted-main font-sans font-semibold tracking-tight gap-y-2">
                <span className="text-ink">{project.category}</span>
                <span className="mx-3 text-muted-light">/</span>
                <span className="text-ink">Year {project.year}</span>
                {project.externalUrl && (
                  <>
                    <span className="mx-3 text-muted-light">/</span>
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-ink hover:underline underline-offset-2"
                    >
                      <span>Live Link</span>
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Tech Stack Pills */}
            {project.techStack && project.techStack.length > 0 && (
              <ScrollReveal delay={120}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-ink font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right Area: Large Paragraph Intro */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={150}>
              <p className="font-sans text-lg md:text-xl text-ink-soft leading-relaxed tracking-tight">
                {project.description}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Hero Image: Wide Rounded Frame */}
        <ScrollReveal delay={200} className="mb-24">
          <div className="relative overflow-hidden aspect-[16/10] md:aspect-[16/9] w-full rounded-[24px] bg-paper-deep border border-ink/5 shadow-lg">
            <img
              src={project.heroImage}
              alt={`${project.title} cover`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </ScrollReveal>

        {/* Dynamic Case Study Content Sections */}
        <div className="max-w-[800px] mx-auto flex flex-col space-y-16 md:space-y-24 mb-24">
          {project.sections.map((section, sIdx) => (
            <ScrollReveal key={sIdx} className="flex flex-col space-y-6">
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-ink tracking-tight leading-snug">
                {section.heading}
              </h2>
              <div className="flex flex-col space-y-4 text-base md:text-lg text-ink-soft leading-relaxed font-sans tracking-tight">
                {section.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Gallery Grid Section (Two-Column Arrangement) */}
        {project.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
            {project.gallery.map((imgUrl, gIdx) => (
              <ScrollReveal key={gIdx} delay={gIdx * 100}>
                <div className="relative overflow-hidden aspect-[4/3] w-full rounded-[20px] bg-paper-deep border border-ink/5 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={imgUrl}
                    alt={`${project.title} screenshot ${gIdx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Structured Footer */}
      <Footer currentPath={project.slug} onNavigate={onNavigate} />
    </div>
  );
}
