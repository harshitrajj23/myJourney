export interface TechLayer {
  layer: string;
  technologies: string;
}

export interface EliteProject {
  id: string;
  title: string;
  category: "ai-ml" | "healthcare" | "platform" | "hackathon";
  tagline: string;
  badges: string[];
  description: string;
  highlights?: string[];
  repo?: string;
  link?: string;
  techLayers?: TechLayer[];
  technologies: string[];
  isFeatured?: boolean;
  award?: string;
  accent: {
    primary: string;
    secondary: string;
    border: string;
    bgGlow: string;
    text: string;
    pill: string;
  };
}

export const eliteProjects: EliteProject[] = [
  {
    id: "medi-ai",
    title: "Medi AI",
    category: "healthcare",
    tagline: "Autonomous Multimodal Clinical Diagnostics & Triage Engine",
    award: "Top 30 / 5,000+ Teams Worldwide",
    badges: ["Top 30 Worldwide", "Solo Engineered", "International Hackathon"],
    description:
      "A next-generation multimodal clinical intelligence system built solo from ground up, selected into top 30 out of 5,000 global submissions. Integrates specialized biomedical LLMs, vision-language CLIP embeddings, vector similarity search, and automated cross-platform speech interfaces.",
    highlights: [
      "BioClinicalBERT & BiomedNLP semantic clinical reasoning",
      "Multimodal medical imaging ingestion via OpenAI CLIP ViT-B/32",
      "Persistent ChromaDB vector search with cosine similarity indexing",
      "Full mobile native packaging via Capacitor for iOS & Android",
      "Automated clinic dispatch & emergency Geoapify routing integration",
    ],
    link: "https://medi-ai-blush.vercel.app/",
    repo: "https://github.com/harshitrajj23/MediAI",
    isFeatured: true,
    techLayers: [
      {
        layer: "Frontend & UI",
        technologies: "React 19, Vite 8, Tailwind CSS, Framer Motion, Three.js + R3F, Lucide Icons",
      },
      {
        layer: "Mobile Runtime",
        technologies: "Capacitor (Android + iOS), Web Speech API, Speech Synthesis API",
      },
      {
        layer: "Backend Architecture",
        technologies: "Python 3.9, FastAPI, Uvicorn, Pydantic V2",
      },
      {
        layer: "AI / ML Models",
        technologies: "BioClinicalBERT, BiomedNLP-BiomedBERT, BAAI/BGE-Large-EN-v1.5, Mistral Large, OpenAI CLIP ViT-B/32, Whisper Large v3",
      },
      {
        layer: "Vector Database",
        technologies: "ChromaDB (Persistent store) with Cosine Similarity Retrieval",
      },
      {
        layer: "Cloud & Security",
        technologies: "Supabase (Auth, PostgreSQL, Row-Level Security, Object Storage)",
      },
      {
        layer: "External Integrations",
        technologies: "Geoapify Places & Routing API, Telegram Bot API",
      },
    ],
    technologies: [
      "React 19",
      "FastAPI",
      "BioClinicalBERT",
      "ChromaDB",
      "Mistral Large",
      "CLIP ViT-B/32",
      "Supabase",
      "Capacitor",
    ],
    accent: {
      primary: "#10b981", // Emerald
      secondary: "#06b6d4", // Cyan
      border: "border-emerald-500/40",
      bgGlow: "from-emerald-500/20 via-cyan-500/10 to-transparent",
      text: "text-emerald-400",
      pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
  },
  {
    id: "neuroadapt",
    title: "NeuroAdapt",
    category: "healthcare",
    tagline: "Pediatric Tele-Rehabilitation & Neuro-Cognitive Telemetry",
    award: "Selected for SIH 2026 & Hacker Villa Nainital",
    badges: ["SIH 2026 Nominee", "Hacker Villa Nainital", "Solo Engineered"],
    description:
      "An end-to-end pediatric tele-rehabilitation platform built for children recovering from neurological trauma, ADHD, traumatic brain injuries (TBI), and cognitive delays. Bridges clinical oversight and home therapy through adaptive cognitive exercises and conversational voice interviews.",
    highlights: [
      "Gamified Cognitive Retraining across 4 domains: Attention, Memory, Reasoning, Problem Solving",
      "AI Voice Cognitive Interview: 60-90s adaptive conversational assessment testing verbal vigilance",
      "Clinician Telemetry Dashboard with accuracy corridors, cohort analytics & dynamic PDF exports",
      "Mistral AI Clinical Insights providing automated observation, fatigue detection & therapy titration",
      "Direct Parent Telegram Dispatcher sending 1-click weekly automated recovery summaries",
    ],
    link: "https://neuro-adapt-five.vercel.app/",
    repo: "https://github.com/harshitrajj23/NeuroAdapt",
    isFeatured: true,
    techLayers: [
      {
        layer: "Core Telemetry",
        technologies: "Next.js App Router, TypeScript, Framer Motion, HTML5 Canvas Graphics",
      },
      {
        layer: "Cognitive AI",
        technologies: "Mistral AI API, Clinical Decision Heuristics, Fatigue Correlation Engine",
      },
      {
        layer: "Voice Interface",
        technologies: "Web Speech Recognition API, Audio Synthesis, Conversational State Machine",
      },
      {
        layer: "Parent Communications",
        technologies: "Telegram Bot API Webhooks, Automated Dispatchers",
      },
      {
        layer: "Reporting & Export",
        technologies: "Dynamic PDF Vector Generation, Longitudinal Statistical Corridors",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Mistral AI",
      "Voice AI",
      "Telegram Bot API",
      "Cognitive Telemetry",
      "Canvas Engine",
    ],
    accent: {
      primary: "#a855f7", // Violet
      secondary: "#ec4899", // Pink
      border: "border-purple-500/40",
      bgGlow: "from-purple-500/20 via-pink-500/10 to-transparent",
      text: "text-purple-400",
      pill: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    },
  },
  {
    id: "pals-club",
    title: "PALS Club Official",
    category: "platform",
    tagline: "Official High-Performance Campus Club Platform",
    award: "Official BMSIT Platform",
    badges: ["Production Live", "Official Campus Site", "Solo Engineered"],
    description:
      "The official web experience engineered for PALS Club BMSIT. Designed to deliver lightning-fast interactive experiences, showcase university initiatives, drive community registrations, and highlight executive leads with modern glassmorphism aesthetics.",
    highlights: [
      "Modern dynamic dark aesthetic with fluid responsive micro-interactions",
      "Interactive events timeline and membership registration portal",
      "Optimized static & server assets delivering 98+ Lighthouse scores",
    ],
    link: "https://palsbmsitofficial.netlify.app/",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Netlify Edge", "UI/UX Architecture"],
    accent: {
      primary: "#f59e0b", // Amber
      secondary: "#ef4444", // Red
      border: "border-amber-500/40",
      bgGlow: "from-amber-500/20 via-orange-500/10 to-transparent",
      text: "text-amber-400",
      pill: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    },
  },
  {
    id: "voice-rag",
    title: "Voice RAG",
    category: "ai-ml",
    tagline: "Real-Time Conversational Voice Retrieval-Augmented Generation",
    award: "Built for Hacker House Goa 2026",
    badges: ["Hacker House Goa 2026", "Solo Engineered", "Full-Duplex Voice"],
    description:
      "A real-time voice retrieval-augmented generation engine engineered at Hacker House Goa. Ingests spoken human prompts, conducts vector similarity queries over custom knowledge bases, and synthesizes answers into spoken audio in a seamless low-latency loop.",
    highlights: [
      "Ultra-low latency speech-to-intent pipeline using Whisper inference",
      "Semantic vector indexing for high-precision domain-specific grounding",
      "Full-duplex conversation flow with interruption handling",
    ],
    link: "https://voicerag-lqt0.onrender.com/",
    repo: "https://github.com/harshitrajj23/VoiceRag",
    technologies: ["Python", "FastAPI", "Whisper", "Vector Search", "LangChain", "WebSockets"],
    accent: {
      primary: "#06b6d4", // Cyan
      secondary: "#3b82f6", // Blue
      border: "border-cyan-500/40",
      bgGlow: "from-cyan-500/20 via-blue-500/10 to-transparent",
      text: "text-cyan-400",
      pill: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    },
  },
  {
    id: "face-detector",
    title: "Face Detector Engine",
    category: "ai-ml",
    tagline: "Sub-Millisecond Biometric Landmark & Mesh Tracker",
    award: "Built for Hacker House Goa 2026",
    badges: ["Hacker House Goa 2026", "Solo Engineered", "Computer Vision"],
    description:
      "A real-time computer vision system built for Hacker House Goa 2026, delivering high-fps facial landmark tracking, spatial mesh mapping, and identity boundary classification from live camera streams.",
    highlights: [
      "Hardware-accelerated edge inference for continuous 60fps face detection",
      "Dense facial mesh feature extraction and spatial orientation vectors",
      "Zero-latency lightweight client pipeline with minimal memory footprint",
    ],
    repo: "https://github.com/harshitrajj23/face-detector",
    technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Real-Time Stream"],
    accent: {
      primary: "#f43f5e", // Rose
      secondary: "#fb923c", // Orange
      border: "border-rose-500/40",
      bgGlow: "from-rose-500/20 via-orange-500/10 to-transparent",
      text: "text-rose-400",
      pill: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    },
  },
  {
    id: "vyntra",
    title: "Vyntra",
    category: "platform",
    tagline: "High-Performance Modern E-Commerce Storefront",
    badges: ["Full-Stack App", "Solo Engineered", "Production Live"],
    description:
      "A sleek, cinematic e-commerce platform built with an emphasis on fluid catalog navigation, micro-animations, instant search filtering, and frictionless cart state synchronization.",
    highlights: [
      "Fluid page transitions and optimistic cart state handling",
      "Responsive layout optimized for mobile touch interactions",
      "Curated luxury typography and minimalist glass interface",
    ],
    link: "https://sa-me.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Edge"],
    accent: {
      primary: "#eab308", // Yellow
      secondary: "#10b981", // Emerald
      border: "border-yellow-500/40",
      bgGlow: "from-yellow-500/20 via-emerald-500/10 to-transparent",
      text: "text-yellow-400",
      pill: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
    },
  },
  {
    id: "jury-website",
    title: "Jury Evaluation Portal",
    category: "platform",
    tagline: "Live Hackathon Scoring & Rubric Tabulation System",
    badges: ["Frontend Core", "Live Hackathon System", "Collaborative"],
    description:
      "A high-stakes evaluation and judging interface deployed during live hackathons. Built to streamline jury scoring, multi-criterion rubric evaluations, live leaderboards, and automated normalization under strict time limits.",
    highlights: [
      "Instant rubric tabulation preventing manual scoring bias",
      "Optimized for judge tablet / mobile ergonomics under noisy venue conditions",
      "Real-time result consolidation and leaderboard sync",
    ],
    repo: "https://github.com/harshitrajj23/jury-website",
    technologies: ["React", "TypeScript", "Tailwind CSS", "State Architecture", "Vite"],
    accent: {
      primary: "#6366f1", // Indigo
      secondary: "#06b6d4", // Cyan
      border: "border-indigo-500/40",
      bgGlow: "from-indigo-500/20 via-cyan-500/10 to-transparent",
      text: "text-indigo-400",
      pill: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    },
  },
];
