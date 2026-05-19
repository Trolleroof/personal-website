// Profile data - TypeScript types & content

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  /** Enlarge this slide in the carousel — `strong` zooms more than default. */
  emphasize?: boolean | 'strong';
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
  /** Optional local/public video file shown with native controls. */
  videoFileUrl?: string;
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
  organization: string;
  date: string;
  logo: {
    src: string;
    alt: string;
  };
  desc: string;
}

export interface Publication {
  title: string;
  conference: string;
  date: string;
  description: string;
  url: string;
  isPeerReviewed?: boolean;
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
  /** Bold stat line above chips/value (e.g. "9 wins"). */
  lead?: string;
  /** Pill tags (e.g. sponsor names), shown below `lead` when set. */
  chips?: string[];
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
  publications: Publication[];
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
    {
      label: "Hackathons",
      lead: "9 wins",
      chips: [
        "Amazon",
        "GitHub",
        "MemVerge",
        "Transpose VC",
        "Eragon",
        "Nozomio",
        "AgentMail",
        "MLH",
      ],
    },
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
      label: "web dev",
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
        { name: "MediaPipe" },
        { name: "YOLOv8" },
        { name: "OpenCV" },
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
      ],
    },
  ],
  projects: [
    {
      name: "SODIUM",
      desc: "Voice-first AI companion for senior care: an autonomous robot with natural speech interaction, wake-word detection, medication reminders, crisis detection, and a caregiver monitoring dashboard. Frontend built with Svelte 5 and Bun runtime for a lightweight, responsive experience.",
      tags: ["Svelte 5", "Bun", "TypeScript", "Python", "Voice AI"],
      links: [{ label: "GitHub", href: "https://github.com/TheOutcastVirus/diamondhacks-2026" }],
      detail: {
        award: "1st Overall @ DiamondHacks 2026",
        hook: "Elderly care through voice — a robot that understands, remembers, and helps without complex interfaces.",
        overview:
          "SODIUM is an AI-powered voice-first assistant designed for aging in place: a lightweight system that listens for wake words, understands natural speech, handles everyday tasks, and reports to caregivers. The frontend runs on Svelte 5 with Bun runtime, keeping the system responsive and efficient. The bot component detects wake words and routes requests through a natural language processor, while the caregiver dashboard provides real-time visibility into the senior's interactions, medication reminders, and any detected distress signals.",
        highlights: [
          "Seniors use voice instead of menus; caregivers see what was said and what the system tried to do.",
          "Wake-word detection plus a lightweight Python bot keeps replies fast without a heavy backend.",
          "One Svelte 5 + Bun app powers both the in-home robot screen and the caregiver dashboard.",
          "Medication reminders, daily prompts, and crisis alerts share one interface.",
        ],
        videoFileUrl: "/projects/sodium/SODIUMmp4.mp4",
        galleryImages: [
          {
            src: "/projects/sodium/BU.jpg",
            alt: "Sodium caregiver dashboard — Browser agent tab with live Walmart session and task status",
          },
        ],
      },
    },
    {
      name: "Apollo Labs",
      desc: "RL training orchestrator for a 2D Roomba cleaning sim that automates the full workflow: FastAPI trains PPO agents, evaluates them, generates GIFs, and delivers results through email (AgentMail), memory (Nia), and MCP tools for autonomous agent-driven optimization.",
      tags: ["FastAPI", "Next.js", "PPO", "AgentMail", "MCP", "Python"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/openclaw-hackathon" }],
      detail: {
        award: "1st Overall @ OpenClaw Hackathon Eragon x Nozomio x AgentMail",
        hook: "Make RL runs feel observable: less 'black box,' more 'flight recorder.'",
        overview:
          "End-to-end lab for a 2D navigation sim: FastAPI orchestrates the complete ML workflow—querying narrative memory (Nia) *before* training to incorporate prior lessons, training PPO agents against a random baseline, generating metrics and rollout GIFs, and producing a canonical RunReport that serves as the single source of truth. The same report flows to email (AgentMail), Slack, memory storage, and the Next.js dashboard. MCP tools enable external agents to drive the entire workflow autonomously.",
        highlights: [
          "Reads past lessons from Nia before training, then saves a summary after each run for the next one.",
          "One RunReport object feeds the dashboard, email, memory, and agent tools—no duplicate state.",
          "Each run stores configs, models, metrics, rollout GIFs, and logs in a versioned folder.",
          "MCP tools let agents start runs, compare results, and suggest what to train next.",
        ],
        galleryImages: [
          {
            src: "/projects/apollo-labs/apollo-labs-runs.png",
            alt: "Apollo Labs runs dashboard showing completed RL training runs, metrics, and rollout previews",
          },
          {
            src: "/projects/apollo-labs/apollo-labs-obstacle-success-rollout.gif",
            alt: "Animated rollout GIF from Apollo Labs run_3ea5136506, a 100 percent success obstacle-avoidance PPO run",
          },
          {
            src: "/projects/apollo-labs/apollo-labs-obstacle-run-detail.png",
            alt: "Apollo Labs run detail view for a 100 percent success obstacle-avoidance PPO run",
          },
          {
            src: "/projects/apollo-labs/apollo-labs-agentmail.png",
            alt: "Apollo Labs AgentMail inbox with a selected RL run report loaded in the message preview",
          },
          {
            src: "/projects/apollo-labs/apollo-labs-memory.png",
            alt: "Apollo Labs Nia memory page with a selected lesson showing run metrics and recommendations",
          },
        ],
      },
    },
    {
      name: "NIGEL",
      desc: "Navigation, Incident Guidance, and Emergency Localization & Control — a mission-control interface for the Future Interfaces hackathon. Think air traffic control for firefighters: helmet VSLAM point clouds, multi-unit video feeds, radio transcripts, and tactical mapping in one dispatcher dashboard.",
      tags: ["Next.js", "Three.js", "ROS 2", "WebSockets", "C++", "SLAM"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/NIGEL-hackathon" }],
      detail: {
        award: "1st Overall @ transpose/compiled-5 UCSD Hackathon",
        hook: "Air traffic control, but for firefighters on a floor plan: multiple video feeds, a growing 3D map from the helmet rig, and a radio panel that drives what you see on the map.",
        overview:
          "Our team built this for the Transpose VC × compiled-5 hackathon series at UC San Diego. We shipped a dispatcher-facing web console that turns helmet rigs and incoming body-cam feeds into live VSLAM-style mapping, plus an agent layer that helps interpret radio traffic and surface events and hazards inside one unified command center. The stack is a Next.js frontend with ROS 2 packages for Odin hardware integration, SLAM cloud accumulation, and WebSockets that stream mapping and camera data to the UI in real time. The radio/event agent runs on Cerebras for low-latency inference.",
        highlights: [
          "Dispatcher and firefighter views in one Next.js app: live video tiles, a Three.js point-cloud map, floor-plan search, and radio transcripts.",
          "ROS 2 reads depth and point clouds from Odin helmets and streams SLAM maps to the browser over WebSockets.",
          "One WebSocket API syncs cameras, maps, and UI so multiple units share the same tactical picture.",
        ],
        videoEmbedUrl: "https://www.youtube.com/embed/rzGtTom3oS8",
      },
    },
    {
      name: "Crucible Compute",
      desc: "Deploy GPUs with natural language and find cost arbitrage across cloud providers. A control plane that routes inference workloads across local Docker, Kubernetes, Vultr, Vast, and llama.cpp while automatically finding the cheapest, fastest hardware matches for your models.",
      tags: ["Python", "SQLite", "Docker", "llama.cpp", "MCP"],
      links: [
        { label: "Live demo", href: "https://ayxkkrd7.insforge.site/" },
        { label: "GitHub", href: "https://github.com/Trolleroof/nozomio-hackathon" },
      ],
      detail: {
        award: "Top 6 @ Nozomio Hackathon",
        hook: "Just describe what you want to run, and Crucible finds the best GPU deal and deploys it, no infrastructure knowledge required.",
        overview:
          "A GPU workload routing platform that turns natural language into optimized deployments: describe your model and workload, and Crucible searches across NVIDIA, AMD, TPU, Intel Gaudi, and Apple Silicon capacity to find the cheapest, fastest placement. The system normalizes hardware inventory across local Docker, Kubernetes clusters, and cloud providers (RunPod, Lambda Cloud, CoreWeave, Vultr, Vast), benchmarks candidate placements in real time, and routes inference through a unified OpenAI-compatible gateway. Built on Python with SQLite state management, it includes explicit spend approval gates before launching paid GPU instances and produces canonical deployment records for reproducibility and cost auditing.",
        highlights: [
          "Live GPU catalog across RunPod, Lambda, CoreWeave, Vast, and Vultr to pick the cheapest viable option.",
          "Benchmarks drive placement—each plan shows cost, speed, and why that hardware was chosen.",
          "Describe the job in plain English; paid GPU launches wait for your approval.",
          "Every deployment logs config, runs, metrics, and cost in versioned records.",
        ],
        galleryImages: [
          {
            src: "/projects/crucible-compute/landing.png",
            alt: "Crucible Compute landing page showing the private GPU deployment backend workflow",
            emphasize: true,
          },
          {
            src: "/projects/crucible-compute/dashboard.png",
            alt: "Crucible Compute dashboard with deployment status, endpoint health, and context panels",
          },
          {
            src: "/projects/crucible-compute/deploy.png",
            alt: "Crucible Compute new deployment planner with model, objective, and plan preview controls",
            emphasize: 'strong',
          },
          {
            src: "/projects/crucible-compute/providers.png",
            alt: "Crucible Compute provider status table showing GPU cloud capabilities and missing credentials",
            emphasize: 'strong',
          },
          {
            src: "/projects/crucible-compute/context.png",
            alt: "Crucible Compute context page showing Nia evidence hits, source coverage, and cited deployment context",
            emphasize: true,
          },
          {
            src: "/projects/crucible-compute/agent-access.png",
            alt: "Crucible Compute agent access page showing MCP server, API token, and CLI configuration",
          },
        ],
      },
    },
    {
      name: "Motion",
      desc: "Crowdsourced marketplace for robot training data. Contributors record industrial motions via their phone, and an automated verification pipeline (Gemma 4 VLM + Kimi K2 decision agent) scores and mints verified clips to a dataset marketplace. Built @ Stanford × DeepMind Hackathon.",
      tags: ["Next.js", "Express", "Gemma 4", "Kimi K2", "MediaPipe", "Google Cloud Run"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/Motion-StanfordDeepMind" }],
      detail: {
        hook: "Crowdsource robot training data—record a motion clip with your phone, get verified by AI, and see it sold on the marketplace.",
        overview:
          "Motion is a crowdsourced marketplace for robot training data built at the Stanford × DeepMind Hackathon. Contributors record 30-second industrial manipulation clips (pick & place, valve turns, box stacking) using their webcam with live MediaPipe skeleton overlay. Each submission runs through an automated multi-agent verification pipeline: Gemma 4 analyzes video semantics (task match, hand visibility, motion completeness), and Kimi K2 acts as a decision agent that either approves the clip (assigns price tier and mints to marketplace) or requests re-recording with actionable feedback. Approved clips are bundled with pose JSON, quality scores, and metadata thats ready for robotics companies building physical AI models. The platform replaces traditional data collection with real-world, incentive-driven motion data.",
        highlights: [
          "Live MediaPipe skeleton overlay during recording; instant pose confidence + motion variety scoring.",
          "Gemma 4 VLM analyzes each clip for task match, object interaction, and motion quality; returns structured JSON.",
          "Kimi K2 decision agent approves or rejects with tool calling—clips below quality threshold get specific feedback.",
          "Approved clips mint to marketplace with composite quality score, price tier ($0.50–$4.00), and downloadable dataset bundle.",
          "Dataset export compatible with LeRobot and Open X-Embodiment robotics frameworks.",
        ],
        videoEmbedUrl: "", // TODO: Add YouTube video link
      },
    },
    {
      name: "CaféCode",
      desc: "Cafecode: an AI coding tutor and browser-native project builder. Next.js, Monaco, WebContainer, Supabase, WebSockets, Gemini, Stripe, and an Express/Fly.io backend give learners a full coding workspace while keeping them in control of what they build.",
      tags: ["Next.js", "Monaco", "WebContainer", "Express", "Node", "Supabase"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/cafecode" }],
      detail: {
        hook: "Browser-native dev box: edit, run Python, ask the model, without leaving the tab.",
        overview:
          "Cafecode is a full-stack AI coding tutor for building real projects while understanding the code. The frontend uses Next.js, TypeScript, Tailwind, shadcn/ui, Monaco, and WebContainer for a VS Code-like editor, terminal, npm installs, file operations, and browser-native execution. The Express backend coordinates AI orchestration, workspace management, Stripe payments, file sync, and Supabase-backed auth.",
        highlights: [
          "Brewster guides you with hints, fixes, in-browser run, and step-by-step setup—no local install.",
          "WebContainer runs the terminal and files in the browser, so npm install and edits stay fast with less server load.",
          "Gemini reads your project for creation, fixes, and chat right beside the Monaco editor.",
          "Supabase auth, WebSocket sync, rate limits, and Fly.io deploy back a real multi-user workspace.",
        ],
        videoEmbedUrl: "https://www.youtube.com/embed/0IPA8BSmDp8",
        galleryImages: [
          {
            src: "/projects/cafecode/bitter-truth-hero.png",
            alt: "CaféCode landing — “The Bitter Truth” story framing why intentional coding practice still matters",
          },
          {
            src: "/projects/cafecode/core-features.png",
            alt: "Core Features grid — Brewster AI assistant, smart code fixes, built-in compiler, web viewer, intelligent project guidance",
          },
          {
            src: "/projects/cafecode/project-brewer-ide.png",
            alt: "Project Brewer workspace — explorer, Monaco editor with guided steps, and Cody assistant panel",
          },
        ],
      },
    },
  ],
  experience: [
    {
      role: "Desktop Agent Developer - Founder",
      place: "UCSD Agent Development (Clue2)",
      organization: "UC San Diego",
      date: "Jan 2025 - Present",
      logo: {
        src: "/org-logos/triton-removebg-preview.png",
        alt: "UC San Diego Triton logo",
      },
      desc: "Architected a cross-platform Electron + TypeScript desktop agent that processes live meetings and executes tasks across user apps. Built real-time transcription, natural-language workflow automation across Gmail, Calendar, Docs, Sheets, Slack, and Notion, and scaled the beta to 40+ users with early adoption from YC startups.",
    },
    {
      role: "Research Assistant",
      place: "AI for Circuit Invention",
      organization: "UC San Diego",
      date: "Mar 2026 - Present",
      logo: {
        src: "/org-logos/triton-removebg-preview.png",
        alt: "UC San Diego Triton logo",
      },
      desc: "Developing an LLM-based pipeline for automated generation and verification of novel analog circuit topologies. Integrating LLM APIs with Cadence simulation tools and exploring reinforcement learning strategies for circuit design space search.",
    },
    {
      role: "Lead Researcher - IEEE ICHCI Presenter",
      place: "Foot Drop Ankle-Foot Orthosis Research",
      organization: "Georgia Tech",
      date: "May 2024 - Nov 2024",
      logo: {
        src: "/org-logos/georgia-tech.png",
        alt: "Georgia Tech logo",
      },
      desc: "Conducted research at Georgia Tech's mmWave Antennas Laboratory on a 3D-printed ankle-foot orthosis controlled through electromyography signals. Built a custom motor actuator system, improved gait response precision by 23%, and presented the work at IEEE ICHCI 2024.",
    },
    {
      role: "Lead Researcher",
      place: "Brain-Computer Interface Device Research",
      organization: "Stanford University",
      date: "Oct 2023 - Dec 2024",
      logo: {
        src: "/org-logos/stanford-block-s.png",
        alt: "Stanford University logo",
      },
      desc: "Led BCI device research at Stanford's Lee-Messer Lab to help motor-impaired students communicate through neural signals. Benchmarked P300 EEG models and built a React Native assistive-learning frontend piloted with 12 patient users.",
    },
    {
      role: "Founder",
      place: "SoloScale Solutions",
      organization: "Self-employed · San Francisco Bay Area · On-site",
      date: "Mar 2023 - Jun 2025",
      logo: {
        src: "/org-logos/soloscale.png",
        alt: "SoloScale Solutions logo",
      },
      desc: "Founded a consulting agency that helped small, local businesses implement AI automations and technology to increase inbound leads, handle customer service, and automate mundane tasks. Served 10+ businesses and nonprofits over the course of the business - learned a ton.",
    },
  ],
  publications: [
    {
      title: "Unraveling Co-Heritability of Antibiotic Resistance in Tuberculosis Evolution",
      conference: "2025 17th International Conference on Bioinformatics and Biomedical Technology",
      date: "May 26, 2025",
      url: "https://ieeexplore.ieee.org/document/11276470/metrics#metrics",
      isPeerReviewed: true,
      description: "Studied multidrug-resistant tuberculosis by modeling the genetic co-heritability of Rifampicin and Isoniazid resistance using k-mer analysis and machine learning. Built a genomic prediction model with 85.68% accuracy on 2,200 samples, identifying key resistance-associated k-mers in rpoB and katG, highlighting the potential of genomic data for rapid TB resistance detection.",
    },
    {
      title: "Real-Time EMG Control for Assistive Devices: Optimizing Sensor Placement for Foot Drop Rehabilitation",
      conference: "IEEE International Conference on Intelligent Computing and Human-Computer Interaction",
      date: "Dec 27, 2024",
      url: "https://ieeexplore.ieee.org/xpl/conhome/10807847/proceeding",
      isPeerReviewed: true,
      description: "Foot drop, a condition that impairs foot mobility due to weakened dorsiflexor muscles, increases the risk of falls and unstable gait. This study investigates the use of electromyography (EMG) signals from functional muscles to control assistive devices for individuals with foot drop, focusing on optimal sensor placement for accurate signal acquisition. Using Arduino-based hardware and MATLAB algorithms, EMG signals were recorded from targeted muscles during controlled ankle movements, with Butterworth filtering and smoothing applied to enhance signal clarity. A 3D virtual actuation model demonstrated real-time control of object movements based on EMG data, achieving a strong correlation (R = 0.968) between EMG amplitude and actuator precision. These results suggest that accurate EMG-based control is feasible for developing effective assistive devices, improving mobility in individuals with foot drop.",
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
