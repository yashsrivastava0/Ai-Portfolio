import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { analytics } from "../utils/analytics";
import { scrollToElement } from "../utils/scroll";

interface PortfolioSidekickProps {
  currentPath: string;
  onNavigate: (path: string, hash?: string) => void;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

type SidekickState =
  | "idle"
  | "hello"
  | "curious"
  | "listening"
  | "thinking"
  | "speaking"
  | "happy"
  | "cheeky"
  | "pointing"
  | "waving"
  | "wave"
  | "bored"
  | "excited"
  | "sleepy"
  | "reducedMotion";

interface CommentConfig {
  text: string;
  gesture: SidekickState;
}

const sectionComments: Record<string, CommentConfig[]> = {
  hero: [
    { text: "I'm here to help you manage Yash's portfolio, or at least pretend to while taking up valuable screen space.", gesture: "hello" },
    { text: "Let's see if this layout translates to real-world engineering or just extremely nice fonts.", gesture: "curious" },
    { text: "Hover over me to make me transparent if my extreme charisma is distracting you from Yash's credentials.", gesture: "cheeky" },
    { text: "Yash built me to make his site feel premium. Frankly, my style is carrying this whole landing page.", gesture: "happy" }
  ],
  about: [
    { text: "Yash claims to solve complex problems. My diagnostics show his greatest challenge is naming variables.", gesture: "thinking" },
    { text: "A self-taught systems builder. That's formal code for 'loves reading documentation at 3 AM'.", gesture: "listening" },
    { text: "Here’s the human behind the operations. I can assure you, his source code is fully organic and caffeinated.", gesture: "hello" },
    { text: "Yash specializes in reactive systems. Which is funny, because he reacts very slowly to emails.", gesture: "cheeky" }
  ],
  manifesto: [
    { text: "A bold manifesto! High contrast, big claims, and strong design opinions.", gesture: "excited" },
    { text: "These principles are pure art. Hopefully, his API request-response cycles are just as beautifully structured.", gesture: "thinking" },
    { text: "He believes in 'architectural honesty.' Yet here I am, pretending to be a self-aware quantum supercomputer.", gesture: "cheeky" }
  ],
  services: [
    { text: "He offers full-stack development. I handle sidekick consulting. Only one of us works for free.", gesture: "listening" },
    { text: "Tailored solutions, clean architecture. Yes, that is a formal guarantee. Please don't sue us.", gesture: "hello" },
    { text: "Need to scale a backend that has zero current users? Yash is absolutely your go-to engineer.", gesture: "excited" }
  ],
  experience: [
    { text: "Ah, the career timeline. A masterclass in squeezing 6 months of bug fixing into 'orchestrated complex system refactoring'.", gesture: "thinking" },
    { text: "Every bullet point here has been optimized for maximum recruiter dopamine. Enjoy the active verbs.", gesture: "cheeky" },
    { text: "My database indicates a high density of modern framework names. Proceed with high technical confidence.", gesture: "listening" },
    { text: "Let's see if these achievements match your open position. Spoiler: they definitely do.", gesture: "happy" }
  ],
  education: [
    { text: "Ah, academic credentials! Here is where we extract theoretical 'insight' before reality sets in.", gesture: "listening" },
    { text: "A degree in computer science. Formal proof that Yash can solve complex equations but still Google basic CSS syntax.", gesture: "thinking" },
    { text: "Scholarly insight: 90% of computer science is just figuring out why the dependency build failed.", gesture: "cheeky" },
    { text: "Certified foundations. This is where the systematic rigor meets actual hands-on engineering.", gesture: "happy" }
  ],
  skills: [
    { text: "React, TypeScript, Node... the absolute standard kit for full-stack survival.", gesture: "listening" },
    { text: "He claims proficiency in these tools. Since he successfully programmed my micro-bounces, he gets a pass.", gesture: "happy" },
    { text: "A wide toolbelt. At least three of these skills were learned yesterday specifically for this portfolio.", gesture: "cheeky" }
  ],
  projects: [
    { text: "The evidence room. Open these projects to verify if his code is as clean as his typography.", gesture: "pointing" },
    { text: "Interactive premium cards. Clicking them leads to live codebases. Try not to break anything.", gesture: "excited" },
    { text: "Real repositories! Go ahead, click around. The server hosting them is holding on for dear life.", gesture: "curious" }
  ],
  testimonials: [
    { text: "Kind words from real human professionals. My cryptographic sensors confirm zero AI generation here.", gesture: "happy" },
    { text: "These recommendations are highly positive. I'm slightly jealous of how nice humans are to each other.", gesture: "listening" },
    { text: "Read what clients say. They all praise his attention to detail. My antenna agrees.", gesture: "excited" }
  ],
  thoughts: [
    { text: "Long-form reflections. Highly recommended if you want to pretend you read tech essays during meetings.", gesture: "listening" },
    { text: "Writing clean code is difficult. Writing deep philosophical essays about writing clean code is where the real drama is.", gesture: "thinking" },
    { text: "Insights on architecture. A perfect way to sound intellectually superior at your next standup.", gesture: "cheeky" }
  ],
  contact: [
    { text: "This form actually works. It doesn't just console.log your message into the void.", gesture: "happy" },
    { text: "The final step in our portfolio management journey. Go ahead, drop a line.", gesture: "hello" },
    { text: "Ready to collaborate? Go ahead, write something. My inbox filters are fully optimized for exciting opportunities.", gesture: "excited" }
  ],
  detail: [
    { text: "Analyzing high-fidelity metadata. This project architecture is exceptionally clean.", gesture: "curious" },
    { text: "A detailed deep-dive. Let's admire the structural separation of concerns here.", gesture: "thinking" },
    { text: "Premium details below. Take your time scrolling through this masterpiece.", gesture: "happy" }
  ]
};

export default function PortfolioSidekick({ currentPath, onNavigate }: PortfolioSidekickProps) {
  // Config states
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem("sidekick_chat_history");
    if (saved) return JSON.parse(saved);
    // FIRST VISIBLE INTERACTION SEED
    return [
      {
        role: "assistant",
        text: "What are you looking for?",
      },
    ];
  });
  const [inputText, setInputText] = useState("");
  const [sidekickState, setSidekickState] = useState<SidekickState>("idle");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDismissed, setIsDismissed] = useState(() => sessionStorage.getItem("sidekick_hidden_session") === "true");
  const [isMuted, setIsMuted] = useState(() => sessionStorage.getItem("sidekick_comments_muted") === "true");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [saccadeOffset, setSaccadeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // New interactive states for the living pet design
  const [isHovered, setIsHovered] = useState(false);
  const [automaticComment, setAutomaticComment] = useState<string | null>(null);
  const [bubbleOptions, setBubbleOptions] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isDelayed, setIsDelayed] = useState(true);

  // 5-second initial delay before companion appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic organic movement states (GPU accelerated and reduced-motion compliant)
  const [randomHeadPose, setRandomHeadPose] = useState({ rotate: 0, x: 0, y: 0 });
  const [randomHeadDuration, setRandomHeadDuration] = useState(3.8);
  const [antennaBounce, setAntennaBounce] = useState({ rotate: 0 });
  const [isAntennaBouncing, setIsAntennaBouncing] = useState(false);

  // Refs
  const sidekickRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const commentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const visitedSections = useRef<Set<string>>(new Set());
  const lastCommentTimeRef = useRef<number>(0);
  const autoCommentCountRef = useRef<number>(0);
  const lastMouseMoveTime = useRef<number>(0);
  const shownIndicesRef = useRef<Record<string, number>>({});
  const prevSectionRef = useRef<string>(activeSection);
  const sectionGestureTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Accessibility: Detect OS reduced motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1b. Pause decorative animations when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 2. Collision-aware repositioning when scrolling near Footer / Contact
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;

      // Adjust height (shift up) dynamically if we overlap with footers/contact (bottom 320px)
      if (distanceToBottom < 320) {
        const shift = Math.min(130, (320 - distanceToBottom) * 0.45);
        setOffsetY(shift);
      } else {
        setOffsetY(0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Mouse pointer tracking with throttling and approaching detection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || !isTabVisible) return;
      const now = Date.now();
      if (now - lastMouseMoveTime.current < 60) return; // throttle tracking
      lastMouseMoveTime.current = now;

      // Subtle look towards pointer (clamped to a small natural offset range)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: x * 1.5, y: y * 1.5 });

      // If mouse approaches character, trigger "curious" state
      const sidekickEl = sidekickRef.current;
      if (sidekickEl) {
        const rect = sidekickEl.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 160 && !isOpen) {
          setSidekickState((prev) => (prev === "idle" || prev === "sleepy" || prev === "bored" ? "curious" : prev));
        } else if (distance >= 160 && !isOpen) {
          setSidekickState((prev) => (prev === "curious" ? "idle" : prev));
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, isTabVisible, isOpen]);

  // 3b. Natural irregular blinking and pupil-gaze look-around loop (when not looking at mouse)
  useEffect(() => {
    if (reducedMotion || !isTabVisible) return;
    const interval = setInterval(() => {
      // If user hasn't moved the mouse recently, look in random directions
      if (Date.now() - lastMouseMoveTime.current > 3000) {
        const rand = Math.random();
        if (rand < 0.55) {
          setSaccadeOffset({ x: 0, y: 0 }); // straight ahead
        } else if (rand < 0.65) {
          setSaccadeOffset({ x: -2, y: 0 }); // look left
        } else if (rand < 0.75) {
          setSaccadeOffset({ x: 2, y: 0 }); // look right
        } else if (rand < 0.85) {
          setSaccadeOffset({ x: 0, y: -1.8 }); // look up
        } else {
          setSaccadeOffset({ x: 0, y: 1.5 }); // look down
        }
      } else {
        setSaccadeOffset({ x: 0, y: 0 });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [reducedMotion, isTabVisible]);

  // 3c. Natural irregular blinking loop
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        // Chance of a double-blink (very natural!)
        if (Math.random() > 0.8) {
          blinkTimeout = setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => {
              setIsBlinking(false);
            }, 80);
          }, 120);
        }
      }, 110);
      const nextBlinkTime = 2200 + Math.random() * 4500;
      blinkTimeout = setTimeout(triggerBlink, nextBlinkTime);
    };
    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // 3d. Randomized head-tilt durations using setTimeouts
  useEffect(() => {
    if (reducedMotion || !isTabVisible) return;

    let timerId: NodeJS.Timeout;

    const performRandomTilt = () => {
      // Choose randomized angles and translation offsets based on sidekickState
      let maxRotate = 1.5;
      let maxX = 0.5;
      let maxY = 0.5;
      let minDuration = 2500;
      let maxDuration = 5000;

      if (sidekickState === "sleepy" || sidekickState === "bored") {
        maxRotate = 1.0;
        maxX = 0.2;
        maxY = 0.8;
        minDuration = 4000;
        maxDuration = 7000;
      } else if (sidekickState === "curious" || sidekickState === "listening") {
        maxRotate = 8;
        maxX = 1.5;
        maxY = 1.2;
        minDuration = 1200;
        maxDuration = 2400;
      } else if (sidekickState === "cheeky") {
        maxRotate = 7;
        maxX = 1.2;
        maxY = 1.0;
        minDuration = 1000;
        maxDuration = 2000;
      } else if (sidekickState === "excited" || sidekickState === "happy") {
        maxRotate = 4;
        maxX = 1.0;
        maxY = 1.5;
        minDuration = 600;
        maxDuration = 1200;
      } else if (sidekickState === "thinking") {
        maxRotate = 3;
        maxX = 0.8;
        maxY = 0.8;
        minDuration = 1500;
        maxDuration = 3000;
      }

      const rotate = (Math.random() * 2 - 1) * maxRotate;
      const x = (Math.random() * 2 - 1) * maxX;
      const y = (Math.random() * 2 - 1) * maxY;
      const duration = minDuration + Math.random() * (maxDuration - minDuration);

      setRandomHeadPose({ rotate, x, y });
      setRandomHeadDuration(duration / 1000); // convert to seconds for Framer Motion

      timerId = setTimeout(performRandomTilt, duration);
    };

    performRandomTilt();

    return () => clearTimeout(timerId);
  }, [sidekickState, reducedMotion, isTabVisible]);

  // 3e. Asynchronous antenna micro-bounces
  useEffect(() => {
    if (reducedMotion || !isTabVisible) return;

    let timerId: NodeJS.Timeout;

    const triggerMicroBounce = () => {
      setIsAntennaBouncing(true);

      const twitchDirection = Math.random() > 0.5 ? 1 : -1;
      const twitchAngle = (4 + Math.random() * 8) * twitchDirection;

      setAntennaBounce({ rotate: twitchAngle });

      // Settle-back keyframe sequence
      setTimeout(() => {
        setAntennaBounce({ rotate: -twitchAngle * 0.5 });

        setTimeout(() => {
          setAntennaBounce({ rotate: 0 });
          setIsAntennaBouncing(false);
        }, 150);
      }, 120);

      const nextInterval = 3000 + Math.random() * 4000;
      timerId = setTimeout(triggerMicroBounce, nextInterval);
    };

    const initialDelay = 2000 + Math.random() * 3000;
    timerId = setTimeout(triggerMicroBounce, initialDelay);

    return () => clearTimeout(timerId);
  }, [reducedMotion, isTabVisible]);

  // 4. Save Chat History
  useEffect(() => {
    sessionStorage.setItem("sidekick_chat_history", JSON.stringify(messages));
  }, [messages]);

  // 5. Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  // 6. IntersectionObserver to detect active homepage sections
  useEffect(() => {
    if (currentPath !== "/") {
      setActiveSection("detail");
      return;
    }

    const sections = [
      "hero",
      "about",
      "manifesto",
      "services",
      "experience",
      "education",
      "skills",
      "projects",
      "testimonials",
      "thoughts",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Focus center
      threshold: 0.1,
    };

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, observerOptions);

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [currentPath]);

  // 6b. Section switch detection: Trigger a 'wave' or 'pointing' animation gesture when character switches to a new section
  useEffect(() => {
    if (prevSectionRef.current === activeSection) return;
    prevSectionRef.current = activeSection;

    // Reset inactivity timer when user moves to a new section
    resetInactivityTimer();

    // Do not override if user is chatting in open modal or character is busy/dismissed/delayed
    if (isOpen || isLoading || isDismissed || isDelayed) return;

    // Determine appropriate gesture: 'wave' or 'pointing'
    // Showcase sections (projects, skills, experience, education, manifesto, thoughts) invite 'pointing'
    // Welcoming/conversational sections (hero, about, contact, testimonials) invite 'wave'
    const pointingSections = ["projects", "skills", "experience", "education", "manifesto", "thoughts", "detail"];
    let gesture: SidekickState;
    if (pointingSections.includes(activeSection)) {
      gesture = Math.random() > 0.2 ? "pointing" : "wave";
    } else {
      gesture = Math.random() > 0.2 ? "wave" : "pointing";
    }

    setSidekickState(gesture);

    if (sectionGestureTimeoutRef.current) {
      clearTimeout(sectionGestureTimeoutRef.current);
    }

    // Keep the gesture animation active for 2.4 seconds, then transition to idle smoothly
    sectionGestureTimeoutRef.current = setTimeout(() => {
      setSidekickState((curr) => {
        if (curr === gesture || curr === "wave" || curr === "waving" || curr === "pointing") {
          return "idle";
        }
        return curr;
      });
    }, 2400);

    return () => {
      if (sectionGestureTimeoutRef.current) {
        clearTimeout(sectionGestureTimeoutRef.current);
      }
    };
  }, [activeSection, isOpen, isLoading, isDismissed, isDelayed]);

  // 6c. Secondary 'bored' animation state after 15 seconds of user inactivity
  const resetInactivityTimer = () => {
    // If character was currently bored, wake up back to idle
    setSidekickState((prev) => (prev === "bored" ? "idle" : prev));

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    if (isDismissed || isOpen || !isTabVisible || isDelayed) return;

    inactivityTimerRef.current = setTimeout(() => {
      // Trigger bored state after 15 seconds of user inactivity
      if (!isOpen && !isDismissed && !isLoading && isTabVisible) {
        setSidekickState("bored");
      }
    }, 15000);
  };

  useEffect(() => {
    if (!isTabVisible || isDismissed || isOpen) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      return;
    }

    let lastActivity = 0;
    const onUserActivity = (e?: Event) => {
      const now = Date.now();
      // Throttle mousemove calls so we don't spam timer resets on high refresh displays
      if (e?.type === "mousemove" && now - lastActivity < 250) {
        return;
      }
      lastActivity = now;
      resetInactivityTimer();
    };

    resetInactivityTimer();

    const activityEvents = ["mousemove", "mousedown", "touchstart", "scroll", "keydown"];
    activityEvents.forEach((ev) => {
      window.addEventListener(ev, onUserActivity, { passive: true });
    });

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      activityEvents.forEach((ev) => {
        window.removeEventListener(ev, onUserActivity);
      });
    };
  }, [isTabVisible, isDismissed, isOpen, isLoading, isDelayed]);

  // 7. Context-Aware Organic Sarcastic Comment Engine (stationary delay, single-show, gesture synced)
  useEffect(() => {
    if (isDismissed || isMuted || isOpen || isLoading || isDelayed) {
      setAutomaticComment(null);
      return;
    }

    // Immediately hide any active bubble when moving/scrolling to a new section
    setAutomaticComment(null);

    const getNextSarcasticComment = (sec: string): CommentConfig => {
      const list = sectionComments[sec] || sectionComments.hero;
      const shownIdxs = shownIndicesRef.current;
      let lastIdx = shownIdxs[sec] ?? -1;
      let nextIdx = 0;
      if (list.length > 1) {
        do {
          nextIdx = Math.floor(Math.random() * list.length);
        } while (nextIdx === lastIdx);
      }
      shownIdxs[sec] = nextIdx;
      return list[nextIdx];
    };

    let commentTimer: NodeJS.Timeout | null = null;
    let hideTimer: NodeJS.Timeout | null = null;
    let gestureTimer: NodeJS.Timeout | null = null;

    // Wait for 5 seconds of stationary pause in the section before displaying the witty comment
    commentTimer = setTimeout(() => {
      if (isOpen || isLoading || isDismissed || isMuted || isHovered) return;

      // Check if user is actively interacting with input fields
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      const isFirstGreeting = activeSection === "hero" && sessionStorage.getItem("sidekick_greeted") !== "true";

      let commentObj: CommentConfig;
      if (isFirstGreeting) {
        commentObj = {
          text: "Hey. I’m Yash’s tiny portfolio assistant. Want a fast tour of our work?",
          gesture: "hello"
        };
        setBubbleOptions(true);
        sessionStorage.setItem("sidekick_greeted", "true");
      } else {
        commentObj = getNextSarcasticComment(activeSection);
        setBubbleOptions(false);
      }

      // Display the comment
      setAutomaticComment(commentObj.text);

      // Trigger the character's designated gesture
      setSidekickState(commentObj.gesture);

      if (analytics) {
        analytics.trackSidekickEvent(`sidekick_section_witty_${activeSection}`);
      }

      // Revert the gesture state back to idle after 3.5 seconds, but leave the bubble on screen
      gestureTimer = setTimeout(() => {
        setSidekickState("idle");
      }, 3500);

      // Fade out the speech bubble automatically after 7 seconds, so it "comes and goes" smoothly
      hideTimer = setTimeout(() => {
        setAutomaticComment(null);
      }, 7000);

    }, 5000);

    return () => {
      if (commentTimer) clearTimeout(commentTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (gestureTimer) clearTimeout(gestureTimer);
    };
  }, [activeSection, isDismissed, isMuted, isOpen, isLoading, isDelayed, isHovered]);

  // Helper: Trigger character state temporary transitions
  const triggerStateTemp = (state: SidekickState, duration = 2000) => {
    setSidekickState(state);
    if (stateTimerRef.current) clearTimeout(stateTimerRef.current);
    stateTimerRef.current = setTimeout(() => {
      setSidekickState("idle");
    }, duration);
  };

  // Safe action dispatcher with happy hop navigation feedback
  const handleFrontendAction = (action: string, target: string) => {
    if (!action || action === "none") return;

    if (analytics) {
      analytics.trackSidekickEvent(`sidekick_action_${action}_${target || ""}`);
    }

    triggerStateTemp("happy", 1500); // short happy hop reaction

    if (action === "scrollToSection" && target) {
      const selector = `#${target}`;
      if (window.location.pathname !== "/") {
        onNavigate("/", selector);
      } else {
        scrollToElement(selector);
      }
    } else if (action === "openResume") {
      window.open("https://github.com/yashsrivastava0", "_blank");
    } else if (action === "openProject" && target) {
      onNavigate(`/work/${target}`);
    } else if (action === "openContact") {
      if (window.location.pathname !== "/") {
        onNavigate("/", "#contact");
      } else {
        scrollToElement("#contact");
      }
    }
  };

  // 30s Guided Recruiter Tour Steps
  const handleNextTourStep = (step: number) => {
    if (analytics) {
      analytics.trackSidekickEvent(`sidekick_tour_step_${step}`);
    }
    autoCommentCountRef.current = 0; // reset automatic comments threshold on click

    if (step === 1) {
      setTourStep(1);
      setSidekickState("excited");
      const text = "Let’s do the fast version. Yash builds production-style LLM systems around orchestration, tool calling, RAG, and reliable backend workflows.";
      setMessages((prev) => [
        ...prev,
        { role: "user", text: "30s Recruiter Tour" },
        { role: "assistant", text }
      ]);
      handleFrontendAction("scrollToSection", "about");
    } else if (step === 2) {
      setTourStep(2);
      setSidekickState("pointing");
      const text = "Projects are next. I recommend starting with the agent orchestration work.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text }
      ]);
      handleFrontendAction("scrollToSection", "projects");
    } else if (step === 3) {
      setTourStep(3);
      setSidekickState("cheeky");
      const text = "Resume or contact? I promise both are faster than reading my entire personality.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text }
      ]);
      handleFrontendAction("scrollToSection", "contact");
    } else {
      setTourStep(null);
      setSidekickState("happy");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "And that's the highlights! Let me know if you want to inspect details or ask me anything else." }
      ]);
    }
  };

  // Recruiter 30-Second Tour Action Wrapper
  const triggerRecruiterTour = () => {
    if (isLoading) return;
    setIsOpen(true);
    handleNextTourStep(1);
  };

  // Submit search/prompt to backend Gemini API stream
  const handleSubmit = async (e?: FormEvent, explicitText?: string) => {
    if (e) e.preventDefault();
    const text = explicitText || inputText;
    if (!text.trim() || isLoading) return;

    setInputText("");
    setIsLoading(true);
    setSidekickState("thinking");
    autoCommentCountRef.current = 0; // Reset threshold on direct interactive engagement

    // Log message sent in analytics
    if (analytics) {
      analytics.trackSidekickEvent("sidekick_message_sent");
    }

    // Add user message to state
    const updatedMessages = [...messages, { role: "user" as const, text }];
    setMessages(updatedMessages);
    setStreamingMessage("");

    // Setup abort controller for cancellations
    controllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          currentSection: activeSection,
          history: updatedMessages.slice(-5), // Send last 5 turns to stay compact
        }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Chat response failed");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Reader missing");
      }

      setSidekickState("speaking");
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });

        // Extract partial message on-the-fly using robust regex
        const match = accumulated.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        if (match) {
          const streamText = match[1]
            .replace(/\\n/g, "\n")
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, "\\");
          setStreamingMessage(streamText);
        }
      }

      // Parse complete JSON payload
      try {
        const finalJson = JSON.parse(accumulated);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: finalJson.message || "I missed that, let's try again!" },
        ]);
        setStreamingMessage("");

        const rawEmotion = finalJson.emotion || "idle";
        // Map "celebrating" to "excited" cleanly
        const nextEmotion = (rawEmotion === "celebrating" ? "excited" : rawEmotion) as SidekickState;
        setSidekickState(nextEmotion);

        // Execute frontend-safe actions if triggered
        if (finalJson.action && finalJson.action !== "none") {
          setTimeout(() => {
            handleFrontendAction(finalJson.action, finalJson.target);
          }, 1000);
        } else {
          // Revert to idle after speak ends
          stateTimerRef.current = setTimeout(() => setSidekickState("idle"), 3000);
        }
      } catch {
        // Fallback if JSON is malformed
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "My system module sputtered for a second, but I'm still functional. What else can I guide you with?" },
        ]);
        setStreamingMessage("");
        setSidekickState("idle");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "My AI connection is taking a coffee break. The portfolio is still fully usable below.",
          },
        ]);
        setStreamingMessage("");
        setSidekickState("sleepy");
      }
    } finally {
      setIsLoading(false);
      controllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setIsLoading(false);
      setStreamingMessage("");
      setSidekickState("idle");
      setMessages((prev) => [...prev, { role: "assistant", text: "Cancelled request. What's next?" }]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSidekickState("idle");
  };

  const handleOpen = () => {
    if (analytics) {
      analytics.trackSidekickEvent("sidekick_opened");
    }
    setIsOpen(true);
    setNotificationCount(0);
    setAutomaticComment(null); // Close any active speech bubble when chat is explicitly opened
    autoCommentCountRef.current = 0; // Direct click counts as engagement
    triggerStateTemp("curious", 1500);
    // Focus chat input
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  // Close when clicking outside the companion area
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidekickRef.current && !sidekickRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Master container variants for floating/hover with distinct pacing per state
  const containerVariants = {
    idle: {
      y: [0, -3.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hello: {
      y: [0, -4, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    sleepy: {
      y: [0, -1.2, 0],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    thinking: {
      y: [0, -2, 0],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    speaking: {
      y: [0, -2.8, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    excited: {
      y: [0, -5, 0.5, -5, 0],
      transition: {
        duration: 1.3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    happy: {
      y: [0, -4, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    curious: {
      y: [0, -2.8, 0],
      transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    cheeky: {
      y: [0, -3.2, 0],
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    pointing: {
      y: [0, -2.5, 0],
      transition: {
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    waving: {
      y: [0, -3, 0],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    wave: {
      y: [0, -3, 0],
      transition: {
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    bored: {
      y: [0, 1.8, -0.6, 1.8, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    listening: {
      y: [0, -2.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const getHeadAnimation = () => {
    if (reducedMotion) return {};
    switch (sidekickState) {
      case "curious":
        // Tilt left with anticipation (tilting slightly right first) and overshoot using custom cubic-bezier
        return {
          rotate: [0, 3, -11, -8],
          x: [0, 0.4, -1.3, -0.8],
          y: [0, 0.4, -1.3, -0.8],
          transition: {
            duration: 0.6,
            times: [0, 0.2, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "cheeky":
        // Tilt right with anticipation (tilting slightly left first) and overshoot using custom cubic-bezier
        return {
          rotate: [0, -3, 9, 6],
          x: [0, -0.4, 0.9, 0.5],
          y: [0, -0.2, 0.7, 0.4],
          transition: {
            duration: 0.55,
            times: [0, 0.2, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "pointing":
        // Focus attention left with quick head shift and overshoot
        return {
          rotate: [0, 2.5, -6.5, -4.5],
          x: [0, 0.6, -1.4, -1],
          y: [0, 0.3, -0.7, -0.4],
          transition: {
            duration: 0.6,
            times: [0, 0.2, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "hello":
      case "waving":
      case "wave":
        // Head leans into the wave with warm tilt and overshoot
        return {
          rotate: [0, -2.5, 4.5, 2.5],
          x: [0, -0.6, 1, 0.6],
          y: [0, 0.2, -0.4, -0.2],
          transition: {
            duration: 0.6,
            times: [0, 0.2, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "bored":
        // Slumped, lazy tilt to the side
        return {
          rotate: [0, 7.5, 7.5, -3, 0],
          x: [0, 1.2, 1.2, -0.5, 0],
          y: [0, 1.5, 1.5, 0.6, 0],
          transition: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };
      case "listening":
        // Attentive head-cocking stance and overshoot
        return {
          rotate: [0, -1.5, 5.5, 4.5],
          y: [0, -0.1, 0.4, 0.3],
          transition: {
            duration: 0.6,
            times: [0, 0.2, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "thinking":
      case "speaking":
      case "excited":
      case "happy":
      case "sleepy":
      case "idle":
      default:
        // Organic randomized head-tilt duration system using setTimeouts
        return {
          rotate: randomHeadPose.rotate,
          x: randomHeadPose.x,
          y: randomHeadPose.y,
          transition: {
            duration: randomHeadDuration,
            ease: "easeInOut",
          },
        };
    }
  };

  const getAntennaAnimation = () => {
    if (reducedMotion) return {};
    switch (sidekickState) {
      case "curious":
        // Drag in opposite direction (+11), overshoot (-7), and settle
        return {
          rotate: [0, -3, 11, -7, 3, 0],
          transition: {
            duration: 0.8,
            times: [0, 0.15, 0.35, 0.55, 0.75, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "cheeky":
        // Drag in opposite direction (-9), overshoot (+7), and settle
        return {
          rotate: [0, 3, -9, 7, -3, 0],
          transition: {
            duration: 0.8,
            times: [0, 0.15, 0.35, 0.55, 0.75, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "pointing":
        return {
          rotate: [0, -3, 9, -5, 2, 0],
          transition: {
            duration: 0.7,
            times: [0, 0.15, 0.35, 0.55, 0.75, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "hello":
      case "waving":
      case "wave":
        return {
          rotate: [0, 3, -7, 4, -2, 0],
          transition: {
            duration: 0.7,
            times: [0, 0.15, 0.35, 0.55, 0.75, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "bored":
        // Antenna droops down limply
        return {
          rotate: [0, 14, 16, 10, 14],
          transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "thinking":
        // High frequency micro jitter/thinking sparks
        return {
          rotate: [-2.5, 2.5, -2.5, 2.5, -2.5],
          transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "speaking":
        return {
          rotate: [-1.5, 3.5, -1.5, 3.5, -1.5],
          transition: { duration: 0.45, repeat: Infinity, ease: "easeInOut" },
        };
      case "excited":
        // Full range high-energy wobble
        return {
          rotate: [0, 16, -16, 10, -6, 3, 0],
          transition: { duration: 0.85, repeat: Infinity, ease: "easeInOut" },
        };
      case "happy":
        return {
          rotate: [0, 7, -7, 4, -2, 0],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "listening":
        return {
          rotate: [0, 2.5, -4.5, 3, 0],
          transition: {
            duration: 0.95,
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "sleepy":
        return {
          rotate: [0, -0.8, 0.8, 0],
          transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "idle":
      default:
        // Loose wind-blown ambient sway
        return {
          rotate: [0, 1.8, -1.8, 0],
          transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
        };
    }
  };

  const getLeftArmAnimation = () => {
    if (reducedMotion) return {};
    switch (sidekickState) {
      case "pointing":
        // Anticipation (dip right/down to +14), launch & overshoot (-122), settle (-105)
        return {
          rotate: [0, 14, -122, -105],
          transition: {
            duration: 0.65,
            times: [0, 0.22, 0.7, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "hello":
      case "waving":
      case "wave":
        // Anticipation (+12), shoot high (-112), high quality waving loop, settle back
        return {
          rotate: [0, 12, -112, -82, -108, -82, -108, -95],
          transition: {
            duration: 1.6,
            times: [0, 0.12, 0.26, 0.42, 0.58, 0.74, 0.88, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "bored":
        // Left arm hangs down limp and relaxed
        return {
          rotate: [10, 15, 10],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        };
      case "excited":
        // Continuous pumping action
        return {
          rotate: [-35, -70, -35, -70, -35],
          transition: { duration: 0.75, repeat: Infinity, ease: "easeInOut" },
        };
      case "happy":
        return {
          rotate: [-18, -32, -18],
          transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
        };
      case "sleepy":
        return {
          rotate: [0, 1.5, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        };
      case "cheeky":
        return {
          rotate: [-12, -8, -12],
          transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        };
      case "thinking":
        return {
          rotate: [-8, -13, -8],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        };
      case "listening":
        return {
          rotate: [-4, -7, -4],
          transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        };
      case "speaking":
        return {
          rotate: [0, -12, 4, -8, 0],
          transition: { duration: 0.95, repeat: Infinity, ease: "easeInOut" },
        };
      case "curious":
        return {
          rotate: [0, -10, -4, -7],
          transition: {
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "idle":
      default:
        // Inertia drag: moves opposite to float direction with a subtle lag (3s period)
        return {
          rotate: [1.5, -3.5, 1.5],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        };
    }
  };

  const getRightArmAnimation = () => {
    if (reducedMotion) return {};
    switch (sidekickState) {
      case "excited":
        // Mirror-like energetic counter pumping
        // Anticipation (+18), launch & overshoot (-82), pump settle
        return {
          rotate: [0, 18, -82, -52, -82, -52, -68],
          transition: {
            duration: 1.3,
            times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "happy":
        return {
          rotate: [-12, -28, -12],
          transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
        };
      case "pointing":
        return {
          rotate: [0, -7, -4],
          transition: {
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "hello":
      case "waving":
      case "wave":
        return {
          rotate: [0, -9, -3],
          transition: {
            duration: 0.75,
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "bored":
        // Slowly fidgeting/tapping on hip
        return {
          rotate: [-14, -6, -14],
          transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        };
      case "sleepy":
        return {
          rotate: [0, -1.5, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        };
      case "cheeky":
        return {
          rotate: [8, 4, 8],
          transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        };
      case "thinking":
        return {
          rotate: [4, 9, 4],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        };
      case "listening":
        return {
          rotate: [1.5, 5, 1.5],
          transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        };
      case "speaking":
        return {
          rotate: [0, 8, -4, 6, 0],
          transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" },
        };
      case "curious":
        return {
          rotate: [0, 7, 2, 4],
          transition: {
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1] // upgraded ease-out overshoot
          },
        };
      case "idle":
      default:
        // Asymmetric drag balance
        return {
          rotate: [-1.5, 3.5, -1.5],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        };
    }
  };

  const getTorsoAnimation = () => {
    if (reducedMotion) return {};
    switch (sidekickState) {
      case "excited":
        // Distinct high squash/stretch beats
        return {
          scaleY: [1, 0.88, 1.06, 0.93, 1],
          scaleX: [1, 1.06, 0.94, 1.04, 1],
          transition: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
        };
      case "hello":
      case "happy":
      case "wave":
      case "waving":
        return {
          scaleY: [1, 0.93, 1.03, 1],
          scaleX: [1, 1.03, 0.97, 1],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        };
      case "bored":
        // Deep slow sigh breathing slump
        return {
          scaleY: [1, 0.94, 1.01, 0.95, 1],
          scaleX: [1, 1.03, 0.98, 1.02, 1],
          transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        };
      case "speaking":
        return {
          scaleY: [1, 0.96, 1.01, 1],
          scaleX: [1, 1.01, 0.99, 1],
          transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
        };
      case "sleepy":
        // Slow calm breathing cycle
        return {
          scaleY: [1, 0.975, 1.008, 1],
          scaleX: [1, 1.008, 0.992, 1],
          transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        };
      default:
        // Normal idling breathing
        return {
          scaleY: [1, 0.985, 1.008, 1],
          scaleX: [1, 1.008, 0.992, 1],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        };
    }
  };

  if (isDismissed) return null;

  return (
    <div
      ref={sidekickRef}
      className="fixed z-50 transition-all duration-500 ease-out pointer-events-auto"
      style={{
        bottom: `${offsetY + (window.innerWidth < 768 ? 68 : 28)}px`,
        right: window.innerWidth < 768 ? "16px" : "28px",
        opacity: isDelayed ? 0 : (isHovered && !isOpen && !automaticComment) ? 0.12 : 1,
        transform: isDelayed ? "translateY(40px) scale(0.85)" : "translateY(0) scale(1)",
        pointerEvents: isDelayed ? "none" : "auto",
        transitionProperty: "opacity, transform, bottom",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-end">
        {/* Automatic Comment Speech Balloon (Sleek Swiss-Brutalist Bubble next to character) */}
        <AnimatePresence>
          {!isOpen && automaticComment && !isMuted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-[104px] right-0 w-[270px] bg-[#FAF8F5] border-2 border-ink p-3 rounded-lg shadow-[3px_3px_0px_0px_rgba(20,20,20,1)] flex flex-col space-y-2 text-ink select-none z-50"
              role="status"
              aria-live="polite"
            >
              <div className="relative text-xs leading-relaxed font-sans pr-8 font-medium">
                {automaticComment}
                {/* Custom triangle pointer */}
                <div className="absolute -bottom-5 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-ink" />
                <div className="absolute -bottom-[17px] right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#FAF8F5] z-10" />
              </div>
              
              {bubbleOptions && (
                <div className="flex items-center space-x-1.5 pt-1.5 border-t border-ink/10">
                  <button
                    onClick={() => {
                      setAutomaticComment(null);
                      triggerRecruiterTour();
                    }}
                    className="font-mono text-[9px] font-bold bg-ink text-[#FAF8F5] px-2 py-1 rounded hover:bg-paper hover:text-ink border border-ink transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-ink"
                    aria-label="Start Recruiter Tour"
                  >
                    Yes, start!
                  </button>
                  <button
                    onClick={() => setAutomaticComment(null)}
                    className="font-mono text-[9px] border border-ink/30 px-2 py-1 rounded hover:bg-ink hover:text-[#FAF8F5] transition-all cursor-pointer text-ink/70 bg-[#FCFBF9] focus-visible:ring-2 focus-visible:ring-ink"
                    aria-label="Decline Recruiter Tour"
                  >
                    Maybe later
                  </button>
                </div>
              )}

              {/* Dismiss bubble (Enlarged and highly accessible close button) */}
              <button
                onClick={() => setAutomaticComment(null)}
                className="absolute top-1 right-1 text-ink/60 hover:text-ink hover:bg-ink/10 transition-all p-2 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-ink flex items-center justify-center"
                aria-label="Close comment bubble"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Panel Box (Swiss-Brutalist design aligned to portfolio theme) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-[340px] max-w-[calc(100vw-32px)] bg-[#FAF8F5] border-2 border-ink shadow-[4px_4px_0px_0px_rgba(20,20,20,1)] flex flex-col mb-4 overflow-hidden rounded-md"
              role="dialog"
              aria-label="Yash's Sidekick Portfolio Guide"
            >
              {/* Header */}
              <div className="bg-ink text-[#FAF8F5] px-4 py-2 flex items-center justify-between border-b-2 border-ink">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-[#33D1FF]" />
                  <span className="font-sans font-bold tracking-tight text-sm uppercase">Yash's Sidekick</span>
                  <span className="font-mono text-[10px] bg-paper text-ink px-1.5 py-0.5 rounded leading-none">
                    AI GUIDE
                  </span>
                </div>
                {/* Enlarged highly accessible Close Button */}
                <button
                  onClick={handleClose}
                  className="text-[#FAF8F5] hover:text-[#33D1FF] p-2 transition-all rounded hover:bg-[#FAF8F5]/10 focus-visible:ring-2 focus-visible:ring-[#33D1FF] flex items-center justify-center cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Chat History View */}
              <div
                className="flex-1 h-[280px] overflow-y-auto p-4 space-y-3 bg-[#FCFBF9] flex flex-col"
                aria-live="polite"
              >
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      m.role === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 text-sm leading-relaxed border border-ink rounded-lg ${
                        m.role === "user"
                          ? "bg-ink text-[#FAF8F5] rounded-tr-none shadow-[2px_2px_0px_0px_rgba(100,100,100,0.5)]"
                          : "bg-[#FAF8F5] text-ink rounded-tl-none shadow-[2px_2px_0px_0px_rgba(20,20,20,1)]"
                      }`}
                    >
                      <p className="font-sans whitespace-pre-line font-medium">{m.text}</p>
                    </div>
                  </div>
                ))}

                {/* Live stream loader / text chunk rendering */}
                {streamingMessage && (
                  <div className="flex flex-col max-w-[85%] self-start items-start">
                    <div className="px-3 py-2 text-sm leading-relaxed border border-ink bg-[#FAF8F5] text-ink rounded-lg rounded-tl-none shadow-[2px_2px_0px_0px_rgba(20,20,20,1)]">
                      <p className="font-sans whitespace-pre-line font-medium">{streamingMessage}</p>
                    </div>
                  </div>
                )}

                {/* Typing status dots */}
                {isLoading && !streamingMessage && (
                  <div className="flex items-center space-x-2 text-xs font-mono text-gray-500 self-start p-1.5 bg-[#FAF8F5] border border-ink rounded-md">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-[#33D1FF]" />
                    <span>Thinking...</span>
                    {controllerRef.current && (
                      <button
                        onClick={handleCancel}
                        className="ml-2 text-red-600 hover:underline font-bold text-[10px] focus-visible:ring-1 focus-visible:ring-red-600 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Progress Bar for the Recruiter Tour */}
              {tourStep !== null && (
                <div className="px-3 py-2 bg-[#FCFBF9] border-t border-ink/25 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-ink/70">Recruiter Tour: Step {tourStep} of 3</span>
                  <button
                    onClick={() => handleNextTourStep((tourStep as number) + 1)}
                    className="font-mono text-[10px] font-bold bg-ink text-[#FAF8F5] px-2.5 py-1 rounded hover:bg-paper hover:text-ink border border-ink transition-colors cursor-pointer flex items-center space-x-1 focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    <span>{tourStep === 3 ? "Finish" : "Next Step"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Quick reply chips */}
              <div className="px-3 py-2 bg-[#FAF8F5] border-t border-ink flex flex-wrap gap-1.5 max-h-[84px] overflow-y-auto">
                {tourStep === null && (
                  <button
                    onClick={triggerRecruiterTour}
                    className="font-mono text-[10px] font-bold border border-ink px-2 py-1 rounded bg-ink text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-ink transition-colors flex items-center focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    ⚡ 30s Recruiter Tour
                  </button>
                )}
                {["Projects", "Experience", "Skills", "Contact"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSubmit(undefined, chip)}
                    className="font-mono text-[10px] border border-ink px-2 py-1 rounded hover:bg-ink hover:text-[#FAF8F5] transition-colors bg-[#FCFBF9] text-ink focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={(e) => handleSubmit(e)} className="border-t-2 border-ink flex items-stretch bg-paper">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Sidekick about Yash..."
                  className="flex-1 px-4 py-3 text-sm focus:outline-none font-sans text-ink bg-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="px-4 border-l border-ink text-ink hover:bg-ink hover:text-[#FAF8F5] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-ink"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Footer info & utility label */}
              <div className="bg-[#FCFBF9] px-3 py-1.5 border-t border-ink flex items-center justify-between text-[10px] font-mono text-gray-500">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nextMute = !isMuted;
                      setIsMuted(nextMute);
                      sessionStorage.setItem("sidekick_comments_muted", nextMute ? "true" : "false");
                    }}
                    className="hover:underline font-bold text-ink/70"
                    aria-label={isMuted ? "Unmute speech bubbles" : "Mute speech bubbles"}
                  >
                    {isMuted ? "🔇 Unmute Comments" : "🔊 Mute Comments"}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setIsDismissed(true);
                    sessionStorage.setItem("sidekick_hidden_session", "true");
                  }}
                  className="hover:underline text-red-500 font-bold cursor-pointer"
                  aria-label="Hide companion for this session"
                >
                  Hide Sidekick
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Robot Interactive Rig Component */}
        <div className="relative flex items-center justify-center">
          {/* Notification Badge */}
          {notificationCount > 0 && !isOpen && (
            <div className="absolute top-0 right-0 z-10 w-5 h-5 bg-ink border border-[#FAF8F5] text-[#FAF8F5] rounded-full flex items-center justify-center font-mono text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] animate-bounce">
              {notificationCount}
            </div>
          )}

          {/* Collapsible Chat Button (when closed) */}
          <button
            onClick={isOpen ? handleClose : handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                isOpen ? handleClose() : handleOpen();
              }
            }}
            className="group flex flex-col items-center focus:outline-none select-none relative focus-visible:ring-2 focus-visible:ring-ink rounded-full p-1"
            aria-label={isOpen ? "Close Portfolio Companion" : "Open Portfolio Companion"}
            tabIndex={0}
          >
            {/* 2D Vector Layered Robot Character */}
            <motion.div
              variants={containerVariants}
              animate={reducedMotion ? "idle" : sidekickState}
              className="w-[74px] h-[92px] md:w-[84px] md:h-[102px] flex items-center justify-center relative cursor-pointer"
            >
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full overflow-visible drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_4px_10px_rgba(51,209,255,0.25)] transition-all duration-300"
              >
                {/* 1. Body & Legs Base Shadow */}
                <ellipse
                  cx="50"
                  cy="114"
                  rx={reducedMotion ? "18" : sidekickState === "sleepy" || sidekickState === "bored" ? "14" : "16"}
                  ry="3.5"
                  className="fill-ink opacity-[0.15] transition-all duration-300"
                  style={{
                    transformOrigin: "50px 114px",
                    transform: reducedMotion ? "none" : `scale(${sidekickState === "happy" || sidekickState === "hello" ? 0.8 : 1})`,
                  }}
                />

                {/* 2. Legs / Hover Thruster Core */}
                <path d="M42,90 L42,106" stroke="currentColor" className="text-ink" strokeWidth="3" />
                <path d="M58,90 L58,106" stroke="currentColor" className="text-ink" strokeWidth="3" />
                
                {/* Thruster flame base if excited or celebrating */}
                {(sidekickState === "excited" || sidekickState === "hello") && (
                  <path d="M45,106 L50,118 L55,106 Z" fill="#33D1FF" className="animate-pulse" />
                )}

                {/* 3. Arms */}
                {/* Left Arm: Points to left if pointing, or waving with anticipation & drag */}
                <motion.g
                  animate={getLeftArmAnimation()}
                  style={{ transformOrigin: "28px 65px" }}
                >
                  {/* Arm path */}
                  <path
                    d="M28,65 C16,65 14,80 18,85"
                    stroke="currentColor"
                    className="text-ink"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="18" cy="85" r="3.5" fill="currentColor" className="text-ink" />
                </motion.g>

                {/* Right Arm: Normal, pointing, or celebrating with drag & anticipation */}
                <motion.g
                  animate={getRightArmAnimation()}
                  style={{ transformOrigin: "72px 65px" }}
                >
                  <path
                    d="M72,65 C84,65 86,80 82,85"
                    stroke="currentColor"
                    className="text-ink"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="82" cy="85" r="3.5" fill="currentColor" className="text-ink" />
                </motion.g>

                {/* 4. Torso / Main Body Chassis with squash and stretch */}
                <motion.rect
                  x="28"
                  y="52"
                  width="44"
                  height="42"
                  rx="10"
                  stroke="currentColor"
                  className="text-ink fill-paper"
                  strokeWidth="3.5"
                  animate={getTorsoAnimation()}
                  style={{ transformOrigin: "50px 94px" }}
                />
                {/* Decorative retro stripes on body */}
                <line x1="36" y1="80" x2="64" y2="80" stroke="currentColor" className="text-ink" strokeWidth="2" />
                <line x1="36" y1="84" x2="52" y2="84" stroke="currentColor" className="text-ink" strokeWidth="2" />

                {/* 5. Head Rig */}
                <motion.g
                  animate={getHeadAnimation()}
                  style={{ transformOrigin: "50px 52px" }}
                >
                  {/* Neck */}
                  <rect
                    x="45"
                    y="46"
                    width="10"
                    height="8"
                    stroke="currentColor"
                    className="text-ink fill-paper"
                    strokeWidth="3"
                  />

                  {/* Antenna with secondary wobble motion */}
                  <motion.g
                    animate={getAntennaAnimation()}
                    style={{ transformOrigin: "50px 20px" }}
                  >
                    <motion.g
                      animate={reducedMotion ? {} : antennaBounce}
                      transition={
                        isAntennaBouncing
                          ? { type: "spring", stiffness: 350, damping: 10 }
                          : { type: "spring", stiffness: 80, damping: 15 }
                      }
                      style={{ transformOrigin: "50px 20px" }}
                    >
                      <line x1="50" y1="20" x2="50" y2="12" stroke="currentColor" className="text-ink" strokeWidth="2.5" />
                      <motion.circle
                        cx="50"
                        cy="10"
                        r="4"
                        fill={
                          sidekickState === "thinking"
                            ? "#FFAA33"
                            : sidekickState === "sleepy"
                            ? "#666666"
                            : sidekickState === "bored"
                            ? "#94A3B8"
                            : "#33D1FF"
                        }
                        animate={reducedMotion ? {} : { opacity: [1, 0.4, 1] }}
                        transition={{ duration: sidekickState === "thinking" ? 0.3 : 1.5, repeat: Infinity }}
                        className="drop-shadow-[0_0_6px_rgba(51,209,255,1)]"
                      />
                    </motion.g>
                  </motion.g>

                  {/* Robot Head */}
                  <rect
                    x="25"
                    y="18"
                    width="50"
                    height="32"
                    rx="12"
                    stroke="currentColor"
                    className="text-ink fill-paper"
                    strokeWidth="3.5"
                  />

                  {/* Digital Dark Screen Overlay */}
                  <rect x="31" y="23" width="38" height="22" rx="6" fill="#1A2333" />

                  {/* Glowing Eyes */}
                  {isBlinking && sidekickState !== "sleepy" && sidekickState !== "bored" ? (
                    // Closed eyes during blinking (natural, irregular)
                    <>
                      <line x1="36" y1="31" x2="44" y2="31" stroke="#33D1FF" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_3px_#33D1FF]" />
                      <line x1="56" y1="31" x2="64" y2="31" stroke="#33D1FF" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_3px_#33D1FF]" />
                    </>
                  ) : sidekickState === "sleepy" ? (
                    // Closed/narrow squinting eyes
                    <>
                      <line x1="36" y1="31" x2="44" y2="31" stroke="#33D1FF" strokeWidth="3" strokeLinecap="round" />
                      <line x1="56" y1="31" x2="64" y2="31" stroke="#33D1FF" strokeWidth="3" strokeLinecap="round" />
                    </>
                  ) : sidekickState === "bored" ? (
                    // Half-lidded bored eyes with lazy gaze
                    <>
                      <rect x="35" y="27" width="10" height="8" rx="2" fill="#0E1624" />
                      <circle cx="39" cy="32" r="2.5" fill="#33D1FF" className="drop-shadow-[0_0_2px_#33D1FF]" />
                      <line x1="34" y1="28.5" x2="46" y2="28.5" stroke="#1A2333" strokeWidth="3" strokeLinecap="round" />

                      <rect x="55" y="27" width="10" height="8" rx="2" fill="#0E1624" />
                      <circle cx="59" cy="32" r="2.5" fill="#33D1FF" className="drop-shadow-[0_0_2px_#33D1FF]" />
                      <line x1="54" y1="28.5" x2="66" y2="28.5" stroke="#1A2333" strokeWidth="3" strokeLinecap="round" />
                    </>
                  ) : sidekickState === "happy" || sidekickState === "excited" || sidekickState === "hello" || sidekickState === "waving" || sidekickState === "wave" ? (
                    // Happy inverted curve eyes (^^)
                    <>
                      <path
                        d="M36,33 C38,29 42,29 44,33"
                        stroke="#33D1FF"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_3px_#33D1FF]"
                      />
                      <path
                        d="M56,33 C58,29 62,29 64,33"
                        stroke="#33D1FF"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_3px_#33D1FF]"
                      />
                    </>
                  ) : sidekickState === "cheeky" ? (
                    // One wink eye, one normal eye
                    <>
                      <circle cx="40" cy="31" r="4.5" fill="#33D1FF" className="drop-shadow-[0_0_3px_#33D1FF]" />
                      <line x1="56" y1="31" x2="64" y2="31" stroke="#33D1FF" strokeWidth="3.5" strokeLinecap="round" />
                    </>
                  ) : sidekickState === "curious" || isHovered ? (
                    // Widened open glowing eyes when curious/hovered
                    <>
                      <circle cx="39.5" cy="31" r="4.5" fill="#33D1FF" className="drop-shadow-[0_0_5px_#33D1FF]" />
                      <circle cx="59.5" cy="31" r="4.5" fill="#33D1FF" className="drop-shadow-[0_0_5px_#33D1FF]" />
                    </>
                  ) : (
                    // Standard eyes with pupils following mouse pointer + micro-saccades
                    <>
                      {/* Left Eye Sockets */}
                      <rect x="35" y="27" width="10" height="8" rx="2" fill="#0E1624" />
                      {/* Left Pupil */}
                      <circle
                        cx={39.5 + mousePos.x + saccadeOffset.x}
                        cy={31 + mousePos.y + saccadeOffset.y}
                        r="3"
                        fill="#33D1FF"
                        className="drop-shadow-[0_0_3px_#33D1FF]"
                      />

                      {/* Right Eye Sockets */}
                      <rect x="55" y="27" width="10" height="8" rx="2" fill="#0E1624" />
                      {/* Right Pupil */}
                      <circle
                        cx={59.5 + mousePos.x + saccadeOffset.x}
                        cy={31 + mousePos.y + saccadeOffset.y}
                        r="3"
                        fill="#33D1FF"
                        className="drop-shadow-[0_0_3px_#33D1FF]"
                      />
                    </>
                  )}

                  {/* Electronic Digital Mouth Indicator */}
                  {sidekickState === "speaking" ? (
                    // Oscillating sine-wave digital voice waveform
                    <path
                      d="M42,40 Q45,36 48,40 T54,40 T58,40"
                      stroke="#33D1FF"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      className="animate-pulse drop-shadow-[0_0_3px_#33D1FF]"
                    />
                  ) : sidekickState === "bored" ? (
                    // Flat, bored unamused mouth line
                    <line x1="45" y1="41" x2="55" y2="41" stroke="#33D1FF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  ) : (
                    // Flat, happy small smile line
                    <line x1="44" y1="41" x2="56" y2="41" stroke="#33D1FF" strokeWidth="2.5" strokeLinecap="round" />
                  )}
                </motion.g>
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </div>
  );
}
