// LostSWE content model.
// Everything the site knows — fields, traits, roadmap phases, and the resource
// library — lives in this one file for now. The Oct 26 roadmap task
// ("feat(content): typed content schema") splits this into per-field files
// validated by zod; until then, the shapes below are the contract.

export type TraitId =
  | "visual"
  | "analytical"
  | "people"
  | "systems"
  | "creative"
  | "math";

export interface Trait {
  id: TraitId;
  label: string;
  description: string;
}

export const TRAITS: Trait[] = [
  { id: "visual", label: "Visual thinking", description: "You reason better with diagrams, layouts, and things you can see." },
  { id: "analytical", label: "Analytical", description: "You enjoy breaking a problem into parts and finding the pattern." },
  { id: "people", label: "People-facing", description: "You like work that involves explaining, teaching, or collaborating directly." },
  { id: "systems", label: "Systems thinking", description: "You like understanding how pieces of a large system fit together." },
  { id: "creative", label: "Creative", description: "You're drawn to building things that didn't exist before, with room for taste." },
  { id: "math", label: "Math-heavy", description: "You like work grounded in formal reasoning and quantitative rigor." },
];

export type FieldId =
  | "frontend"
  | "backend"
  | "data-science"
  | "ml-ai"
  | "security"
  | "embedded";

export interface RoadmapPhase {
  title: string;
  description: string;
  resourceIds: string[];
}

export interface Field {
  id: FieldId;
  name: string;
  tagline: string;
  description: string;
  traitWeights: Partial<Record<TraitId, number>>; // -2..2, used by the quiz scorer
  roadmap: [RoadmapPhase, RoadmapPhase, RoadmapPhase]; // beginner, intermediate, advanced
}

export const FIELDS: Field[] = [
  {
    id: "frontend",
    name: "Frontend Engineering",
    tagline: "Build what people actually touch.",
    description:
      "Frontend engineers turn designs and data into interfaces people use every day — balancing visual craft with the engineering behind state, performance, and accessibility.",
    traitWeights: { visual: 2, creative: 2, people: 1, analytical: 0, systems: 0, math: -1 },
    roadmap: [
      {
        title: "Foundations",
        description: "HTML, CSS, and JavaScript fundamentals; build three static pages from scratch.",
        resourceIds: ["mdn-web-docs", "cs50"],
      },
      {
        title: "Framework fluency",
        description: "Learn React or a comparable framework; build a small app with routing and state.",
        resourceIds: ["react-docs", "fullstackopen"],
      },
      {
        title: "Production depth",
        description: "Accessibility, performance budgets, testing, and a deployed portfolio project.",
        resourceIds: ["web-dev-google", "frontend-masters-free"],
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Engineering",
    tagline: "Make the thing that never goes down.",
    description:
      "Backend engineers design the APIs, data models, and infrastructure that frontend apps and other services depend on — reliability and correctness come first.",
    traitWeights: { systems: 2, analytical: 2, math: 1, visual: -1, people: -1, creative: 0 },
    roadmap: [
      {
        title: "Foundations",
        description: "Pick one language deeply (Python, Go, or Java); learn HTTP and REST basics.",
        resourceIds: ["cs50", "mdn-web-docs"],
      },
      {
        title: "Framework fluency",
        description: "Build a CRUD API with a real database; learn authentication and testing.",
        resourceIds: ["fullstackopen", "roadmap-backend"],
      },
      {
        title: "Production depth",
        description: "Caching, queues, observability, and a deployed service under real load.",
        resourceIds: ["designing-data-intensive-apps", "roadmap-backend"],
      },
    ],
  },
  {
    id: "data-science",
    name: "Data Science",
    tagline: "Find the signal in the noise.",
    description:
      "Data scientists turn raw data into decisions — statistics, visualization, and communication matter as much as code.",
    traitWeights: { analytical: 2, math: 2, systems: 0, visual: 1, people: 1, creative: -1 },
    roadmap: [
      {
        title: "Foundations",
        description: "Python, pandas, and statistics fundamentals; clean and explore a real dataset.",
        resourceIds: ["kaggle-learn", "cs50"],
      },
      {
        title: "Framework fluency",
        description: "Build an end-to-end analysis with visualization and a written conclusion.",
        resourceIds: ["kaggle-learn", "fast-ai"],
      },
      {
        title: "Production depth",
        description: "Experiment design, SQL at scale, and a portfolio case study with real stakes.",
        resourceIds: ["designing-data-intensive-apps", "kaggle-learn"],
      },
    ],
  },
  {
    id: "ml-ai",
    name: "Machine Learning",
    tagline: "Teach the computer to notice patterns.",
    description:
      "ML engineers build and ship models — this field rewards math comfort, systems thinking about data pipelines, and patience with experimentation.",
    traitWeights: { math: 2, analytical: 2, systems: 1, creative: 0, visual: 0, people: -1 },
    roadmap: [
      {
        title: "Foundations",
        description: "Linear algebra, probability, and Python; implement linear regression from scratch.",
        resourceIds: ["fast-ai", "cs50"],
      },
      {
        title: "Framework fluency",
        description: "PyTorch or TensorFlow basics; train and evaluate a model on a real dataset.",
        resourceIds: ["fast-ai", "kaggle-learn"],
      },
      {
        title: "Production depth",
        description: "Model serving, monitoring for drift, and a deployed inference endpoint.",
        resourceIds: ["designing-data-intensive-apps", "fast-ai"],
      },
    ],
  },
  {
    id: "security",
    name: "Security Engineering",
    tagline: "Think like the person trying to break it.",
    description:
      "Security engineers find and fix the gaps everyone else missed — deep systems knowledge plus an adversarial mindset.",
    traitWeights: { systems: 2, analytical: 2, math: 0, creative: 1, visual: -1, people: 0 },
    roadmap: [
      {
        title: "Foundations",
        description: "Networking and OS fundamentals; complete a beginner CTF.",
        resourceIds: ["overthewire", "cs50"],
      },
      {
        title: "Framework fluency",
        description: "Web app security (OWASP Top 10), and a vulnerable-app practice lab.",
        resourceIds: ["owasp-top-ten", "overthewire"],
      },
      {
        title: "Production depth",
        description: "Threat modeling, a real bug bounty submission, and secure-by-default code review.",
        resourceIds: ["owasp-top-ten", "roadmap-security"],
      },
    ],
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    tagline: "Code that runs on real hardware.",
    description:
      "Embedded engineers work close to the metal — resource-constrained devices, real-time constraints, and C or Rust.",
    traitWeights: { systems: 2, math: 1, analytical: 1, visual: -1, people: -1, creative: 0 },
    roadmap: [
      {
        title: "Foundations",
        description: "C fundamentals and basic electronics; blink an LED on a real microcontroller.",
        resourceIds: ["cs50", "embedded-rust-book"],
      },
      {
        title: "Framework fluency",
        description: "Interrupts, timers, and communication protocols (I2C, SPI, UART) on a dev board.",
        resourceIds: ["embedded-rust-book", "roadmap-backend"],
      },
      {
        title: "Production depth",
        description: "RTOS basics, power constraints, and a complete sensor-to-cloud project.",
        resourceIds: ["embedded-rust-book", "designing-data-intensive-apps"],
      },
    ],
  },
];

export interface Resource {
  id: string;
  title: string;
  url: string;
  free: boolean;
  lastReviewed: string; // ISO date — filled in during the content pass (Nov 4)
}

export const RESOURCES: Resource[] = [
  { id: "cs50", title: "CS50: Introduction to Computer Science (Harvard/edX)", url: "https://cs50.harvard.edu/x/", free: true, lastReviewed: "2026-10-01" },
  { id: "mdn-web-docs", title: "MDN Web Docs", url: "https://developer.mozilla.org/", free: true, lastReviewed: "2026-10-01" },
  { id: "react-docs", title: "React — Official Documentation", url: "https://react.dev/", free: true, lastReviewed: "2026-10-01" },
  { id: "fullstackopen", title: "Full Stack Open (University of Helsinki)", url: "https://fullstackopen.com/en/", free: true, lastReviewed: "2026-10-01" },
  { id: "web-dev-google", title: "web.dev (Google)", url: "https://web.dev/", free: true, lastReviewed: "2026-10-01" },
  { id: "frontend-masters-free", title: "Frontend Masters — Free Courses", url: "https://frontendmasters.com/learn/free/", free: true, lastReviewed: "2026-10-01" },
  { id: "roadmap-backend", title: "roadmap.sh — Backend Roadmap", url: "https://roadmap.sh/backend", free: true, lastReviewed: "2026-10-01" },
  { id: "designing-data-intensive-apps", title: "Designing Data-Intensive Applications (reference text)", url: "https://dataintensive.net/", free: false, lastReviewed: "2026-10-01" },
  { id: "kaggle-learn", title: "Kaggle Learn", url: "https://www.kaggle.com/learn", free: true, lastReviewed: "2026-10-01" },
  { id: "fast-ai", title: "fast.ai — Practical Deep Learning", url: "https://course.fast.ai/", free: true, lastReviewed: "2026-10-01" },
  { id: "overthewire", title: "OverTheWire — Wargames", url: "https://overthewire.org/wargames/", free: true, lastReviewed: "2026-10-01" },
  { id: "owasp-top-ten", title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/", free: true, lastReviewed: "2026-10-01" },
  { id: "roadmap-security", title: "roadmap.sh — Cyber Security Roadmap", url: "https://roadmap.sh/cyber-security", free: true, lastReviewed: "2026-10-01" },
  { id: "embedded-rust-book", title: "The Embedded Rust Book", url: "https://docs.rust-embedded.org/book/", free: true, lastReviewed: "2026-10-01" },
];

export function getField(id: string): Field | undefined {
  return FIELDS.find((f) => f.id === id);
}

export function getResourcesByIds(ids: string[]): Resource[] {
  return ids
    .map((id) => RESOURCES.find((r) => r.id === id))
    .filter((r): r is Resource => Boolean(r));
}
