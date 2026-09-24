import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";

export default function ExperienceAndSkillsSection() {
  const { experience, skills, education } = portfolioContent;

  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden border-t border-ink/5"
    >
      <div className="max-w-[1200px] mx-auto space-y-24 md:space-y-36">
        
        {/* Experience Sub-Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Title */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none sticky top-28">
                Professional <br />
                Experience
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-8 flex flex-col border-t border-ink/10">
            {experience.map((exp, index) => (
              <ScrollReveal
                key={exp.company + exp.role}
                delay={index * 100}
                className="w-full"
              >
                <div className="py-10 border-b border-ink/10 flex flex-col space-y-4 group">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    {/* Role & Company */}
                    <div>
                      <h3 className="font-sans font-semibold text-2xl md:text-3xl text-ink tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                        {exp.role}
                      </h3>
                      <p className="font-sans font-medium text-lg text-ink-soft mt-1">
                        {exp.company} {exp.location ? `• ${exp.location}` : ""}
                      </p>
                    </div>
                    {/* Date badge */}
                    <div className="mt-2 md:mt-0">
                      <span className="font-mono text-xs tracking-wider uppercase bg-ink/5 text-ink py-1 px-3 rounded-full border border-ink/10">
                        {exp.dates}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3.5 text-base font-sans text-ink-soft tracking-tight leading-relaxed list-none pl-0">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start">
                        <span className="text-ink/40 mr-3 select-none mt-2.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-ink/40" />
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Skills Sub-Section */}
        <div id="skills" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column: Title */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none sticky top-28">
                Technical <br />
                Skills
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column: Grouped Tags */}
          <div className="lg:col-span-8 flex flex-col border-t border-ink/10">
            {skills.map((skillGroup, index) => (
              <ScrollReveal
                key={skillGroup.category}
                delay={index * 100}
                className="w-full"
              >
                <div className="py-8 border-b border-ink/10 grid grid-cols-1 md:grid-cols-12 items-baseline gap-4">
                  {/* Category */}
                  <div className="md:col-span-4">
                    <h4 className="font-sans font-bold text-lg text-ink uppercase tracking-wider">
                      {skillGroup.category}
                    </h4>
                  </div>
                  {/* Skill tags */}
                  <div className="md:col-span-8">
                    <div className="flex flex-wrap gap-2.5">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-xs tracking-tight text-ink bg-paper-deep border border-ink/10 py-1.5 px-3.5 rounded-lg hover:border-ink/30 hover:bg-paper transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Education Sub-Section */}
        <div id="education" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column: Title */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none sticky top-28">
                Education
              </h2>
            </ScrollReveal>
          </div>

          {/* Right Column: Education details */}
          <div className="lg:col-span-8 flex flex-col border-t border-ink/10">
            {education.map((edu, index) => (
              <ScrollReveal
                key={edu.degree + edu.institution}
                delay={index * 100}
                className="w-full"
              >
                <div className="py-8 border-b border-ink/10 flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <h3 className="font-sans font-semibold text-2xl text-ink tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="font-sans font-medium text-base text-ink-soft mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="font-mono text-xs tracking-wider uppercase bg-ink/5 text-ink py-1 px-3 rounded-full border border-ink/10">
                      {edu.dates}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
