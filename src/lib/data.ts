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
  body: (string | { heading: string })[];
  clips?: { src: string; label: string }[];
  links?: { label: string; href: string }[];
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
  status?: string;
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
  sidebar: [
    { label: "Recently", value: "tinkering on robotics-related projects" },
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
  bioIntro: "hey I'm Nikhil. I've always learned by getting obsessed with a problem and sticking with it long enough to build real taste.",
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
      slug: "teaching-a-humanoid-to-score-a-penalty",
      title: "How I taught a humanoid to score a penalty kick",
      date: "Aug 12, 2026",
      excerpt:
        "A human kick only moved the ball 3.7 meters after I retargeted it to a Unitree G1. Here is how pelvis-local motion mapping, a differentiable warm start, and MuJoCo search turned it into accurate shots to either corner.",
      clips: [
        { src: "/blog/humanoid-penalty/source-motion.mp4", label: "1 / Human source motion" },
        { src: "/blog/humanoid-penalty/behind-goal.mp4", label: "2 / Behind goal — ball crossing" },
        { src: "/blog/humanoid-penalty/kick-follow-through.mp4", label: "3 / Close replay — follow-through" },
      ],
      links: [
        { label: "X thread", href: "https://x.com/nikhilaprabhu/status/2077099481288651133" },
        { label: "GitHub", href: "https://github.com/Trolleroof/egogoal-amd-hackathon" },
      ],
      body: [
        "I wanted to see whether I could take a human penalty kick and make a Unitree G1 reproduce it in simulation. The idea came from watching the World Cup: start with a real person's motion, preserve the parts that make the kick recognizable, then let physics decide what has to change for a humanoid body.",
        "The first version looked like a kick but did not behave like one. With realistic turf friction in MuJoCo, the ball stopped after 3.7 meters. The goal was 10.5 meters away. That failure became the useful part of the project: copying a pose is not the same as transferring a skill.",
        { heading: "Turning a human clip into robot motion" },
        "I started with the 12_penalty clip from the SoccerKicks dataset and its per-frame 3D HMMR joint annotations. A direct joint-angle copy would not work because a human and a G1 have different proportions, joint limits, mass distribution, and zero-pose conventions.",
        "Instead, I built a coordinate frame around the person's pelvis for every frame. The hip line and the neck-to-hip direction define local down, left, and forward axes. From there I measured limb vectors relative to the person's own orientation, converted them into hip, knee, ankle, shoulder, elbow, and waist angles, and expressed most of them as changes from the initial standing pose.",
        "That pelvis-local representation removed the camera angle from the problem and kept the character of the original motion. I also clamped every mapped joint to the G1's usable range so a noisy pose estimate could not send the simulator into an impossible configuration.",
        { heading: "Why the retargeted kick still failed" },
        "Kinematic retargeting answers where the joints should go. It does not answer whether the robot can create enough foot speed, transfer momentum through contact, or stay balanced while doing it. Those are dynamics questions.",
        "The difference only became obvious after I gave the virtual pitch meaningful rolling friction. A weak kick no longer glided forever. It died at 3.7 meters, which made the benchmark honest: reach the goal line, cross near the requested lane, and do it inside the same MuJoCo model that would render the final replay.",
        { heading: "A hybrid optimizer instead of one giant training run" },
        "MuJoCo's rigid-body contacts are not something I could simply backpropagate through, so I split the problem in two. First, a small differentiable PyTorch proxy warm-started the contact-critical motion. It tuned the backswing and strike residuals with 400 Adam steps in under a second on an AMD Instinct MI300X. The proxy proposed a candidate; it never got to declare that the kick worked.",
        "Then Cross-Entropy Method search took over in the real simulator. Each candidate changed a compact set of controls: right hip, knee, and ankle residuals at three moments around contact; support-leg bracing; playback speed; and pelvis yaw. For each target I sampled 48 candidates, ran their MuJoCo rollouts in parallel, kept the elite results, refit the sampling distribution, and repeated that process for 12 generations.",
        "The objective rewarded a ball that crossed the goal line near the requested target, favored useful speed, and charged a small penalty for drifting too far from the human motion. This was much more sample-efficient than training a full policy from scratch, while still making contact physics the final judge.",
        "After contact, I blended all 29 actuated joints back toward a neutral standing pose. That recovery phase mattered: a kick that scores but leaves the robot collapsed is not a convincing transferred skill.",
        { heading: "The shots that came out" },
        "The untuned motion topped out around 2.1 m/s and stopped at 3.7 meters. The optimized left-corner kick reached 7.32 m/s and crossed 0.01 meters from its target. The center shot reached 9.94 m/s and crossed essentially dead on. The right-corner shot reached 5.92 m/s and also finished 0.01 meters from its target. All three scoring results came from MuJoCo rollouts, not from the differentiable proxy.",
        { heading: "Making it interactive" },
        "I wanted the demo to be more than three canned clips, so I added a goalie lab. You can place a keeper anywhere across the goal mouth. A small PyTorch network maps that one coordinate to four shot controls: target lane, power, tempo, and pelvis yaw.",
        "The network is deliberately tiny: one input, a 16-unit hidden layer, and four outputs. I trained it with supervised labels generated by searching real MuJoCo outcomes at 25 keeper positions. When you run it on the site, a Next.js API calls the Python pipeline, replays the selected action against your keeper in MuJoCo, renders several camera angles, and returns the result. The video is the verification rollout itself, not an animation that assumes the policy succeeded.",
        { heading: "What I learned" },
        "The biggest lesson was that motion imitation and physical success are separate stages. Human data gave the kick its structure. A differentiable proxy made optimization fast. Population search handled the contact dynamics that gradients could not. MuJoCo kept every claim grounded in the same physics environment.",
        "This is still simulation work, not proof that the trajectory can be deployed unchanged on a physical G1. Real hardware adds actuator latency, compliance, calibration error, safety constraints, and a much less forgiving floor. But as a simulation-first pipeline, it showed me a practical way to turn a human demonstration into a targeted, testable humanoid skill without throwing away the original motion or hiding behind a good-looking replay.",
      ],
    },
    {
      slug: "act-yolo-object-centric-robot-policies",
      title: "Can object detection make robot policies more robust?",
      date: "Jun 30, 2026",
      excerpt:
        "I built ACT-YOLO to test one focused idea: whether explicit object locations help an imitation policy keep working when its camera feed gets noisy, blurry, dark, and compressed.",
      links: [
        { label: "X thread", href: "https://x.com/nikhilaprabhu/status/2072014404955336923" },
        { label: "GitHub", href: "https://github.com/Trolleroof/act-yolo" },
      ],
      body: [
        "This started as my first mini research experiment rather than another open-ended robotics build. I wanted one question I could answer with a controlled comparison: when visual input gets corrupted, does giving an imitation policy an explicit representation of the important objects make it more robust?",
        "I chose a simulated pick-and-place task because it is simple enough to isolate perception, but still unforgiving. The robot has to find a small cube, grasp it, move it across the table, and release it inside a target zone. A few pixels of localization error can become a completely missed grasp.",
        { heading: "The experiment I built" },
        "I trained two Action Chunking Transformer policies in the same MuJoCo environment. The baseline received the robot's seven-dimensional joint state plus top and wrist camera images. ACT-YOLO received those exact inputs plus normalized YOLOv8 boxes for the cube and target zone: center, width, height, and confidence for each object.",
        "Everything else stayed matched. Both policies used the same demonstrations, ACT architecture, image augmentation, training schedule, and evaluation scenes. That left one intended difference between them: whether the policy also received an object-centric spatial signal.",
        "For demonstrations, I wrote a numerical-IK waypoint controller that moved through pre-grasp, grasp, lift, carry, and release phases. Each 400-step episode stored both camera views, joint positions, actions, and object boxes. I then trained both policies to predict chunks of 100 future actions instead of choosing only the next action one step at a time.",
        { heading: "Making the detector part of the experiment" },
        "I generated 5,000 detector images directly from MuJoCo. Segmentation renders gave me exact masks for the cube and target zone, which I converted into YOLO labels automatically. That avoided a manual labeling pass and kept the detector data tied to the same geometry as the task.",
        "My first detector looked strong on clean validation images and then collapsed on the small cube once I corrupted the camera feed. At medium and high corruption, cube recall fell to 0.17 and 0.03. The policy could not benefit from object guidance if the guidance disappeared exactly when vision became difficult.",
        "The fix was to train YOLO with the same corruption family used at evaluation: Gaussian noise, blur, brightness and contrast shifts, and JPEG compression. With the training data and epoch count held fixed, corruption augmentation raised cube recall at medium severity from 0.17 to 1.00 and at high severity from 0.03 to 0.98 in the controlled detector check.",
        "I also added box jitter and dropout while training ACT-YOLO. Feeding perfect boxes during training and imperfect detections during evaluation would have created another hidden distribution shift. The policy needed to learn that a detector output is useful evidence, not ground truth.",
        { heading: "Keeping the comparison fair" },
        "A weak baseline would make the idea look better than it was, so both ACT policies saw identical image corruption during training. During evaluation, both faced the same 50 scene seeds at each of four corruption levels. I compared paired successes with McNemar's test and reported Wilson confidence intervals instead of treating a few lucky rollouts as a conclusion.",
        "That paired design mattered. Without it, a policy could get easier cube positions by chance and I might mistake scene variation for a model improvement. Matching the rollouts made each result a direct baseline-versus-guided comparison on the same task instance.",
        { heading: "What happened" },
        "ACT-YOLO beat the baseline at every tested severity: 12% versus 4% on clean images, 6% versus 4% at low corruption, 14% versus 6% at medium corruption, and 18% versus 4% at high corruption. The largest gap was at the highest severity, where the guided policy completed 9 of 50 rollouts and the baseline completed 2 of 50. That 14-point difference was the only statistically significant result, with p = 0.0391.",
        "The honest interpretation is narrower than 'object detection solves robust manipulation.' The baseline was already near the floor, and ACT-YOLO still failed most rollouts. The experiment gives evidence that explicit object locations can help under severe visual corruption, but it does not yet show a strong manipulation policy or prove that the same gain transfers to a real robot.",
        { heading: "What I would change next" },
        "The next useful run is not a bigger model by default. I would first lift the clean-task success rate so corruption has more performance to degrade, then repeat the paired sweep across more seeds. I would also add a ground-truth-box policy to separate the value of object-centric state from the errors introduced by YOLO.",
        "What I liked about this project was the research loop: state one falsifiable question, find the confounders, build gates before expensive training, and keep the final claim no larger than the evidence. The most valuable implementation work was not adding another network. It was making sure the comparison actually measured the idea I cared about.",
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
    headline: "tui [games in your coding terminal]",
    detail:
      "teaching ai what's fun",
  },
};
