// Profile data — TypeScript types & content

export interface Project {
  name: string;
  desc: string;
  tags: string[];
  links: { label: string; href: string }[];
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
  /** Short line under the handle (focus areas — not necessarily school). */
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
    { label: "Recently", value: "RL Circuit Design Researcher @ UCSD Jacobs School of Engineering" },
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
      desc: "Mission-control interface for emergency response (Future Interfaces hackathon). Multi-unit dispatcher dashboard with live 3D SLAM point clouds from helmet rigs, radio panels, and real-time tactical mapping—like air traffic control for firefighters.",
      tags: ["Next.js", "Three.js", "ROS 2", "WebSockets", "C++"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/NIGEL-hackathon" }],
    },
    {
      name: "Apollo Labs",
      desc: "RL training orchestrator for a 2D Roomba sim environment. FastAPI backend runs PPO training + eval, generates rollout GIFs, and ships structured run reports via AgentMail + Nia integration. Next.js dashboard tracks runs and metrics.",
      tags: ["FastAPI", "Next.js", "PPO", "Python", "RL"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/openclaw-hackathon" }],
    },
    {
      name: "Recall",
      desc: "Spatial memory assistant using computer vision + 3D mapping. Walk around with a camera to build a 3D map, detect objects with YOLOv8, then ask voice queries to find them. Next.js + React Three Fiber frontend, ROS 2 + OpenCV backend.",
      tags: ["Next.js", "React Three Fiber", "ROS 2", "YOLOv8", "OpenCV"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/sandhacks" }],
    },
    {
      name: "AnyGPU",
      desc: "Local GPU workload orchestrator & multi-cloud deployment platform. Register models, profile requirements, benchmark placements, then serve OpenAI-compatible endpoints across local Docker, Kubernetes, Vultr, and Vast. SQLite state + Crucible Compute layer.",
      tags: ["Python", "Docker", "Kubernetes", "CLI", "Cloud"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/nozomio-hackathon" }],
    },
    {
      name: "CodeCraft IDE",
      desc: "AI-powered online code editor with Gemini AI assistance. Monaco editor for coding, xterm for terminal access, and Pyodide for running Python directly in-browser. Full-stack Next.js + Node.js backend with Supabase auth.",
      tags: ["Next.js", "Monaco", "Gemini AI", "Python", "TypeScript"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/cafecode" }],
    },
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      place: "Cloudflare",
      date: "Summer 2025",
      desc: "I worked on the Workers runtime team optimizing cold-start latency. Shipped a 15% improvement to isolate initialization using snapshot-based techniques.",
    },
    {
      role: "Undergraduate Researcher",
      place: "UCSD Systems & ML Lab",
      date: "Jan 2025 – Present",
      desc: "I research efficient LLM inference with speculative decoding and model compression. I'm collaborating with PhD students on a paper submission to ICML 2026.",
    },
    {
      role: "Teaching Assistant — CSE 101",
      place: "UCSD CSE Dept.",
      date: "Fall 2024",
      desc: "I was TA for Design & Analysis of Algorithms. I ran weekly discussion sections of 30 students, held office hours, and wrote exam problems.",
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
