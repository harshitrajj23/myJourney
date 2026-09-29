export interface TimelinePhase {
  id: string;
  title: string;
  event: string;
  project?: string;
  github?: string;
  liveUrl?: string;
  description: string;
  narrative: string;
  achievement?: string;
  theme: string;
  visualMood: string;
  imageFolder: string;
  order: number;
  emotionalNote?: string;
  techStack?: string[];
  date?: string;
  dateLabel?: string;
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: "build-and-conquer",
    title: "Build & Conquer",
    event: "Build and Conquer by Alterino",
    description:
      "The first hackathon that completely shifted the mindset from just solving problems to building real products.",
    narrative:
      "For the first time, building felt more exciting than solving.",
    theme: "Mindset Shift",
    visualMood: "transformative",
    imageFolder: "buildAndConquer",
    order: 1,
    emotionalNote:
      "This was the turning point. The moment building became more thrilling than solving.",
    date: "OCT 2025",
    dateLabel: "First Major Hackathon Experience",
  },
  {
    id: "nakshatra",
    title: "Nakshatra Hackathon",
    event: "Nakshatra Hackathon",
    project: "Finance Tracker App",
    github: "https://github.com/harshitrajj23/Syntax_Squad",
    description:
      "Built a full-stack finance tracking application which significantly increased interest in web development and real-world product building.",
    narrative:
      "Learning through building. Frontend meets backend. Theory becomes practice.",
    theme: "Learning Through Building",
    visualMood: "growth",
    imageFolder: "nakshatra",
    order: 2,
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    date: "NOV 2025",
    dateLabel: "First Full Stack Product Build",
  },
  {
    id: "overclock",
    title: "Overclock Hackathon",
    event: "Overclock Hackathon",
    project: "API TITAN",
    github: "https://github.com/harshitrajj23/hacktitans",
    description:
      "API TITAN is a full-stack platform built during the Overclock Hackathon that helps developers create mock APIs, test them, and simulate CI/CD workflows — all from a single dashboard. This project focuses on making backend development and API testing faster, easier, and more visual.",
    narrative:
      "Deployment struggles and failures became learning moments. System thinking deepened.",
    theme: "System Thinking",
    visualMood: "technical",
    imageFolder: "overclock",
    order: 3,
    emotionalNote:
      "Every failed deployment taught more than any tutorial ever could.",
    techStack: ["React", "Node.js", "CI/CD"],
    date: "DEC 2025",
    dateLabel: "Developer Tooling & Backend Systems",
  },
  {
    id: "cloudathon",
    title: "Cloudathon",
    event: "International Cloudathon — Coimbatore",
    description:
      "International cloudathon where execution under pressure translated into large-scale recognition.",
    narrative:
      "Teamwork. Execution. Pressure. Scaling ideas quickly under international competition.",
    achievement: "2nd Place — International",
    theme: "Execution Under Pressure",
    visualMood: "prestigious",
    imageFolder: "cloudathon",
    order: 4,
    emotionalNote:
      "First moment where pressure and execution led to international-scale recognition.",
    date: "FEB 2026",
    dateLabel: "International Level Competition",
  },
  {
    id: "build-for-bengaluru",
    title: "Build for Bengaluru",
    event: "Build for Bengaluru",
    project: "NammaFix",
    github: "https://github.com/harshitrajj23/NammaFix",
    description:
      "NammaFix is an AI-powered civic transparency platform that connects citizens, government authorities, and media to resolve urban issues faster and more transparently. The platform transforms traditional complaint systems into a real-time civic intelligence network powered by geospatial data and AI.",
    narrative:
      "Technology meeting real urban problems. Building for the city that builds you.",
    theme: "Smart City Futurism",
    visualMood: "futuristic",
    imageFolder: "buildforBengaluru",
    order: 5,
    techStack: ["Next.js", "Python", "AI/ML", "Geospatial"],
    date: "MAR 2026",
    dateLabel: "AI + Civic Intelligence Systems",
  },
  {
    id: "syntax-and-stakes",
    title: "Syntax & Stakes",
    event: "Syntax and Stakes",
    project: "Celestial Voyage",
    github:
      "https://github.com/Vansh-Baranwal/celestial_voyage__poorvik_a.replit.app",
    description:
      "A unique combination of DSA problem-solving and web execution under competitive pressure.",
    narrative:
      "Where algorithmic thinking meets real-world building. The best of both worlds.",
    achievement: "4th Rank",
    theme: "DSA Meets Web",
    visualMood: "competitive",
    imageFolder: "syntaxAndStakes",
    order: 6,
    date: "MAR 2026",
    dateLabel: "Frontend Iteration & Speed",
  },
  {
    id: "bmsce",
    title: "BMSCE Hackathon",
    event: "BMSCE Hackathon",
    project: "Dynamic IIT Delhi College Website",
    github: "https://github.com/Vansh-Baranwal/College-Website",
    description:
      "Built a dynamic, scalable college website showcasing frontend engineering depth and UI system thinking.",
    narrative:
      "Dynamic frontend systems and scalable UI building at its finest.",
    theme: "Dynamic Frontend Systems",
    visualMood: "structured",
    imageFolder: "bmsce",
    order: 7,
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
    date: "MAR 2026",
    dateLabel: "Dynamic Web Engineering",
  },
  {
    id: "incseption",
    title: "Incseption Hackathon",
    event: "Incseption Hackathon",
    project: "Soochana Setu",
    github: "https://github.com/poorvik-gowda-cmd/soochana-setu",
    description:
      "Soochana Setu is a full-stack, inter-ministry intelligence platform that: Unifies fragmented data across ministries, Detects fraud and duplication, Identifies excluded citizens, Simulates policy impact before rollout, and Provides a unified citizen + admin dashboard.",
    narrative:
      "Thinking at government scale. Systems that serve millions, built in hours.",
    achievement: "3rd Position",
    theme: "Large-Scale System Thinking",
    visualMood: "institutional",
    imageFolder: "incseption",
    order: 8,
    techStack: ["React", "Python", "FastAPI", "PostgreSQL"],
    date: "APR 2026",
    dateLabel: "Public Scale System Architecture",
  },
  {
    id: "triverse",
    title: "Triverse Hackathon",
    event: "Triverse Hackathon",
    project: "ThinkLoop",
    github:
      "https://github.com/harshitrajj23/SyntaxSquad_ResearchSystem_Triverse",
    description:
      "ThinkLoop is an advanced AI-powered conversational platform designed to go beyond traditional chatbots. It combines intelligent response modes, contextual memory, and research-oriented outputs to create a next-generation research assistant system.",
    narrative:
      "Broken deployment. No sleep. Internet issues during pitching. Still shipped.",
    theme: "Ship Under Chaos",
    visualMood: "intense",
    imageFolder: "triverse",
    order: 9,
    emotionalNote:
      "The internet died during the pitch. The deployment broke at 3 AM. Sleep was a myth. But we still shipped.",
    techStack: ["Next.js", "Python", "LangChain", "AI/ML"],
    date: "APR 2026",
    dateLabel: "AI Research Assistant Systems",
  },
  {
    id: "push-pull-commit",
    title: "Push Pull Commit",
    event: "Push Pull Commit",
    project: "SoilSense",
    github: "https://github.com/poorvik-gowda-cmd/soilsense",
    description:
      "ML-powered agricultural intelligence platform for smarter crop recommendations using real-time soil data analysis.",
    narrative:
      "Real-world AI problem solving. Technology that touches the ground — literally.",
    achievement: "4th Position",
    theme: "Real-World AI",
    visualMood: "grounded",
    imageFolder: "pushPull",
    order: 10,
    techStack: ["React", "Python", "TensorFlow", "FastAPI"],
    date: "MAY 2026",
    dateLabel: "ML for Real World Agriculture",
  },
  {
    id: "medi-ai",
    title: "Medi AI",
    event: "Global Clinical AI Hackathon",
    project: "Autonomous Multimodal Clinical AI",
    github: "https://github.com/harshitrajj23/MediAI",
    liveUrl: "https://medi-ai-blush.vercel.app/",
    description:
      "A next-generation multimodal clinical intelligence system built solo from ground up, selected into top 30 out of 5,000 global submissions. Integrates specialized biomedical LLMs, vision-language CLIP embeddings, vector similarity search, and automated cross-platform speech interfaces.",
    narrative:
      "Solo engineered against 5,000 global submissions. Zero compromise on latency, clinical depth, and multimodal vision intelligence.",
    achievement: "Top 30 / 5,000+ Worldwide",
    theme: "Autonomous Clinical Intelligence",
    visualMood: "clinical",
    imageFolder: "mediAi",
    order: 11,
    emotionalNote:
      "Proved that a solo engineer can out-build enterprise teams when driven by pure obsession with architecture and execution.",
    techStack: ["React 19", "FastAPI", "BioClinicalBERT", "ChromaDB", "Mistral Large", "CLIP ViT-B/32", "Supabase", "Capacitor"],
    date: "JUN 2026",
    dateLabel: "Global Top 30 Clinical AI",
  },
  {
    id: "neuroadapt",
    title: "NeuroAdapt",
    event: "Smart India Hackathon & Hacker Villa",
    project: "Pediatric Tele-Rehabilitation & Neuro-Cognitive Telemetry",
    github: "https://github.com/harshitrajj23/NeuroAdapt",
    liveUrl: "https://neuro-adapt-five.vercel.app/",
    description:
      "An end-to-end pediatric tele-rehabilitation platform built for children recovering from neurological trauma, ADHD, traumatic brain injuries (TBI), and cognitive delays. Bridges clinical oversight and home therapy through adaptive cognitive exercises and conversational voice interviews.",
    narrative:
      "Bridging neuroscience and modern web architecture. Telemetry corridors, adaptive voice assessments, and clinical automation.",
    achievement: "Selected for SIH 2026 & Hacker Villa",
    theme: "Neuro-Cognitive Telemetry",
    visualMood: "neuro",
    imageFolder: "neuroadapt",
    order: 12,
    emotionalNote:
      "Engineering tools that directly change rehabilitation trajectories for children recovering from trauma.",
    techStack: ["Next.js", "TypeScript", "Mistral AI", "Voice AI", "Telegram Bot API", "Canvas Engine"],
    date: "JUL 2026",
    dateLabel: "SIH '26 & Hacker Villa Nominee",
  },
  {
    id: "pals-club",
    title: "PALS Club Official",
    event: "Official BMSIT Campus Engineering",
    project: "Official High-Performance Campus Platform",
    liveUrl: "https://palsbmsitofficial.netlify.app/",
    description:
      "The official web experience engineered for PALS Club BMSIT. Designed to deliver lightning-fast interactive experiences, showcase university initiatives, drive community registrations, and highlight executive leads with modern glassmorphism aesthetics.",
    narrative:
      "Engineered to represent the campus club at scale. 98+ Lighthouse score with zero compromise on visual polish.",
    achievement: "Official BMSIT Platform",
    theme: "High-Performance Campus Architecture",
    visualMood: "institutional",
    imageFolder: "palsClub",
    order: 13,
    emotionalNote:
      "Building the platform that thousands of students interact with daily across campus.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Netlify Edge", "UI Architecture"],
    date: "AUG 2026",
    dateLabel: "Official Campus Platform",
  },
  {
    id: "voice-rag",
    title: "Voice RAG",
    event: "Hacker House Goa 2026",
    project: "Real-Time Conversational Voice RAG Engine",
    github: "https://github.com/harshitrajj23/VoiceRag",
    liveUrl: "https://voicerag-lqt0.onrender.com/",
    description:
      "A real-time voice retrieval-augmented generation engine engineered at Hacker House Goa. Ingests spoken human prompts, conducts vector similarity queries over custom knowledge bases, and synthesizes answers into spoken audio in a seamless low-latency loop.",
    narrative:
      "Conversational intelligence at conversational speed. Sub-second full-duplex speech-to-intent pipeline.",
    achievement: "Hacker House Goa 2026",
    theme: "Full-Duplex Voice AI",
    visualMood: "cyber",
    imageFolder: "voiceRag",
    order: 14,
    emotionalNote:
      "Hacking on the edge in Goa, building low-latency speech pipelines that feel genuinely alive.",
    techStack: ["Python", "FastAPI", "Whisper", "Vector Search", "LangChain", "WebSockets"],
    date: "AUG 2026",
    dateLabel: "Hacker House Goa AI Pipeline",
  },
  {
    id: "face-detector",
    title: "Face Detector Engine",
    event: "HH Goa 2026 Shortlisting Task 3",
    project: "Biometric Provenance & Blockchain Anchoring Pipeline",
    github: "https://github.com/harshitrajj23/face-detector",
    description:
      "An end-to-end provenance pipeline that takes a face scan as input, identifies matching content on web/social media through genuine visual and entity search, and cryptographically anchors the discovered data to a blockchain to create a verifiable, tamper-evident record.",
    narrative:
      "HH Goa 2026 Shortlisting Task 3: Visual search meets cryptographic provenance. Verifiable facial entity tracking anchored on-chain.",
    achievement: "Hacker House Goa 2026",
    theme: "Biometric Provenance & Blockchain",
    visualMood: "biometric",
    imageFolder: "faceDetector",
    order: 15,
    emotionalNote:
      "HH Goa 2026 Task 3: Delivering genuine visual search and verifiable tamper-evident blockchain anchoring.",
    techStack: ["Python", "Computer Vision", "Visual Search", "Entity Matching", "Blockchain Anchoring", "FastAPI"],
    date: "SEP 2026",
    dateLabel: "HH Goa 2026 Shortlisting Task 3",
  },
  {
    id: "vyntra",
    title: "Vyntra",
    event: "Production Scalable Platform & Ecosystem",
    project: "Production-Oriented Scalable Full-Stack Platform",
    liveUrl: "https://sa-me.vercel.app/",
    description:
      "Vyntra is built as a production-oriented, scalable platform using Next.js, React, Node.js, Express.js, MongoDB, Redis, Socket.IO, and Docker. It implements JWT-based authentication with HTTP-only cookies, REST APIs, real-time messaging and notifications through WebSockets, Redis caching and Pub/Sub, MongoDB indexing with cursor-based pagination, rate limiting, media storage, and horizontally scalable backend services. The platform also includes a hackathon ecosystem with event management, team discovery, discussions, club communities, and project showcases, with Capacitor enabling the same application to run on mobile devices.",
    narrative:
      "Production-oriented architecture: Next.js & Node.js, Redis caching and Pub/Sub, WebSockets real-time sync, horizontally scalable Docker services, and Capacitor mobile packaging.",
    achievement: "Production Deployed Platform",
    theme: "Horizontally Scalable Full-Stack Platform",
    visualMood: "luxury",
    imageFolder: "vyntra",
    order: 16,
    emotionalNote:
      "Engineered from ground up with Redis Pub/Sub, WebSocket notification streams, and cross-platform mobile packaging.",
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.IO", "Docker", "Capacitor"],
    date: "SEP 2026",
    dateLabel: "Production Scalable Platform & Hackathon Ecosystem",
  },
  {
    id: "jury-website",
    title: "Jury Evaluation Portal",
    event: "Live Hackathon Scoring System",
    project: "Live Hackathon Scoring & Rubric Tabulation System",
    github: "https://github.com/harshitrajj23/jury-website",
    description:
      "A high-stakes evaluation and judging interface deployed during live hackathons. Built to streamline jury scoring, multi-criterion rubric evaluations, live leaderboards, and automated normalization under strict time limits.",
    narrative:
      "Deployed in the heat of competition. Zero downtime, realtime score normalization, and instant rubric calculation.",
    achievement: "Live Hackathon Battle Tested",
    theme: "High-Stakes Live Evaluation",
    visualMood: "critical",
    imageFolder: "juryWebsite",
    order: 17,
    emotionalNote:
      "When judges are grading hundreds of projects live under pressure, your software cannot afford a single millisecond of lag.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "State Architecture", "Vite"],
    date: "SEP 2026",
    dateLabel: "Live Hackathon Evaluation Core",
  },
];

export const heroRoles = [
  "3x Hackathon Winner",
  "MERN Stack Developer",
  "Frontend Engineer",
  "Blockchain Explorer",
  "ML Enthusiast",
  "C++ & DSA",
  "Dynamic UI Builder",
  "Startup-Oriented Builder",
];

export const landingPhrases = [
  "Builder",
  "Hacker",
  "Frontend Engineer",
  "Startup-Oriented Developer",
  "Full Stack Explorer",
  "Problem Solver",
  "Execution > Ideas",
  "Pressure Reveals Skill",
];

export const beforeEngineeringCards = [
  {
    title: "Strategy & Systems",
    description: "Gaming taught the fundamentals of resource management and min-maxing under pressure.",
    icon: "🎮",
    deepExplanation: "Gaming wasn't just entertainment; it was the first exposure to min-maxing, managing limited resources, and understanding complex underlying systems under pressure. It built the foundation for optimizing performance."
  },
  {
    title: "Algorithmic Intuition",
    description: "Mathematics proved that complex problems are just puzzles waiting for pure logic.",
    icon: "📐",
    deepExplanation: "Beyond equations, mathematics taught the fundamental truth that complex problems can be broken down into solvable, logical steps. This directly translated into my approach to System Architecture and DSA."
  },
  {
    title: "First Principles",
    description: "Physics instilled the mental model of stripping away assumptions to find core mechanics.",
    icon: "⚛️",
    deepExplanation: "Physics forces you to look at the core mechanics of reality. This mental model now helps me debug impossible issues by isolating variables down to the bare metal and ignoring surface-level noise."
  },
  {
    title: "Tactical Foresight",
    description: "Chess instilled the habit of thinking three steps ahead and predicting edge cases.",
    icon: "♟️",
    deepExplanation: "Chess built the muscle of anticipation. Predicting edge cases, mapping out state changes, and evaluating the cascading consequences of a single line of code before it is even written."
  },
  {
    title: "The Builder's Itch",
    description: "Before code, there was an obsession with how products scale and impact users.",
    icon: "🚀",
    deepExplanation: "Long before I wrote my first line of React, I obsessed over how startups built scalable products. Code is just the tool; the ultimate goal has always been to build solutions that survive the chaos of the real world."
  },
];
