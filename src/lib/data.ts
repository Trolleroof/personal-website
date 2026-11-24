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
  currentFocus: {
    headline: string;
    detail: string;
    footRight?: string;
    href?: string;
  };
}

export const PROFILE: ProfileData = {
  resumeUrl: "/resume.pdf",
  resumePreviewUrl: "/resume-preview.png",
  avatarUrl: "/profile-avatar.png",
  name: "Nikhil Prabhu",
  handle: "Trolleroof",
  byline: "robot learning · LLM evals · systems",
  sidebar: [
    { label: "Recently", value: "evals and fine-tuning VLAs/WMs" },
    { label: "Location", value: "SF Bay Area" },
    { label: "Values", value: "Family, Faith, Hard Work" },
  ],
  bioIntro: "I'm Nikhil. I do research in robot learning, LLM evals, and sometimes both, usually starting from a specific question and building the experiment to see what actually happens.",
  obsessions: [
    { label: "basketball", icon: "basketball" },
    { label: "video games", icon: "gamepad" },
    { label: "content creation", icon: "camera" },
    { label: "running a business", icon: "business" },
    { label: "building software", icon: "code" },
  ],
  bioOutro: "Most of what I learn comes from picking a problem I'm curious about, trying an approach, seeing where it breaks, and iterating until it works.",
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
      name: "MISE benchmark",
      featured: true,
      desc: "I wanted to see whether 19 frontier models could actually manage a restaurant shift under pressure. I also built a playable version to collect human traces for post-training, demoed it at True Ventures' Scrappy Sessions, and presented the results to Mercor's Code Data team at Mercor HQ.",
      tags: ["LLM Evals", "Operational Judgment", "APEX Rubric", "Deterministic Replay"],
      links: [{ label: "Whitepaper", href: "https://runretroarcade.com/benchmarks" }],
      detail: {
        hook: "18 of 19 models landed on almost the exact same outcome score, so the reasoning traces ended up being the interesting part.",
        overview:
          "I built MISE (Manager Intervention under Shift Escalation) to test whether frontier models make reasonable operational calls when running a restaurant. Scripted policies play the chef, supply manager, host, and server, and whenever a decision comes up the manager sees the current state and legal options, picks one, and writes a one-sentence reason. Every run is saved as a replayable trace.\n\nI set up different shifts to test specific failure modes. Quiet Tuesday checks whether a model spends money when nothing is actually wrong. Dinner Rush throws in a broken oven, and Saturday Night stacks arrivals, shortages, and kitchen bottlenecks all at once.\n\nNone of the choices are labeled safe or risky, so the model has to read the state and figure out what to do on its own.",
        highlights: [
          "I scored each run two ways. First, a deterministic replay grades Service, Resources, Recovery, and Safety. Then GPT-6 Luna judges each explanation against 8 APEX-style criteria using only the state the model saw, and the final score averages outcome and reasoning.",
          "GPT-5.5 came in first at 0.890, followed by Claude Opus 5 at 0.887 and GLM-5.3 at 0.883, while Grok 4.6 finished last at 0.766.",
          "18 of the 19 models landed between 85.0 and 85.2 on raw outcomes, so grading the reasoning traces is what actually separated them. GPT-5.5 passed 89 of 98 reasoning checks, while Grok 4.6 passed 72.",
          "Every model caught the allergy ticket, but not every model explained why sending out an allergen dish was dangerous, which surprised me. The top three models named the risk in 96% of reasons, compared with 66% for the bottom three.",
          "Saturday Night broke every model, with 0 of 19 passing. Models also invented urgency to justify spending: 26% of stove explanations cited demand that had already passed.",
          "More thinking tokens did not help. GPT-5.6 Sol spent about 35,500 tokens per episode and finished 12th, while GLM-5.3 Flash used around 5,300 and came in 5th.",
          "I live-demoed MISE onstage at True Ventures' Scrappy Sessions for panelists Kevin Rose, Madeline Minshew, and Michael Montano.",
          "After I published the results, a Mercor VP and APEX lead reached out and invited me to present the benchmark at Mercor HQ. Next I want to add expert-written shifts, measure agreement across humans, metrics, and model judges, and freeze a benchmark pack.",
        ],
        galleryImages: [
          {
            src: "/projects/mise/under-pressure.jpg",
            alt: "MISE evaluates whether frontier models can run a restaurant under pressure",
          },
          {
            src: "/projects/mise/leaderboard.jpg",
            alt: "MISE leaderboard: GPT-5.5 first at 0.890, then Claude Opus 5 and GLM-5.3, with rubric, safety, and tokens per episode",
          },
          {
            src: "/projects/mise/key-findings.jpg",
            alt: "MISE key findings: eighteen models land on the same outcome, and Saturday Night breaks every model",
          },
          {
            src: "/projects/mise/little-plate-shift.jpg",
            alt: "Little Plate shift view: kitchen stations, the dining room, and tickets for pasta and fish during service",
          },
          {
            src: "/projects/mise/little-plate-allergy.jpg",
            alt: "Allergy call on table 2, with options to swap and send, check the sauce with Mira, or remove the ticket",
          },
          {
            src: "/projects/mise/tui-presentation.jpg",
            alt: "Nikhil presenting Tui on stage, with a slide reading Environments for alignment and collection",
          },
        ],
      },
    },
    {
      name: "DroneOS",
      featured: true,
      desc: "We built a drone stack that tracks targets, navigates without GPS, and coordinates swarm behavior without radio comms. It won 1st Overall at the Bow Capital × DS3 × SIC hackathon at UC San Diego.",
      tags: ["Swarm RL", "Behavioral Cloning", "MAPPO", "YOLOX", "Norfair", "SLAM", "Visual Odometry", "3D Gaussian Splatting"],
      links: [
        { label: "Devpost", href: "https://devpost.com/software/outcast-virus" },
        { label: "GitHub", href: "https://github.com/Trolleroof/bow-capital-hackathon" },
      ],
      detail: {
        award: "1st Overall @ Bow Capital × DS3 × SIC Hackathon",
        hook: "Running autonomous drone swarms on the edge when GPS and radio links are unavailable or jammed.",
        overview:
          "We wanted to see how much of a drone swarm stack we could get working when GPS and radio communication are cut off. For perception, we ran YOLOX for real-time detection and paired it with Norfair tracking so the system could keep the same target ID even after something left the frame or got occluded. For navigation, we combined visual odometry and SLAM with a geo-referenced 3D Gaussian splat map so the drone could localize onboard. For swarm coordination, we trained policies with behavioral cloning and MAPPO so multiple drones could split up and finish tasks without talking to each other.",
        highlights: [
          "Trained swarm policies with behavioral cloning and MAPPO so drones could coordinate tasks without explicit communication.",
          "Paired YOLOX detection with Norfair multi-object tracking to re-identify targets after occlusion or leaving the frame.",
          "Added on-device friend-or-foe labeling on top of the detected targets.",
          "Handled GPS-denied localization using a VO-SLAM pipeline paired with geo-referenced 3D Gaussian splat maps.",
        ],
        videoFileUrl: "/projects/droneos/combatos-demo.mp4",
      },
    },
    {
      name: "SODIUM",
      featured: true,
      desc: "We built a voice-first companion robot for senior care that handles wake-word detection, medication reminders, and crisis alerts, paired with a Svelte 5 and Bun dashboard for caregivers.",
      tags: ["ROS 2", "Bun", "TypeScript", "Python", "Embedded Systems"],
      links: [{ label: "GitHub", href: "https://github.com/TheOutcastVirus/diamondhacks-2026" }],
      detail: {
        award: "1st Overall @ DiamondHacks 2026",
        hook: "A senior care robot built around voice so users do not have to navigate small screens or menus.",
        overview:
          "We built SODIUM around a pretty simple observation: most assistive tools expect older adults to tap through menus, which is usually where people stop using them. So we made the robot voice-first. A lightweight Python service listens for a wake word, parses spoken requests, and triggers medication reminders or distress alerts. On the other side, a single Svelte 5 app running on Bun serves both the robot's local screen and the caregiver dashboard so family members can see what was asked, what reminders went off, and whether anything looked like a crisis.",
        highlights: [
          "Seniors interact through voice instead of nested menus, while caregivers can check a live log of requests and actions.",
          "Used wake-word detection with a lightweight Python bot so spoken replies stayed quick without a heavy backend.",
          "Built both the on-robot display and the caregiver dashboard inside one Svelte 5 and Bun app.",
          "Put medication reminders, daily check-ins, and distress alerts in the same caregiver view.",
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
      desc: "An RL training harness for a 2D Roomba cleaning sim. FastAPI pulls notes from past runs in Nia, trains and evaluates PPO agents, renders rollout GIFs, and sends the report over AgentMail and MCP tools.",
      tags: ["FastAPI", "Next.js", "PPO", "AgentMail", "MCP", "Python"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/openclaw-hackathon" }],
      detail: {
        award: "1st Overall @ OpenClaw Hackathon Eragon x Nozomio x AgentMail",
        hook: "Trying to make RL training runs easier to inspect and iterate on, both for humans and for coding agents.",
        overview:
          "When you run a lot of RL experiments, it is easy to lose track of what you already tried and why a run failed. I built Apollo Labs around a 2D Roomba navigation sim so every training run follows one repeatable loop. FastAPI checks narrative memory in Nia before starting a run to pull in lessons from earlier attempts, trains a PPO policy against a random baseline, evaluates it, renders rollout GIFs, and writes everything into a single RunReport object. That same report feeds the Next.js dashboard, AgentMail emails, Slack, and memory storage, and MCP tools let an external agent kick off runs and inspect the results directly.",
        highlights: [
          "Queries Nia for notes from earlier runs before training starts, then writes back a summary once the run finishes.",
          "Everything reads from one RunReport object across the dashboard, email reports, memory, and agent tools so state does not drift.",
          "Saves configs, checkpoints, metrics, rollout GIFs, and logs together in a versioned folder per run.",
          "Exposes MCP tools so external agents can start runs, compare metrics, and decide what to change next.",
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
      desc: "We built a dispatcher console for firefighters at the transpose/compiled-5 hackathon. It pulls helmet VSLAM point clouds, body-cam feeds, and live radio transcripts into one floor-plan view so dispatchers can track units inside a building.",
      tags: ["Next.js", "Three.js", "ROS 2", "WebSockets", "C++", "SLAM"],
      links: [{ label: "GitHub", href: "https://github.com/Trolleroof/NIGEL-hackathon" }],
      detail: {
        award: "1st Overall @ transpose/compiled-5 UCSD Hackathon",
        hook: "Live helmet SLAM maps, body-cam feeds, and radio transcripts in one view for incident dispatchers.",
        overview:
          "We built NIGEL for the Transpose VC × compiled-5 hackathon at UC San Diego. The idea was to give a fire dispatcher something closer to air traffic control on a floor plan: live video feeds from units inside, a growing 3D point cloud built from Odin helmet rigs, and a radio panel that pulls out hazards and updates the map. We used ROS 2 packages to read depth and accumulate SLAM point clouds from the helmets, streamed camera and map updates over WebSockets into a Next.js and Three.js console, and ran the radio parsing agent on Cerebras so transcript updates stayed fast.",
        highlights: [
          "Combined live video tiles, a Three.js point-cloud map, floor-plan search, and radio transcripts inside one Next.js console.",
          "Wrote ROS 2 nodes to ingest depth and point clouds from Odin helmets and stream the growing SLAM map over WebSockets.",
          "Synced cameras, map markers, and UI state through a single WebSocket layer so multiple units stayed on the same picture.",
        ],
        videoEmbedUrl: "https://www.youtube.com/embed/rzGtTom3oS8",
      },
    },
    {
      name: "Crucible Compute",
      desc: "A GPU routing tool where you describe the model you want to run and it checks pricing and speed across local Docker, Kubernetes, RunPod, Lambda, CoreWeave, Vultr, and Vast before asking for approval to deploy.",
      tags: ["Python", "SQLite", "Docker", "llama.cpp", "MCP"],
      links: [
        { label: "Live demo", href: "https://ayxkkrd7.insforge.site/" },
        { label: "GitHub", href: "https://github.com/Trolleroof/nozomio-hackathon" },
      ],
      detail: {
        award: "5th Place @ Nozomio Hackathon",
        hook: "Describe the workload you want to run, compare hardware options across providers, and approve spend before anything spins up.",
        overview:
          "I wanted a simpler way to compare and launch inference jobs without manually checking five GPU clouds every time. With Crucible, you describe the model and workload in plain English, and it scans available capacity across local Docker, Kubernetes, RunPod, Lambda Cloud, CoreWeave, Vultr, and Vast (covering NVIDIA, AMD, TPU, Intel Gaudi, and Apple Silicon). It benchmarks candidate options, shows the cost and speed tradeoff, waits for an explicit spend approval before launching paid instances, and then routes inference through an OpenAI-compatible gateway backed by Python and SQLite.",
        highlights: [
          "Pulls a live GPU catalog across RunPod, Lambda, CoreWeave, Vast, and Vultr to find the cheapest option that fits the job.",
          "Shows benchmark numbers, cost, and speed for each candidate placement instead of picking a provider blindly.",
          "Requires explicit approval before spinning up paid GPU instances.",
          "Logs configs, runs, metrics, and spend in SQLite so deployments are easy to audit later.",
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
      desc: "We trained a Unitree G1 humanoid with PPO across eight MuJoCo disaster scenes, added a scene generator that turns text descriptions into new layouts, and wired up a console where Gemini picks triage targets in unseen environments.",
      tags: ["Next.js", "FastAPI", "MuJoCo", "PPO", "Gemini", "Three.js"],
      links: [{ label: "GitHub", href: "https://github.com/aravindkrishna2008/disaster-rescue" }],
      detail: {
        hook: "Train a humanoid policy across eight MuJoCo disaster scenes, generate new layouts from text, and test it on environments it has not seen before.",
        overview:
          "We built Battle Angel to test training a Unitree G1 humanoid to reach survivors in simulated disaster scenes and then dropping the policy into new layouts. The training gym runs vectorized PPO across eight MuJoCo environments, ranging from earthquake corridors to buried-rubble triage. From there, the scene generator takes a plain-English disaster description and turns it into a new layout with a Three.js preview. In the console, you can type triage priorities, Gemini selects which target to go after first, and the trained policy runs a rollout in the unseen scene with live telemetry and GIF replay.",
        highlights: [
          "Ran vectorized PPO across eight MuJoCo disaster scenes with live learning curves and rollout GIFs.",
          "Built a scene generator that converts text descriptions into new disaster layouts with a Three.js preview.",
          "Wired natural-language triage through Gemini so a trained policy can run rollouts in layouts it never trained on.",
          "Modeled the Unitree G1 in MuJoCo with 21D observations, locomotion assist, and reach checks for both visible and buried survivors.",
        ],
        videoEmbedUrl: "https://www.youtube.com/embed/QL_UhVSLMKc",
      },
    },
    {
      name: "PREVUE",
      featured: true,
      desc: "I wanted to know if a small world model could catch bad LLM robot plans before they ran. Claude writes a pick-and-place plan, an action-conditioned model imagines the rollout from camera frames, and bad grasps get sent back for repair before MuJoCo executes them.",
      tags: ["V-JEPA", "World Models", "MuJoCo", "PyTorch", "Claude", "Robot Planning"],
      links: [
        { label: "Blog post", href: "/blog/prevue-world-model-verifier" },
        { label: "GitHub", href: "https://github.com/Trolleroof/skill-level-world-model" },
      ],
      detail: {
        hook: "Coding agents can write robot plans, but nothing tells them a grasp is six centimeters off until the arm has already missed.",
        overview:
          "I built PREVUE as a check between an LLM planner and the robot. You give Claude a pick-and-place task in plain English, it outputs a structured action trace, and a learned action-conditioned world model imagines about four seconds of motion from the camera observation window and that trace. An outcome head predicts whether the block lifts, lands on the target pad, and succeeds overall, along with an uncertainty score. If the predicted rollout looks bad, Claude gets the numbers and likely failure mode back and adjusts the waypoints before anything runs in MuJoCo. The verifier is a small head trained on 5,000 generated episodes on top of a frozen V-JEPA visual encoder.",
        highlights: [
          "When I injected a deliberate 6 cm grasp miss, the verifier gave the plan a 7.3% success probability. Claude re-aimed at the observed block center, and the repaired plan scored 94.7% and landed 2.3 cm from the pad.",
          "Across eight scenes with the same injected miss, unverified execution recovered 0/8 times, while the world-model verifier caught the bad plan 8/8 times and succeeded 6/8.",
          "A geometry-only checker with oracle block positions hit 7/8, which gave a clean upper bound for the vision-only setup.",
          "Out-of-distribution asks like stacking block-on-block instead of placing on the green pad are still a clear weak spot, since the training data only covered the pad.",
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
      desc: "I tried getting a Unitree G1 humanoid to score a penalty kick in MuJoCo. Pure motion retargeting only dribbled the ball 3.7 m once I turned on real turf friction, so I added a differentiable warm start and CEM search to get it hitting both corners.",
      tags: ["MuJoCo", "PyTorch", "Motion Retargeting", "CEM", "Unitree G1", "Humanoids"],
      links: [
        { label: "Blog post", href: "/blog/teaching-a-humanoid-to-score-a-penalty" },
        { label: "GitHub", href: "https://github.com/Trolleroof/egogoal-amd-hackathon" },
      ],
      detail: {
        hook: "The first retargeted motion looked like a kick, but once I gave the pitch real friction the ball stopped 3.7 meters short of a 10.5 meter goal.",
        overview:
          "I started with SoccerKicks clips and their per-frame 3D HMMR joint annotations, then built a pelvis-local coordinate frame on every frame so limb angles were measured relative to the player's own body instead of the camera and clamped to the G1's joint limits. That gave me kick-shaped motion, but almost no foot speed or force transfer. So I split the optimization in two: a small PyTorch proxy runs about 400 Adam steps to guess a reasonable backswing and strike timing, and then CEM search in MuJoCo (48 candidates across 12 rounds) tunes hip, knee, and ankle targets around contact, plant-leg bracing, playback speed, and pelvis yaw. MuJoCo physics always decides what actually scores, and all 29 joints blend back to a neutral stance after contact so the robot stays standing.",
        highlights: [
          "The untuned retargeted motion hit 2.1 m/s and stopped at 3.7 m; the optimized center shot reached 9.94 m/s and crossed right on target.",
          "Left- and right-corner shots hit 7.32 m/s and 5.92 m/s, both crossing within 0.01 m of their target.",
          "Using a pelvis-local frame removed camera angle bias from the source poses and kept every joint inside the G1's hardware limits.",
          "In the interactive demo, you can place the keeper anywhere across the goal and a small supervised net maps that position to lane, power, tempo, and yaw, playing back the actual verified MuJoCo rollout.",
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
      desc: "A mini experiment testing whether feeding YOLOv8 object bounding boxes into an ACT imitation policy helps it recover when camera frames get corrupted.",
      tags: ["Robotics", "Imitation Learning", "Computer Vision"],
      links: [
        { label: "Blog post", href: "/blog/act-yolo-object-centric-robot-policies" },
        { label: "GitHub", href: "https://github.com/Trolleroof/act-yolo" },
      ],
      detail: {
        hook: "If a robot's camera feed gets noisy, blurry, or dark, does giving the policy explicit object boxes help it recover?",
        overview:
          "I wanted to see what happens when an imitation policy starts getting bad camera inputs, and whether giving it the object's location helps or just adds another point of failure. I trained two matched ACT policies on the same MuJoCo pick-and-place demonstrations, changing only whether one received YOLOv8 bounding boxes for the cube and target zone, then ran paired rollouts across four corruption severities and compared them with McNemar's test. The first detector fell apart on corrupted images, so I retrained YOLO on corrupted data and added bounding-box jitter.",
        highlights: [
          "Evaluated baseline ACT against ACT-YOLO on 50 matched scene seeds at each corruption level.",
          "Retraining YOLO on corrupted images lifted cube recall from 0.03 to 0.98 at the highest severity.",
          "At the highest corruption level, ACT-YOLO hit 18% success compared with 4% for the baseline (p = 0.039), though overall success stayed low on both.",
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
      role: "Researcher",
      place: "Truss Forum",
      organization: "Truss",
      date: "Nov 2026 - Present",
      logo: {
        src: "/org-logos/truss.png",
        alt: "Truss logo",
      },
      desc: "Working on frontier model evaluations. I co-authored SoldierPhysio, a heat-illness benchmark that tests whether models know when to keep a soldier training or pull them out.",
    },
    {
      role: "Desktop Agent Developer - Founder",
      place: "UCSD Agent Development (Clue2)",
      organization: "UC San Diego",
      date: "Jan 2025 - Present",
      logo: {
        src: "/org-logos/triton-removebg-preview.png",
        alt: "UC San Diego Triton logo",
      },
      desc: "Built an Electron and TypeScript desktop agent that transcribes live meetings and runs follow-up tasks across Gmail, Calendar, Docs, Sheets, Slack, and Notion. We grew the beta to 40+ users, including early testers at YC startups.",
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
      desc: "Built a pipeline where LLMs propose analog circuit topologies and Cadence Spectre simulates and verifies them. I also worked on using reinforcement learning to search the circuit design space more efficiently.",
    },
    {
      role: "Robot Operations Engineer",
      place: "Verne Robotics (YC S25)",
      organization: "San Francisco",
      date: "Jun 2026 - Jul 2026",
      logo: {
        src: "/org-logos/verne.png",
        alt: "Verne Robotics logo",
      },
      desc: "Collected 300+ teleop demonstration episodes per session on Verne's robot arms and checked episode quality with the robot-learning team. I also tracked down on-hardware policy failures during deployment so recurring issues went back into the next training round.",
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
      desc: "Worked in Georgia Tech's mmWave Antennas Lab on a 3D-printed ankle-foot orthosis driven by EMG signals. I built a custom motor actuator setup that improved gait response precision by 23%, and presented the work at IEEE ICHCI 2024.",
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
      desc: "Worked in Stanford's Lee-Messer Lab on a BCI setup to help motor-impaired students communicate with neural signals. I benchmarked P300 EEG models and built a React Native frontend that we piloted with 12 patients.",
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
      desc: "Ran a small consulting shop helping local businesses and nonprofits set up AI automations for inbound leads, customer support, and repetitive admin work. Worked with 10+ organizations and learned a lot about what people actually use.",
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
  currentFocus: {
    headline: "fine-tuning diffusion models for robot control",
    detail: "",
  },
};

export function getFeaturedProjects(): Project[] {
  return PROFILE.projects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return PROFILE.projects;
}
