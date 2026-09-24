import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate a stable set of stars to prevent hydration/rendering flickers
    const colors = [
      "bg-ink/15 dark:bg-dark-text/20",
      "bg-purple-500/10 dark:bg-purple-400/20",
      "bg-indigo-500/10 dark:bg-indigo-400/20",
      "bg-blue-500/10 dark:bg-blue-400/20",
      "bg-amber-500/10 dark:bg-amber-400/20"
    ];

    const generatedStars: Star[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      top: Math.round(Math.random() * 94 + 3),
      left: Math.round(Math.random() * 94 + 3),
      size: Math.round((Math.random() * 3 + 1.5) * 10) / 10, // 1.5px to 4.5px
      delay: Math.round(Math.random() * 8 * 10) / 10, // 0s to 8s
      duration: Math.round((Math.random() * 6 + 4) * 10) / 10, // 4s to 10s
      color: colors[i % colors.length]
    }));

    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Dynamic twinkling star particles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-twinkle ${star.color}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Decorative technical/space coordinates background grid */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:6rem_6rem]" />
    </div>
  );
}
