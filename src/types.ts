export interface ProjectSection {
  heading: string;
  body: string[];
  images?: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  subtitle: string;
  description: string;
  externalUrl?: string;
  heroImage: string;
  gallery: string[];
  techStack?: string[];
  sections: ProjectSection[];
}

export interface Service {
  title: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Thought {
  slug: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: string;
  content: Array<{
    type: "paragraph" | "heading" | "list";
    text: string | string[];
  }>;
}

export interface PortfolioContent {
  identity: {
    name: string;
    role: string;
    professionalLabel: string;
    since: string;
    copyright: string;
    email: string;
    location: string;
    availability: string;
    links: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
  about: {
    greeting: string;
    shortBio: string;
    longBio: string[];
    cta: string;
  };
  services: Service[];
  projects: Project[];
  experience: {
    company: string;
    role: string;
    dates: string;
    location?: string;
    summary?: string;
    bullets: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    dates: string;
  }[];
  testimonials: {
    quote: string; // Used for skills/verified details
    author: string; // Used for Certificate Title
    role: string; // Used for Issuing Organization
    avatar?: string; // Optional image/icon url
    credentialId?: string; // Optional Verification ID
    verificationUrl?: string; // Optional Link to certificate
    date?: string; // Date earned
  }[];
  thoughts: Thought[];
}
