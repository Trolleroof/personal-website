// Profile data - TypeScript types & content

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

/** Rich copy + media shown in the project popup. */
export interface ProjectDetail {
  /** Hackathon placement, prize, or recognition - shown in list + at top of popup with medal when set. */
  award?: string;
  /** One-line lead above the overview. */
  hook?: string;
  /** Deeper story: problem, what you built, outcome. */
  overview: string;
  /** Optional iframe `src`: YouTube `/embed/...`, Vimeo player, etc. */
  videoEmbedUrl?: string;
  /** Carousel below the video in the popup. */
  galleryImages?: ProjectGalleryImage[];
  /** Notable bullets - architecture, challenges, outcomes. */
  highlights: string[];
}

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  links: { label: string; href: string }[];
  detail?: ProjectDetail;
}

export interface Experience {
  role: string;
  place: string;
  date: string;
  desc: string;
}

export interface GuestbookMsg {
  from: string;
  date: string;
  text: string;
}

export interface SkillCat {
  label: string;
  items: { name: string }[];
}

export interface SidebarQuoteData {
  text: string;
  /** Optional attribution (e.g. author name). */
  attribution?: string;
}

export interface InfoField {
  label: string;
  /** Plain text block (use when not using bullets). */
  value?: string;
  /** When set, shown as a bullet list instead of value. */
  bullets?: string[];
}

export type ContactIcon = "github" | "linkedin" | "email";

export interface ContactLink {
  icon: ContactIcon;
  label: string;
  href?: string;
  copyText?: string;
}

export type InterestIcon = "basketball" | "gamepad" | "camera" | "business" | "code";

export interface Obsession { label: string; icon: InterestIcon; }

export interface Interest { label: string; value: string; icon: InterestIcon; }

export interface ProfileData {
  /** PDF served from /public for downloads and print. */
  resumeUrl: string;
  /** Long screenshot of the resume for the modal viewer. */
  resumePreviewUrl: string;
  /** Square headshot in /public (e.g. profile-avatar.png). */
  avatarUrl: string;
  name: string;
  handle: string;
  /** Short line under the handle (focus areas - not necessarily school). */
  byline: string;
  status: string;
  sidebar: InfoField[];
  bioIntro: string;
  obsessions: Obsession[];
  bioOutro: string;
  interests: Interest[];
  skills: SkillCat[];
  projects: Project[];
  experience: Experience[];
  guestbook: GuestbookMsg[];
  contact: ContactLink[];
  sidebarQuote: SidebarQuoteData;
  visitorCount: string;
  currentFocus: {
    headline: string;
    detail: string;
    progressPct: number;
    footLeft: string;
    footRight?: string;
  };
}

export const PROFILE: ProfileData = {
  resumeUrl: "/resume.pdf",
  resumePreviewUrl: "/resume-preview.png",
  avatarUrl: "/profile-avatar.png",
  name: "Nikhil Prabhu",
  handle: "Trolleroof",
  byline: "agents · robotics UIs · systems that ship",
  status: "getting reps in a problem space im passionate about.",
  sidebar: [
    {
      label: "Focus",
      bullets: [
        "Desktop assistants",
        "RL at scale",
        "Spatial / robotics interfaces",
      ],
    },
    { label: "Recently", value: "Founder / Desktop Agent Developer @ Clue2" },
    { label: "Location", value: "San Francisco Bay Area" },
    { label: "Values", value: "Family, Faith, Hard Work" },
  ],
  bioIntro: "hey I'm Nikhil. I've always learned by getting obsessed with a problem and staying with it long enough to build real taste.",
  obsessions: [
    { label: "basketball", icon: "basketball" },
    { label: "video games", icon: "gamepad" },
    { label: "content creation", icon: "camera" },
    { label: "running a business", icon: "business" },
    { label: "building software", icon: "code" },
  ],
  bioOutro: "the goal in life is to conquer high peaks that reward iteration, fullfillment, and relentless improvement without brute-forcing in the wrong direction.",
  interests: [
    { label: "Basketball", icon: "basketball", value: "Dub Nation first. I love the pace, spacing, and constant reps that make basketball feel like live problem solving." },
    { label: "Video games", icon: "gamepad", value: "I grew up on games that reward mechanics, systems thinking, and getting better one run at a time." },
    { label: "Content creation", icon: "camera", value: "I like turning ideas into something people can actually watch, use, or share." },
    { label: "Business", icon: "business", value: "I care about building useful things, getting feedback quickly, and understanding what people will pay attention to." },
    { label: "Software", icon: "code", value: "Right now I'm obsessed with agents, ML systems, spatial computing, and software that feels fast and alive." },
  ],
  skills: [
    {
      label: "web & realtime",
      items: [
        { name: "Next.js" },
        { name: "React" },
        { name: "TypeScript" },
        { name: "Three.js" },
        { name: "WebSockets" },
      ],
    },
    {
      label: "backend & data",
      items: [
        { name: "Python" },
        { name: "FastAPI" },
        { name: "Node.js" },
        { name: "Supabase" },
        { name: "SQLite" },
      ],
    },
    {
      label: "in-browser tooling",
      items: [{ name: "Monaco" }, { name: "Pyodide" }, { name: "xterm.js" }],
    },
    {
      label: "ML, CV & RL",
      items: [
        { name: "Gemini AI" },
        { name: "YOLOv8" },
        { name: "OpenCV" },
        { name: "PPO" },
        { name: "Reinforcement Learning" },
      ],
    },
    {
      label: "robotics & spatial",
      items: [{ name: "ROS 2" }, { name: "C++" }, { name: "SLAM" }],
    },
    {
      label: "shipping & infra",
      items: [
        { name: "Docker" },
        { name: "Git & GitHub" },
        { name: "ESLint" },
        { name: "Prettier" },
        { name: "Agile / hackathons" },
      ],
    },
  ],
  projects: [
    {
      name: "NIGEL",
      desc: "Navigation, Incident Guidance, and Emergency Localization & Control: a mission-control interface for firefighters. The Next.js dispatcher dashboard combines helmet-rig VSLAM point clouds, multi-unit video, radio transcripts, blueprint search, and WebSocket-fed tactical mapping.",
      tags: ["Next.js", "Three.js", "ROS 2", "WebSockets", "C++"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/NIGEL-hackathon" }],
      detail: {
        hook: "Treating a distributed rescue team like a fleet you can see and coordinate in one room.",
        overview:
          "Built for a Future Interfaces hackathon: a dispatcher-facing web console that turns helmet VSLAM, unit video, and radio-style audio into a shared tactical picture. The repo pairs a Next.js frontend with ROS 2 packages for Odin hardware, SLAM cloud accumulation, launch files, and WebSocket APIs.",
        highlights: [
          "Frontend routes cover dispatcher and firefighter modes, with multi-unit viewports, a central Three.js point-cloud map, blueprint search, and transcript UX.",
          "ROS 2 workspace includes the Odin driver and a SLAM cloud accumulator that streams live mapping data into the web stack.",
          "WebSocket contracts keep camera, SLAM, and UI state flowing through a narrow interface while the operator stays in incident mode.",
        ],
        /** Replace with your demo reel embed (share → Embed → paste `src` only). */
        videoEmbedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
        galleryImages: [
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
            alt: "Dashboard analytics mock - swap for your NIGEL screenshots",
          },
          {
            src: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80&auto=format&fit=crop",
            alt: "Command center workstation - representative project imagery",
          },
          {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
            alt: "Operational map visualization - representative project imagery",
          },
        ],
      },
    },
    {
      name: "Apollo Labs",
      desc: "RL run orchestrator for a 2D Roomba cleaning sim. FastAPI trains PPO, evaluates against a random baseline, generates rollout GIFs, stores canonical RunReports, emails them through AgentMail, logs Nia lessons through Slack, and exposes a Next.js dashboard plus MCP tools.",
      tags: ["FastAPI", "Next.js", "PPO", "AgentMail", "MCP"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/openclaw-hackathon" }],
      detail: {
        hook: "Make RL runs feel observable: less 'black box,' more 'flight recorder.'",
        overview:
          "End-to-end lab for a 2D navigation sim: FastAPI allocates runs, queries Nia for prior lessons, trains PPO, compares it to a random baseline, writes metrics and artifacts, builds a canonical RunReport, and sends the same report through AgentMail. The Next.js surface reads that report for run history, metrics, GIFs, inbox messages, and memory lessons.",
        highlights: [
          "Run lifecycle writes metadata, config snapshots, model checkpoints, eval metrics, combined PPO-vs-baseline metrics, rollout GIFs, logs, and report JSON under each run.",
          "AgentMail, Slack, and Nia are first-class outputs, so experiments produce human-readable reports and reusable lessons instead of dashboard-only state.",
          "MCP tools expose listing, training, evaluation, GIF generation, reward-hacking summaries, and run comparisons to external agents.",
        ],
        galleryImages: [
          {
            src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80&auto=format&fit=crop",
            alt: "ML / robotics workspace - representative imagery",
          },
          {
            src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80&auto=format&fit=crop",
            alt: "Code on screen - representative imagery",
          },
        ],
      },
    },
    {
      name: "SODIUM",
      desc: "Voice-forward care companion for seniors: an autonomous robot with natural speech interaction, smart crisis detection, and a caregiver dashboard. Uses YOLOX for human-following, Cerebras for conversation routing, and Browser Use for real-world task automation like food ordering and web searches.",
      tags: ["Svelte 5", "Bun", "TypeScript", "Browser Use", "Cerebras"],
      links: [
        { label: "GitHub", href: "https://github.com/TheOutcastVirus/diamondhacks-2026" },
        { label: "Devpost", href: "https://devpost.com/software/sodium" },
      ],
      detail: {
        award: "1st Overall @ DiamondHacks 2026",
        hook: "Elderly care through voice - a robot that understands, remembers, and takes action.",
        overview:
          "SODIUM is an AI-powered companion for aging in place: a physical robot with voice-forward interaction paired with a caregiver monitoring dashboard. The system captures voice queries through AssemblyAI, routes intent through Cerebras (Llama-class), invokes tools like web search or food ordering via Browser Use, and responds with ElevenLabs text-to-speech. The robot autonomously follows users with YOLOX, while caregivers see live transcripts, reminders, and actual browser interactions instead of just chat logs. Crisis detection flags distress and can trigger phone outreach through Bland.",
        highlights: [
          "Voice-first interaction eliminates complex navigation for seniors while giving caregivers transparency into agent actions.",
          "Autonomous robot with YOLOX-based human following paired with medication reminders and routine prompts.",
          "Browser Use handles real-world tasks (ordering food, searching) while staying grounded in a unified caregiver dashboard.",
          "Crisis detection and automated calling bridge monitoring and response into a single interface.",
        ],
        galleryImages: [
          {
            src: "https://images.unsplash.com/photo-1576091160550-112173e7d06d?w=1200&q=80&auto=format&fit=crop",
            alt: "Senior with robot companion - care assistance vibe",
          },
          {
            src: "https://images.unsplash.com/photo-1576091160399-112b8d4d2b6a?w=1200&q=80&auto=format&fit=crop",
            alt: "Dashboard monitoring interface - caregiver oversight",
          },
        ],
      },
    },
    {
      name: "AnyGPU",
      desc: "Local-first GPU workload control plane and Crucible Compute agent layer. Register models, verify Docker/Kubernetes/provider inventory, refresh broker prices, benchmark placements, schedule compatible routes, launch local llama.cpp or Docker/vLLM runtimes, and expose OpenAI-compatible endpoints through a gateway.",
      tags: ["Python", "Docker", "Kubernetes", "llama.cpp", "MCP"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/nozomio-hackathon" }],
      detail: {
        hook: "Pick where the GPU lives like you pick a region - but with receipts.",
        overview:
          "A control plane for messy reality: connect managed or BYOC compute, normalize hardware inventory, register and profile models, benchmark candidate placements, create policies, and route OpenAI-compatible inference across local Docker, Kubernetes manifests, Vultr, Vast, and a real local llama.cpp path. Crucible adds signup/session persistence, natural-language deployment planning, explicit spend approvals, public MCP credit gates, and simulated deployment records for personal-agent workflows.",
        highlights: [
          "Provider broker covers seeded NVIDIA, AMD, TPU, Intel Gaudi, and Apple Silicon capacity, with live Vast and Vultr price/capacity refresh adapters.",
          "Verified benchmark records feed route selection, cost estimates, deployment explanations, and OpenAI-compatible gateway headers.",
          "Crucible Compute keeps paid GPU launch paths behind explicit approval and exposes the same backend through CLI and MCP-style tools.",
        ],
        galleryImages: [
          {
            src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop",
            alt: "Globe tech network - infra / clouds vibe",
          },
          {
            src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop",
            alt: "Server room - GPU / workload vibe",
          },
        ],
      },
    },
    {
      name: "CodeCraft IDE",
      desc: "Cafecode: an AI coding tutor and browser-native project builder. Next.js, Monaco, WebContainer, Supabase, WebSockets, Gemini, Stripe, and an Express/Fly.io backend give learners a full coding workspace while keeping them in control of what they build.",
      tags: ["Next.js", "Monaco", "WebContainer", "Gemini AI", "Supabase"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/cafecode" }],
      detail: {
        hook: "Browser-native dev box: edit, run Python, ask the model, without leaving the tab.",
        overview:
          "Cafecode is a full-stack AI coding tutor for building real projects while understanding the code. The frontend uses Next.js, TypeScript, Tailwind, shadcn/ui, Monaco, and WebContainer for a VS Code-like editor, terminal, npm installs, file operations, and browser-native execution. The Express backend coordinates AI orchestration, workspace management, Stripe payments, file sync, and Supabase-backed auth.",
        highlights: [
          "WebContainer moved the terminal and file system into the browser, reducing server load while preserving live terminals, package installs, and workspace operations.",
          "Gemini assistance stays project-aware: guided project creation, context-aware hints, code fixes, and step discussion beside the editor.",
          "Supabase row-level security, WebSocket sync, Helmet/CORS/rate limits, and Dockerized Fly.io services make the workspace model feel closer to a real product than a static demo.",
        ],
        galleryImages: [
          {
            src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80&auto=format&fit=crop",
            alt: "Code IDE aesthetic - representative project imagery",
          },
          {
            src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&auto=format&fit=crop",
            alt: "Laptop workstation - IDE / maker vibe",
          },
        ],
      },
    },
  ],
  experience: [
    {
      role: "Desktop Agent Developer - Founder",
      place: "UCSD Agent Development (Clue2)",
      date: "Jan 2025 - Present",
      desc: "Architected a cross-platform Electron + TypeScript desktop agent that processes live meetings and executes tasks across user apps. Built real-time transcription, natural-language workflow automation across Gmail, Calendar, Docs, Sheets, Slack, and Notion, and scaled the beta to 40+ users with early startup adoption.",
    },
    {
      role: "Research Assistant",
      place: "AI for Circuit Invention",
      date: "Mar 2026 - Present",
      desc: "Developing an LLM-based pipeline for automated generation and verification of novel analog circuit topologies. Integrating LLM APIs with Cadence simulation tools and exploring reinforcement learning strategies for circuit design space search.",
    },
    {
      role: "Lead Researcher - IEEE ICHCI Presenter",
      place: "Foot Drop Ankle-Foot Orthosis Research",
      date: "May 2024 - Nov 2024",
      desc: "Conducted research at Georgia Tech's mmWave Antennas Laboratory on a 3D-printed ankle-foot orthosis controlled through electromyography signals. Built a custom motor actuator system, improved gait response precision by 23%, and presented the work at IEEE ICHCI 2024.",
    },
    {
      role: "Lead Researcher",
      place: "Brain-Computer Interface Device Research",
      date: "Oct 2023 - Dec 2024",
      desc: "Led BCI device research at Stanford's Lee-Messer Lab to help motor-impaired students communicate through neural signals. Benchmarked P300 EEG models and built a React Native assistive-learning frontend piloted with 12 patient users.",
    },
  ],
  guestbook: [],
  contact: [
    { icon: "github", label: "GitHub", href: "https://github.com/Trolleroof" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/nikprabhu1/" },
    { icon: "email", label: "Email", copyText: "nikhilprabhu06@gmail.com" },
  ],
  sidebarQuote: {
    text: "Hard work beats talent when talent fails to work hard.",
    attribution: "Kevin Durant",
  },
  visitorCount: "042137",
  currentFocus: {
    headline: "Clue2 - desktop web assistant",
    detail:
      "I'm trying to build an agentic version of Cluely that can do tasks for you.",
    progressPct: 78,
    footLeft: "side project",
  },
};
