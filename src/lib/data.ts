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

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
  tag?: string;
  readTime?: string;
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
  blog: BlogPost[];
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
        "Robotics",
        "RL & policy at scale",
      ],
    },
    { label: "Recently", value: "Building at Vern Robotics, formerly building @ Clue2" },
    { label: "Location", value: "San Francisco Bay Area" },
    { label: "Values", value: "Family, Faith, Hard Work" },
    {
      label: "Hackathons",
      lead: "10 wins",
      chips: [
        "Amazon",
        "Bow Capital",
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
  bioOutro: "the goal in life is to conquer high peaks that reward iteration, fulfillment, and relentless improvement without brute-forcing in the wrong direction.",
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
        { name: "Gymnasium" },
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
      name: "DroneOS",
      desc: "End-to-end autonomous drone platform that identifies targets, navigates without GPS, and coordinates swarm behavior without communication — built by team Outcast Virus and awarded 1st Overall at the Bow Capital × DS3 × SIC hackathon at UC San Diego.",
      tags: ["Swarm RL", "Behavioral Cloning", "MAPPO", "YOLOX", "Norfair", "SLAM", "Visual Odometry", "3D Gaussian Splatting"],
      links: [
        { label: "Devpost", href: "https://devpost.com/software/outcast-virus" },
        { label: "GitHub", href: "https://github.com/Trolleroof/bow-capital-hackathon" },
      ],
      detail: {
        award: "1st Overall @ Bow Capital × DS3 × SIC Hackathon",
        hook: "An operating system for drones to run in swarms autonomously on edge devices — no WiFi, no GPS, no comms.",
        overview:
          "DroneOS is an end-to-end autonomous drone platform that can identify targets, navigate without GPS, and coordinate swarm behavior without explicit communication. For perception, we run real-time multi-object detection with YOLOX and track identities over time with Norfair so targets can be re-acquired even after leaving the frame. For onboard autonomy, the stack couples a SLAM pipeline (visual odometry + mapping) with a geo-referenced 3D reconstruction using Gaussian Splatting. For swarm behavior, we trained policies using behavioral cloning + MAPPO so drones can move together and complete tasks without having to rely on GPS or communications that could get jammed.",
        highlights: [
          "RL Swarms: behavioral cloning + MAPPO to learn coordination and task completion without communication.",
          "YOLOX + Norfair tracking: real-time detection + multi-object tracking that re-identifies targets after occlusion/out-of-frame.",
          "Friend-or-Foe classification: on-device labeling of detected entities as friendly or hostile.",
          "Autonomous localization + mapping: GPS-denied pose tracking via SLAM with geo-referenced 3D maps via Gaussian Splatting.",
        ],
        videoFileUrl: "/projects/droneos/combatos-demo.mp4",
      },
    },
    {
      name: "SODIUM",
      desc: "Voice-first AI companion for senior care: an autonomous robot with natural speech interaction, wake-word detection, medication reminders, crisis detection, and a caregiver monitoring dashboard. Frontend built with Svelte 5 and Bun runtime for a lightweight, responsive experience.",
      tags: ["ROS 2", "Bun", "TypeScript", "Python", "Embedded Systems"],
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
        award: "5th Place @ Nozomio Hackathon",
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
      name: "Battle Angel",
      desc: "Rescue mission control for simulated disaster response. PPO training on eight MuJoCo simulation environments, Gemini environment generation, and a language-driven console with live rollouts and GIF replay.",
      tags: ["Next.js", "FastAPI", "MuJoCo", "PPO", "Gemini", "Three.js"],
      links: [{ label: "GitHub", href: "https://github.com/aravindkrishna2008/disaster-rescue" }],
      detail: {
        hook: "Train in simulation, spin up new disaster scenes from language, then watch a PPO policy navigate environments it has never seen.",
        overview:
          "Battle Angel trains a Unitree G1 humanoid to reach survivors across simulated disaster environments. The Training Gym runs vectorized PPO on eight MuJoCo scenes, from earthquake corridors to buried-rubble triage. The Scene Generator turns plain-language disaster descriptions into new layouts with a Three.js preview. The Interactive Console is where you can see the policy perform in an unknown environment. You are able to set triage priorities in natural language, Gemini picks the target, and a trained policy executes a rollout in an unseen environment with live telemetry and GIF replay.",
        highlights: [
          "Training Gym: vectorized PPO on eight MuJoCo disaster scenes with parallel runs, learning curves, and rollout GIFs.",
          "Scene Generator: plain-language descriptions become new disaster layouts with instant Three.js preview.",
          "Interactive Console: natural-language triage drives a trained policy through environments it has never trained on, with live reach outcomes and GIF replay.",
          "Unitree G1 humanoid in MuJoCo: 21D observations, locomotion assist, and reach-based success across visible and buried survivor scenarios.",
        ],
        videoEmbedUrl: "https://www.youtube.com/embed/QL_UhVSLMKc",
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
  blog: [
    {
      slug: "building-in-public",
      title: "Why I keep building in public",
      date: "Aug 10, 2026",
      excerpt:
        "Shipping side projects taught me more about taste than any course. This is the loop I use: pick a problem I can't stop thinking about, build the smallest version that proves the idea, and write down what broke.",
      tag: "notes",
      readTime: "4 min",
      body: [
        "I've shipped more unfinished projects than I can count, and every one changed how I think about the next build.",
        "The loop is simple: pick something I can't stop thinking about, build the smallest version that proves the idea, ship it somewhere public, and write down what broke.",
        "Public builds force honesty. You can't hide behind a roadmap when the demo either works or it doesn't. That pressure is uncomfortable, but it's also the fastest way I've found to develop taste.",
        "This post is placeholder copy for now — I'll replace it with a real essay soon.",
      ],
    },
    {
      slug: "desktop-agents",
      title: "Agents that actually do work on your desktop",
      date: "Jul 22, 2026",
      excerpt:
        "Clue2 started as a meeting copilot and turned into a broader question: how do you give an agent enough context to act across Gmail, Calendar, and Slack without turning the UI into a control panel?",
      tag: "build log",
      readTime: "6 min",
      body: [
        "Desktop agents fail when they ask you to manage them. The whole point is that the agent should absorb complexity, not add another dashboard to your day.",
        "With Clue2, the interesting design question wasn't transcription — it was orchestration. How much context does an agent need before it can safely draft an email, move a calendar block, or summarize a thread across apps?",
        "Temporary draft: I'll expand this into a proper build log with architecture notes, failure modes, and what we learned from beta users.",
      ],
    },
    {
      slug: "hackathons-compressed",
      title: "Hackathons as compressed product cycles",
      date: "Jun 14, 2026",
      excerpt:
        "Forty-eight hours forces clarity. The projects that win aren't the ones with the most features — they're the ones with one sharp demo moment and a story that makes the judges lean in.",
      tag: "reflection",
      readTime: "3 min",
      body: [
        "A hackathon is a product cycle with the paperwork removed. You have a problem, a team, a deadline, and one shot to make strangers believe the thing works.",
        "The teams that win usually do less, not more. One sharp demo moment beats ten half-finished tabs every time.",
        "Placeholder reflection — more thoughts on demo craft and scope discipline coming later.",
      ],
    },
    {
      slug: "first-week-vern",
      title: "First week building at Vern Robotics",
      date: "Aug 4, 2026",
      excerpt:
        "Early notes from joining a robotics team: calibration rituals, sim quirks, and why the first week is mostly listening before you touch the stack.",
      tag: "field notes",
      readTime: "5 min",
      body: [
        "Week one at a robotics company is mostly calibration — literally and figuratively. You learn how the team names things, where sim diverges from hardware, and which problems are sacred.",
        "I'm still in listen mode. The goal is to understand the system's failure modes before proposing changes.",
        "Temporary entry — will update once I have more to share publicly.",
      ],
    },
    {
      slug: "rl-and-taste",
      title: "What RL projects taught me about taste",
      date: "May 30, 2026",
      excerpt:
        "Training loops, reward hacking, and rollout GIFs all teach the same lesson: metrics lie unless you know what good behavior looks like before you optimize for it.",
      tag: "notes",
      readTime: "4 min",
      body: [
        "Reinforcement learning makes you articulate success before you chase it. If you can't describe the behavior you want, the policy will find a weird shortcut and call it victory.",
        "Rollout GIFs saved me more than loss curves. Seeing the agent fail in space beats staring at a scalar that looks fine.",
        "Draft placeholder — planning a longer piece on eval design for side projects.",
      ],
    },
    {
      slug: "spatial-ui-sketch",
      title: "Sketch: spatial interfaces without the gimmick",
      date: "Apr 18, 2026",
      excerpt:
        "Three ideas for making 3D and spatial UI feel useful instead of flashy — anchoring, progressive disclosure, and letting the map breathe.",
      tag: "sketch",
      readTime: "2 min",
      body: [
        "Spatial UI fails when it asks users to admire the interface instead of finish the task. The fix is usually boring: anchor controls to real objects, reveal depth slowly, and keep the map readable at a glance.",
        "This is a stub post for layout testing on the blog page.",
      ],
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
