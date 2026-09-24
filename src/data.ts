import { PortfolioContent } from "./types";
// @ts-expect-error - Vite supports importing images directly
import portraitDark from "./assets/images/regenerated_image_1783807737742.jpg";
// @ts-expect-error - Vite supports importing images directly
import portraitRed from "./assets/images/regenerated_image_1783808761243.jpg";

export const portfolioContent: PortfolioContent = {
  identity: {
    name: "Yash Srivastava",
    role: "AI ENGINEER",
    professionalLabel: "AI Engineer | Agentic AI",
    since: "CREATING SINCE 2024",
    copyright: "2026",
    email: "yashxbbd@gmail.com",
    location: "Lucknow, India",
    availability: "Remote",
    links: {
      linkedin: "https://www.linkedin.com/in/yash-srivastava-bbd/",
      github: "https://github.com/yashsrivastava0",
      twitter: "https://x.com/YashDeveloper_",
    },
  },
  about: {
    greeting: "Hey!",
    shortBio: "AI Engineer focused on production Agentic AI and GenAI systems, building reliable multi-agent orchestration, context engineering, asynchronous execution runtimes, and cloud deployments.",
    longBio: [
      "I am an AI Engineer with 1 year of experience building production Agentic AI and GenAI systems across multi-agent orchestration, context engineering, memory, RAG, tool-using agents, MCP, FastAPI/Python backends, asynchronous workers, PostgreSQL, Docker, and AWS.",
      "I build reliable AI products end to end — from system architecture, context engineering, and model/tool integration to validation, observability, deployment, and production recovery — including customer-facing chatbots, voice agents, and multimodal workflows."
    ],
    cta: "Let's Connect",
  },
  services: [
    {
      title: "Agentic AI Systems",
      tags: ["Multi-Agent Orchestration", "DAG Scheduling", "Human Approval Gates", "Bounded Retries"]
    },
    {
      title: "Context Engineering",
      tags: ["Context Compression (-33%)", "Dynamic Assembly", "Selective Handoffs", "Claim Provenance"]
    },
    {
      title: "AI Backend Engineering",
      tags: ["Python 3.13", "FastAPI", "Pydantic v2", "SQLAlchemy", "Asyncpg", "Durable Workers"]
    },
    {
      title: "Retrieval & RAG Systems",
      tags: ["Semantic Search", "FAISS", "ChromaDB", "Recursive Chunking", "Fact Grounding"]
    },
    {
      title: "Tool & MCP Integrations",
      tags: ["MCP-Compatible Contracts", "Tool Calling", "Playwright Automation", "Twilio & VAPI"]
    },
    {
      title: "Cloud & Reliability",
      tags: ["AWS & Azure", "Docker Compose", "Caddy", "CI/CD Actions", "PostgreSQL Checkpoints"]
    }
  ],
  projects: [
    {
      slug: "oryxenai",
      title: "OryxenAI",
      category: "Autonomous AI Portfolio Platform",
      year: "2026",
      subtitle: "Five-stage multi-agent platform transforming resumes into verified, live-preview portfolios.",
      description: "OryxenAI is an autonomous AI portfolio generation platform that transforms resumes, project history, and user inputs into a personalized, fact-grounded portfolio through a five-stage multi-agent workflow covering discovery, content architecture, visual direction, generation, verification, and live preview.",
      externalUrl: "https://app.oryxenai.me/",
      heroImage: "/oryxenai-hero.svg",
      gallery: [
        "/oryxenai-architecture.svg",
        "/oryxenai-preview.svg"
      ],
      techStack: [
        "Python 3.13",
        "FastAPI",
        "Pydantic v2",
        "SQLAlchemy",
        "PostgreSQL",
        "Alembic",
        "asyncpg",
        "Supabase Auth/JWT",
        "Docker Compose",
        "Azure",
        "Caddy",
        "Playwright",
        "GitHub Actions"
      ],
      sections: [
        {
          heading: "Five-Stage Multi-Agent Workflow",
          body: [
            "Architected and built OryxenAI to transform resumes, project histories, and unstructured user inputs into personalized, fact-grounded portfolio applications.",
            "The generation pipeline executes across five distinct stages: Discovery (deep resume ingestion & skill taxonomy), Content Architecture (narrative framing & claim provenance), Visual Direction (custom design tokens & layout guidelines), Generation Engine (modular React/Tailwind code synthesis), and Automated Verification (Playwright headless-browser sanity & syntax checks).",
            "Each stage is executed by specialized agents with strict schema-enforced JSON contracts, human-in-the-loop approval gates, and bounded retries to prevent hallucinated achievements and maintain 100% factual accuracy."
          ]
        },
        {
          heading: "Agentic AI, Context Engineering & LLM Architecture",
          body: [
            "Designed the agentic AI and LLM systems behind the platform, including specialized agents, structured outputs, human approval gates, context compression and selective handoffs, claim provenance, prompt and context optimization, model routing and caching, and bounded execution to keep generation reliable, efficient, and grounded.",
            "Implemented dynamic context assembly and priority-based compression to selectively prune token payloads across long multi-turn sessions, reducing prompt overhead by over 33% while retaining strict compliance, authentication, and layout constraints."
          ]
        },
        {
          heading: "Production Execution Layer & Durable PostgreSQL Workers",
          body: [
            "Built the production execution layer end to end, including asynchronous job orchestration, durable PostgreSQL workers, concurrency control, checkpoint-based recovery, automated code and browser verification, authentication, CI/CD, containerized services, and cloud deployment.",
            "Integrated headless Playwright instances for automated visual smoke tests and syntax verification before staging live previews via Caddy reverse proxies on Azure."
          ]
        }
      ]
    },
    {
      slug: "medifindx",
      title: "Medifindx",
      category: "Agentic AI Healthcare Platform",
      year: "2025",
      subtitle: "A nine-agent healthcare AI platform supporting voice, text, OCR, and retrieval.",
      description: "Medifindx is a multimodal healthcare AI platform built around a nine-agent architecture. It combines voice, text, OCR, retrieval, pharmacy lookup, medicine alternatives, dosing support, symptom checks, and healthcare information workflows inside a structured FastAPI and Gradio application.",
      externalUrl: "https://huggingface.co/spaces/PromptYASH/Medifindx",
      heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=750",
      gallery: [
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600&h=450",
        "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600&h=450"
      ],
      techStack: [
        "LangChain",
        "LangGraph",
        "Agentic RAG",
        "FastAPI",
        "FAISS",
        "Gradio",
        "Whisper",
        "Python"
      ],
      sections: [
        {
          heading: "Multi-Agent Orchestration",
          body: [
            "Medifindx coordinates nine specialized AI agents, each dedicated to a distinct clinical support or pharmacy workflow. By routing queries dynamically based on text, voice, or image context, the platform ensures highly reliable and structured outputs.",
            "The backend is fully asynchronous, built in Python and FastAPI to support parallel execution and microsecond-level orchestration latency."
          ]
        },
        {
          heading: "Visual, Voice & Text Modalities",
          body: [
            "Patients can interact via speech (integrating whisper models) or upload clinical documents and prescriptions for OCR-based medicine parsing.",
            "The platform automatically extracts active ingredients, suggests verified therapeutic alternatives, and runs a structured drug interaction check against structured health guidelines."
          ]
        }
      ]
    },
    {
      slug: "parserai-yashai",
      title: "ParserAI + YashAI",
      category: "RAG Document Intelligence",
      year: "2025",
      subtitle: "RAG-based document assistants combining multi-format ingestion and job-fit workflows.",
      description: "ParserAI and YashAI are RAG-based document intelligence assistants designed for multi-format ingestion, chunking, Vector Database retrieval, conversational memory, document querying, resume analysis, job-fit evaluation, cover-letter generation, and multi-turn document conversations.",
      externalUrl: "https://huggingface.co/spaces/PromptYASH/ParserAI",
      heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=750",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=450"
      ],
      techStack: [
        "LangChain",
        "Gemini 1.5 Flash",
        "FAISS",
        "ChromaDB",
        "PyPDF2",
        "BeautifulSoup4",
        "Gradio"
      ],
      sections: [
        {
          heading: "Deep Parsing & Semantic Chunking",
          body: [
            "ParserAI focuses on structural file ingestion—handling PDF, DOCX, and web URLs with strict chunking strategies that preserve context boundaries across complex multi-page tables and academic reports.",
            "Vector indexing is managed with FAISS, enabling low-latency semantic lookup and dense vector retrievals."
          ]
        },
        {
          heading: "Conversational Intelligence & Job-Fit",
          body: [
            "YashAI layered onto this retrieval engine, adding customized conversational memory, semantic candidate profiling, resume scoring, job-fit correlation, and automated cover-letter draft generation.",
            "This system models recruitment-specific intent to extract nuanced professional matching scores beyond basic keyword comparison."
          ]
        }
      ]
    },
    {
      slug: "yashoda",
      title: "YASHODA",
      category: "Futuristic Full-Stack Platform",
      year: "2024",
      subtitle: "Full-stack e-commerce platform with protected REST APIs and role-based authentication.",
      description: "Full-stack e-commerce storefront where users can browse, search, filter and purchase products, with role-based JWT authentication, protected Node.js REST APIs, MongoDB persistence, responsive dark-mode UI and animated navigation.",
      externalUrl: "https://github.com/yashsrivastava0",
      heroImage: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200&h=750",
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=450"
      ],
      techStack: [
        "Next.js 14",
        "TypeScript",
        "Node.js",
        "MongoDB Atlas",
        "Tailwind CSS",
        "JWT"
      ],
      sections: [
        {
          heading: "Scalable Full-Stack Architecture",
          body: [
            "Engineered with Next.js 14 App Router, TypeScript, and server components for fast rendering and optimized client hydration.",
            "Implemented role-based JWT access controls, protected REST APIs, and MongoDB schema design for persistent user carts and inventory management."
          ]
        }
      ]
    }
  ],
  experience: [
    {
      company: "Xpression Technologies",
      role: "Founding AI Engineer",
      dates: "Oct 2025 – Present",
      location: "Hybrid",
      summary: "Building a production AI-powered SDLC platform that turns a user's product idea into a deployable full-stack application through multi-agent workflows.",
      bullets: [
        "**Architected the core platform end to end**, taking applications from product requirements and technical design through AI-driven code generation, automated validation, sandboxed execution, and deployment as a single coordinated workflow.",
        "**Built the multi-agent orchestration runtime** for long-running workflows, including dependency-graph scheduling, parallel and sequential execution, asynchronous jobs, persistent state, approval checkpoints, bounded retries, and recovery from partial failures; replacing the earlier linear execution model was estimated to reduce end-to-end workflow time by **30–40%**.",
        "**Designed a relationship-aware context engineering layer** that assembles requirements, dependencies, prior decisions, and generated artifacts relevant to each model call rather than relying only on semantic retrieval, reducing downstream code-generation errors by **73% in production testing** versus the previous RAG-based approach.",
        "**Built long-horizon context and workflow memory** using dynamic context assembly, priority-based compression, and cross-call continuity, reducing representative context from **~95K to ~63.4K tokens (~33%)** while preserving critical authentication, validation, permission, and compliance constraints; also designed schema-constrained tool and **MCP** interfaces for agent actions.",
        "**Engineered the production backend and reliability layer** across REST APIs, PostgreSQL-backed workers, real-time event streaming, artifact versioning, structured-output validation, quality gates, model/provider fallback, and isolated container testing; owned architecture-to-production delivery on a **6-person startup team**, worked directly with founders on product and system-design decisions, and contributed to **engineering hiring through technical interviews and candidate evaluation**."
      ]
    },
    {
      company: "JUTEQ Inc",
      role: "AI Engineer",
      dates: "Jul 2024 – Oct 2024",
      location: "Remote",
      bullets: [
        "Owned client-facing AI delivery by working directly with stakeholders to understand dealership and automotive workflows, convert requirements into technical designs and iterate on production behavior.",
        "Built and deployed a customer-service AI chatbot for AutoTrader Canada, enabling conversational support and workflow automation for automotive users.",
        "Developed VAPI voice agents for dealership appointment booking with Xtime/DealerFX integrations, plus Playwright/headless-browser automation for scheduling, data extraction and conversational workflows.",
        "Implemented production authentication automation including 2FA/MFA flows with Twilio webhooks, improving reliability across browser-based integrations."
      ]
    },
    {
      company: "Indian Institute of Technology, Mandi",
      role: "Backend Developer",
      dates: "Jan 2024 – Jun 2024",
      location: "Remote",
      bullets: [
        "Backend Developer Intern and Researcher on the HIMCOSTE-sponsored Smart Blood, Vaccine & Medicine Monitoring System, including sensor-data architecture and cloud integration.",
        "Built a Node.js backend for real-time Arduino/ESP data with Firestore storage, dashboard APIs, REST endpoints, validation and backend optimization for real-world deployment."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "JavaScript", "TypeScript"]
    },
    {
      category: "AI / Agentic Systems",
      items: [
        "LangChain",
        "LangGraph",
        "AutoGen",
        "CrewAI",
        "MCP",
        "RAG",
        "Context Engineering",
        "Multi-Agent Orchestration",
        "Hugging Face Transformers",
        "Whisper",
        "Gemini",
        "Structured Outputs"
      ]
    },
    {
      category: "Backend & APIs",
      items: [
        "FastAPI",
        "Flask",
        "Pydantic v2",
        "asyncio",
        "SQLAlchemy",
        "Alembic",
        "asyncpg",
        "REST APIs",
        "OpenAPI",
        "Webhooks"
      ]
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (EC2, Lambda, S3, SQS, Step Functions, RDS)",
        "Docker",
        "Docker Compose",
        "Azure",
        "Caddy",
        "GitHub Actions",
        "Linux"
      ]
    },
    {
      category: "Databases & Storage",
      items: [
        "PostgreSQL",
        "Redis",
        "MongoDB",
        "Firestore",
        "FAISS",
        "ChromaDB",
        "Vector Databases"
      ]
    },
    {
      category: "Testing & Observability",
      items: [
        "pytest",
        "Playwright",
        "Postman",
        "Datadog",
        "CloudWatch"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech. - Information Technology",
      institution: "Dr. A. P. J. Abdul Kalam Technical University (AKTU), Lucknow, India",
      dates: "2021 – 2025"
    },
    {
      degree: "CBSE - Intermediate (62.8%)",
      institution: "St. Xavier's Senior Secondary School, Basti, India",
      dates: "2019 – 2021"
    }
  ],
  testimonials: [
    {
      author: "Deep Learning Specialization",
      role: "DeepLearning.AI",
      quote: "Verified mastery of neural network architectures, hyperparameter tuning, convolutional networks (CNNs), and sequence models (RNNs/LSTMs) for multi-dimensional deep learning solutions.",
      date: "2025",
      credentialId: "DLS-YASH-783A9",
      verificationUrl: "https://coursera.org/verify/specialization/deeplearning"
    },
    {
      author: "Generative AI with Large Language Models",
      role: "DeepLearning.AI & AWS",
      quote: "In-depth specialization on the LLM lifecycle: pre-training, parameter-efficient fine-tuning (PEFT/LoRA), reinforcement learning from human feedback (RLHF), and evaluation metrics.",
      date: "2025",
      credentialId: "GENAI-LLM-552C2",
      verificationUrl: "https://coursera.org/verify/generative-ai-llms"
    },
    {
      author: "LangChain & LangGraph for Agentic AI",
      role: "DeepLearning.AI",
      quote: "Advanced implementation of autonomous multi-agent state machines, structured JSON validation loops, dynamic tools, and custom execution control with memory persistence.",
      date: "2025",
      credentialId: "AGENTIC-AI-883F1",
      verificationUrl: "https://www.deeplearning.ai/"
    },
    {
      author: "AI Developer Professional Certificate",
      role: "Google Cloud",
      quote: "Deploying enterprise-ready cognitive workflows, semantic search indexes, vector retrieval databases, fine-tuning cloud-hosted foundation models, and custom model endpoints.",
      date: "2025",
      credentialId: "GCP-AID-901D4",
      verificationUrl: "https://cloud.google.com/certification"
    }
  ],
  thoughts: [
    {
      slug: "agent-orchestration-vs-prompts",
      date: "May 5, 2025",
      title: "Why Agent Orchestration is More Than Adding More Agents",
      description: "Why multi-step coordination, state machines, and controlled execution paths are the real foundations of reliable agentic AI systems.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=450",
      category: "Agentic AI",
      content: [
        {
          type: "heading",
          text: "The Logic of Coordination"
        },
        {
          type: "paragraph",
          text: "In the initial waves of AI development, complex prompts were touted as the primary mechanism to elicit intelligent behavior from LLMs. However, as developers try to deploy models into production systems, the limits of prompting alone become starkly apparent."
        },
        {
          type: "paragraph",
          text: "True system reliability comes from orchestration—wrapping model calls in deterministic state-management loops, applying prompt context compression, verifying outputs against strict JSON schemas, and orchestrating multiple specialized agents to solve narrow, well-defined parts of a workflow."
        }
      ]
    },
    {
      slug: "context-engineering-long-running",
      date: "Jun 16, 2025",
      title: "Context Engineering for Long-Running AI Workflows",
      description: "A deep dive into template design, compression, schema validation, and retry gates for enterprise agent execution pipelines.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600&h=450",
      category: "Context Engineering",
      content: [
        {
          type: "heading",
          text: "Managing the Context Window"
        },
        {
          type: "paragraph",
          text: "For long-running workflows, context window limits and token costs represent critical design bottlenecks. Simply feeding raw message histories or massive document corpora to an agent leads to high latency, increased costs, and severe performance degradation (known as 'lost in the middle')."
        },
        {
          type: "paragraph",
          text: "Context Engineering addresses this by compressing prompt layers, dynamically summarizing previous loop turns, prioritizing vector retrievals based on structural relevance, and utilizing schema-guided outputs to enforce crisp, high-value executions."
        }
      ]
    }
  ]
};

export const PORTRAIT_DARK_URL = portraitDark;
export const PORTRAIT_RED_URL = portraitRed;
