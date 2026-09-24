import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";

interface ProjectsSectionProps {
  onNavigate: (path: string) => void;
}

export default function ProjectsSection({ onNavigate }: ProjectsSectionProps) {
  const { projects } = portfolioContent;

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-20">
          <ScrollReveal>
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none">
              Featured <br />
              Projects
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150} className="mt-6 sm:mt-0">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                // Since this is a single page portfolio that expands, we can just scroll down or toggle additional items
                const firstProjectCard = document.querySelector(".project-card");
                if (firstProjectCard) {
                  firstProjectCard.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center space-x-2 font-sans font-semibold text-ink group focus:outline-none"
            >
              <span>View All Work</span>
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

        {/* Primary Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              delay={index * 120}
              className="project-card flex flex-col group cursor-pointer"
            >
              <div
                onClick={() => onNavigate(`/work/${project.slug}`)}
                className="relative overflow-hidden aspect-[4/3] rounded-[24px] bg-paper-deep border border-ink/5 shadow-md mb-6"
              >
                {/* Image element with responsive zoom scaling */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle vignette layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text metadata */}
              <div onClick={() => onNavigate(`/work/${project.slug}`)} className="flex flex-col space-y-1">
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-ink leading-tight group-hover:text-ink-soft transition-colors">
                  {project.title}
                </h3>
                <p className="font-sans font-medium text-sm text-muted-main tracking-tight">
                  {project.category}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
