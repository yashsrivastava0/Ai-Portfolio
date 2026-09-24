import { useState, useEffect } from "react";
import FixedNav from "./components/FixedNav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ManifestoSection from "./components/ManifestoSection";
import ServicesSection from "./components/ServicesSection";
import ExperienceAndSkillsSection from "./components/ExperienceAndSkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ThoughtsSection from "./components/ThoughtsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectDetailPage from "./components/ProjectDetailPage";
import ThoughtDetailPage from "./components/ThoughtDetailPage";
import Starfield from "./components/Starfield";
import { portfolioContent } from "./data";
import { scrollToElement } from "./utils/scroll";
import { analytics } from "./utils/analytics";
import PortfolioSidekick from "./components/PortfolioSidekick";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loadStage, setLoadStage] = useState(0);

  // Send an update on SPA route changes
  useEffect(() => {
    // We let the analytics instance know the page has updated. Just calling the tracker trigger will send an updated beacon
    // with the latest window.location.href.
    if (analytics) {
      // Small deferred non-blocking call to wait for page-load changes to fully propagate in DOM
      setTimeout(() => {
        // Trigger a silent beacon update for the new page path
        analytics.sendBeaconData();
      }, 100);
    }
  }, [currentPath]);

  // Call the analytics function from the application's root component approximately 1.5 seconds after the application mounts.
  useEffect(() => {
    if (analytics) {
      const timer = setTimeout(() => {
        analytics.trackInitialVisit();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Synchronize path changes with browser history back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Timed entrance transition for landing page
  useEffect(() => {
    if (currentPath !== "/") {
      setLoadStage(2);
      return;
    }
    
    setLoadStage(0);
    // Stage 1: Title becomes sharp, portrait begins to rise at 600ms
    const t1 = setTimeout(() => setLoadStage(1), 600);
    // Stage 2: Title shifts up, portrait settles, and auxiliary elements fade in at 1600ms (exactly 1000ms later)
    const t2 = setTimeout(() => setLoadStage(2), 1600);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentPath]);

  // Custom route navigation helper
  const navigate = (path: string, hash?: string) => {
    window.history.pushState({}, "", path + (hash || ""));
    setCurrentPath(path);

    if (hash) {
      setTimeout(() => {
        scrollToElement(hash);
      }, 150); // slight delay to allow page mount/rendering to complete smoothly
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // Route: Project Detail Page
  if (currentPath.startsWith("/work/")) {
    const slug = currentPath.substring("/work/".length);
    const project = portfolioContent.projects.find((p) => p.slug === slug);
    if (project) {
      return (
        <div className="relative min-h-screen bg-paper w-full">
          <FixedNav currentPath={currentPath} onNavigate={navigate} />
          <ProjectDetailPage project={project} onNavigate={navigate} />
          <PortfolioSidekick currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }
  }

  // Route: Thought/Article Detail Page
  if (currentPath.startsWith("/thoughts/")) {
    const slug = currentPath.substring("/thoughts/".length);
    const thought = portfolioContent.thoughts.find((t) => t.slug === slug);
    if (thought) {
      return (
        <div className="relative min-h-screen bg-paper w-full">
          <FixedNav currentPath={currentPath} onNavigate={navigate} />
          <ThoughtDetailPage thought={thought} onNavigate={navigate} />
          <PortfolioSidekick currentPath={currentPath} onNavigate={navigate} />
        </div>
      );
    }
  }

  // Default Route: HomePage Landing Layout
  return (
    <div className="relative min-h-screen bg-paper w-full overflow-x-hidden">
      {/* Procedural fine-grain noise overlay */}
      <div className="fixed inset-0 noise-overlay opacity-[0.045] mix-blend-multiply pointer-events-none z-40" />

      {/* Starfield background */}
      <Starfield />

      {/* Floating Centered Nav Menu */}
      <FixedNav currentPath={currentPath} onNavigate={navigate} visible={loadStage >= 2} />

      {/* Hero Section */}
      <HeroSection onNavigate={navigate} stage={loadStage} />

      {/* About Section */}
      <AboutSection />

      {/* Word-by-word scroll-linked Manifesto */}
      <ManifestoSection />

      {/* Ruled Services Rows */}
      <ServicesSection />

      {/* Experience, Skills & Education */}
      <ExperienceAndSkillsSection />

      {/* Project Card Portfolio */}
      <ProjectsSection onNavigate={navigate} />

      {/* Dark Testimonial Row */}
      <TestimonialsSection />

      {/* Article / Thoughts Grid */}
      <ThoughtsSection onNavigate={navigate} />

      {/* Split contact area & Dark Form */}
      <ContactSection />

      {/* Dark textured Footer */}
      <Footer currentPath={currentPath} onNavigate={navigate} />

      {/* Interactive Portfolio Companion */}
      <PortfolioSidekick currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}
