import ScrollReveal from "./ScrollReveal";
import { portfolioContent } from "../data";

export default function ServicesSection() {
  const { services } = portfolioContent;

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-36 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Heading */}
        <div className="lg:col-span-4">
          <ScrollReveal>
            <h2 className="font-sans font-bold text-5xl md:text-6xl text-ink tracking-tight leading-none">
              Services
            </h2>
          </ScrollReveal>
        </div>

        {/* Right Column: Rows list */}
        <div className="lg:col-span-8 flex flex-col border-t border-ink/10">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={index * 80}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 items-center py-8 md:py-10 border-b border-ink/10 group hover:bg-paper-deep/40 transition-colors duration-300 px-2 rounded-lg -mx-2">
                {/* Service Title */}
                <div className="md:col-span-5 mb-4 md:mb-0">
                  <h3 className="font-sans font-semibold text-2xl md:text-3xl text-ink tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Service Tags */}
                <div className="md:col-span-7">
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs tracking-tight text-ink bg-paper-deep hover:bg-ink hover:text-paper border border-ink/10 hover:border-transparent py-1.5 px-3.5 rounded-lg transition-all duration-300 cursor-default select-none shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
