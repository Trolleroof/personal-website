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
  /** Shown on the homepage projects panel; full list lives at /projects. */
  featured?: boolean;
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
    { label: "Location", value: "SF Bay Area" },
    { label: "Values", value: "Family, Faith, Hard Work" },
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
      featured: true,
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
      featured: true,
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
      featured: true,
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
            emphasize: "strong",
          },
          {
            src: "/projects/crucible-compute/providers.png",
            alt: "Crucible Compute provider status table showing GPU cloud capabilities and missing credentials",
            emphasize: "strong",
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
    {
      name: "PREVUE",
      featured: true,
      desc: "A pre-execution world model verifier for robot skills. Claude proposes a pick-and-place plan, a learned action-conditioned world model imagines the outcome from camera frames, and a verifier predicts failure so the plan gets repaired before the arm ever moves.",
      tags: ["V-JEPA", "World Models", "MuJoCo", "PyTorch", "Claude", "Robot Planning"],
      links: [
        { label: "Blog post", href: "/blog/prevue-world-model-verifier" },
        { label: "GitHub", href: "https://github.com/Trolleroof/skill-level-world-model" },
      ],
      detail: {
        hook: "Coding agents can write fluent robot plans, but nothing tells them a grasp is six centimeters off until the arm has already missed.",
        overview:
          "PREVUE adds a checkpoint between the plan and the robot. A task in plain English becomes a structured pick-and-place trace from Claude, and a learned action-conditioned world model imagines roughly four seconds of motion from an observation window plus that action trace. An outcome head predicts whether the block lifts, whether it lands in the target zone, and whether the skill succeeds, along with an uncertainty score. If the imagined rollout looks bad, Claude gets the metrics and the likely failure back and repairs the waypoints; only an approved plan runs in MuJoCo. The model is a small head trained on 5,000 generated episodes on top of a frozen V-JEPA visual encoder.",
        highlights: [
          "Injected a deliberate six-centimeter grasp miss: the verifier scored the plan at 7.3% success, Claude re-aimed at the observed block centre, and the repaired plan scored 94.7% and landed 2.3 cm from the pad.",
          "Across eight scenes with the same injected miss, unverified execution recovered 0/8 while world-model verification caught the bad plan 8/8 and succeeded 6/8.",
          "A geometry-only checker with oracle block positions edged it 7/8 — a useful upper bound for the vision-only approach.",
          "Out-of-distribution asks (block-on-block instead of block-on-pad) are the clear weak spot, since the training corpus only covers the green pad.",
        ],
        galleryImages: [
          {
            src: "/blog/prevue-world-model-verifier/prevue_demo.gif",
            alt: "PREVUE demo — unverified failure versus verified repair on the same flawed grasp plan",
            emphasize: true,
          },
          {
            src: "/blog/prevue-world-model-verifier/demo-sweep-success.svg",
            alt: "Success rate across the eight-scene demo sweep for unverified, world-model, and geometry-only verification",
          },
          {
            src: "/blog/prevue-world-model-verifier/lifted-by-window.svg",
            alt: "Predicted lift probability as a function of the observation window length",
          },
        ],
      },
    },
    {
      name: "EgoGoal",
      featured: true,
      desc: "Teaching a Unitree G1 humanoid to score a penalty kick in MuJoCo. Human penalty-kick motion is retargeted through a pelvis-local frame, then a differentiable proxy warm-starts a CEM search that turns a 3.7 m dribble into accurate shots to both corners.",
      tags: ["MuJoCo", "PyTorch", "Motion Retargeting", "CEM", "Unitree G1", "Humanoids"],
      links: [
        { label: "Blog post", href: "/blog/teaching-a-humanoid-to-score-a-penalty" },
        { label: "GitHub", href: "https://github.com/Trolleroof/egogoal-amd-hackathon" },
      ],
      detail: {
        hook: "Copied human motion looked like a kick and behaved like a nudge — with real turf friction the ball stopped 3.7 meters short of a 10.5 meter goal.",
        overview:
          "Starting from SoccerKicks clips and their per-frame 3D HMMR joint annotations, I built a pelvis-local coordinate frame per frame so limb vectors are measured relative to the person's own orientation rather than the camera, then clamped every joint to the G1's range. Retargeting produced kick-shaped motion but no foot speed or force transfer, so optimization split in two: a small PyTorch proxy runs gradients to guess backswing and strike timing in about 400 Adam steps, and Cross-Entropy Method search in the full simulator (48 candidates × 12 rounds) tunes hip, knee, and ankle targets around contact, plant-leg bracing, playback speed, and pelvis yaw. MuJoCo physics always cast the deciding vote, and all 29 joints blend back to a neutral stand after contact so the G1 stays upright.",
        highlights: [
          "Untuned retargeted motion: 2.1 m/s, ball dead at 3.7 m. Optimized center shot: 9.94 m/s, crossing essentially dead on target.",
          "Left- and right-corner shots reached 7.32 m/s and 5.92 m/s, each crossing 0.01 m from their target.",
          "Pelvis-local retargeting removes camera angle from the pose data and keeps joints inside the G1's limits.",
          "Interactive demo: place the keeper anywhere across the goal mouth and a tiny supervised net maps that to lane, power, tempo, and yaw — the replay is the actual verification rollout.",
        ],
        videoFileUrl: "/blog/humanoid-penalty/behind-goal.mp4",
        galleryImages: [
          {
            src: "/blog/humanoid-penalty/thumbnail.png",
            alt: "Unitree G1 humanoid striking a penalty kick in MuJoCo",
            emphasize: true,
          },
          {
            src: "/projects/egogoal/source-motion.gif",
            alt: "Human penalty-kick source motion from the SoccerKicks dataset used for retargeting",
          },
          {
            src: "/projects/egogoal/kick-follow-through.gif",
            alt: "Close replay of the optimized G1 kick and its follow-through in MuJoCo",
          },
        ],
      },
    },
    {
      name: "ACT-YOLO",
      desc: "Object-centric imitation policy that augments ACT with YOLOv8 detections for pick-and-place under visual corruption.",
      tags: ["Robotics", "Imitation Learning", "Computer Vision"],
      links: [
        { label: "Blog post", href: "/blog/act-yolo-object-centric-robot-policies" },
        { label: "GitHub", href: "https://github.com/Trolleroof/act-yolo" },
      ],
      detail: {
        hook: "Does explicit object location help a manipulation policy when the camera feed gets noisy, blurry, dark, and compressed?",
        overview:
          "ACT-YOLO pairs Action Chunking Transformers with YOLOv8 boxes for the cube and target zone in a MuJoCo pick-and-place task. I trained matched baseline and guided policies on the same demonstrations, then ran paired rollouts across four corruption severities with McNemar's test.",
        highlights: [
          "Paired baseline vs. ACT-YOLO evaluation on 50 matched scene seeds per corruption level.",
          "Corruption-matched YOLO training raised cube recall from 0.03 to 0.98 at high severity.",
          "Largest gain at high corruption: 18% vs. 4% success (p = 0.039); clean-task rates stayed low on both.",
        ],
        galleryImages: [
          {
            src: "/blog/act-yolo/thumbnail.gif",
            alt: "Simulated pick-and-place rollouts comparing baseline ACT and ACT-YOLO under visual corruption",
            emphasize: true,
          },
          {
            src: "/blog/act-yolo/robustness-curve.png",
            alt: "Success rate vs. visual corruption severity for baseline ACT and ACT-YOLO",
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
      organization: "Self-employed · SF Bay Area · On-site",
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

export function getFeaturedProjects(): Project[] {
  return PROFILE.projects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return PROFILE.projects;
}
