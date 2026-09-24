import { useEffect, useRef } from "react";
import { analytics } from "../utils/analytics";

/**
 * Custom React hook to track scroll progress percentages on a page.
 * Tracks 25%, 50%, 75%, and 100% scroll depth and logs to the analytics instance.
 *
 * @param pageIdentifier Unique slug or path of the current page to isolate triggers.
 */
export function useScrollTracker(pageIdentifier: string) {
  const triggeredThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset triggers on page transition
    triggeredThresholds.current = new Set();

    const calculateAndTrack = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollable = scrollHeight - clientHeight;

      // Handle non-scrollable / short pages
      if (totalScrollable <= 0) {
        // Trigger all thresholds with a slight stagger/safeguard
        const thresholds = [25, 50, 75, 100];
        thresholds.forEach((t) => {
          if (!triggeredThresholds.current.has(t)) {
            triggeredThresholds.current.add(t);
            if (analytics) {
              analytics.trackScrollProgress(t);
            }
          }
        });
        return;
      }

      const percentage = Math.min(100, Math.max(0, Math.round((scrollTop / totalScrollable) * 100)));

      const thresholds = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (percentage >= t && !triggeredThresholds.current.has(t)) {
          triggeredThresholds.current.add(t);
          if (analytics) {
            analytics.trackScrollProgress(t);
          }
        }
      }
    };

    // Slight delay before initial calculation to allow components & dynamic content/images to lay out fully
    const timer = setTimeout(calculateAndTrack, 1500);

    window.addEventListener("scroll", calculateAndTrack, { passive: true });
    window.addEventListener("resize", calculateAndTrack, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", calculateAndTrack);
      window.removeEventListener("resize", calculateAndTrack);
    };
  }, [pageIdentifier]);
}
