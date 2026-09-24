import { useEffect, useRef } from "react";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const manifestoText =
    "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.";

  const words = manifestoText.split(" ");

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const wordSpans = textElement.querySelectorAll(".manifesto-word") as NodeListOf<HTMLSpanElement>;

    let scheduledAnimationFrame = false;

    const handleScroll = () => {
      if (scheduledAnimationFrame) return;
      scheduledAnimationFrame = true;

      requestAnimationFrame(() => {
        scheduledAnimationFrame = false;
        
        const viewportHeight = window.innerHeight;
        
        wordSpans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const elementTop = rect.top;
          
          // Define the triggers (starts unbluring at 85% height, fully clear by 70% height - exactly 15% scroll range)
          const startRevealY = viewportHeight * 0.85; 
          const fullRevealY = viewportHeight * 0.70;  
          
          let progress = 0;
          if (elementTop < startRevealY) {
            progress = (startRevealY - elementTop) / (startRevealY - fullRevealY);
          }
          
          // Clamp progress between 0 and 1
          progress = Math.max(0, Math.min(1, progress));
          
          // Now apply the style transformations based on progress
          // Color interpolate from light gray (#c9c5c1) to dark (#111111)
          const blurValue = (1 - progress) * 8; // from 8px to 0px
          const translateYValue = (1 - progress) * 12; // from 12px to 0px
          const scaleValue = 0.95 + progress * 0.05; // from 0.95 to 1.0
          
          // Color interpolation:
          // #c9c5c1 is rgb(201, 197, 193)
          // #111111 is rgb(17, 17, 17)
          const r = Math.round(201 - (201 - 17) * progress);
          const g = Math.round(197 - (197 - 17) * progress);
          const b = Math.round(193 - (193 - 17) * progress);
          
          span.style.color = `rgb(${r}, ${g}, ${b})`;
          span.style.filter = `blur(${blurValue}px)`;
          span.style.transform = `translateY(${translateYValue}px) scale(${scaleValue})`;
          span.style.opacity = `${0.15 + progress * 0.85}`; // from 0.15 opacity to 1.0
        });
      });
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full py-40 md:py-60 px-6 md:px-16 bg-paper overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto">
        <p
          ref={textRef}
          className="font-sans font-medium text-4xl md:text-5xl lg:text-[54px] leading-[1.25] tracking-tight text-left select-none"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="manifesto-word inline-block mr-[0.25em] will-change-[transform,filter,opacity,color]"
              style={{
                display: "inline-block",
                transformOrigin: "center center",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
