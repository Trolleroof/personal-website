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
  items: { name: string; hot?: boolean }[];
}

export interface MoodStat { label: string; value: number; }

export interface InfoField { label: string; value: string; }

export interface ContactLink { icon: string; label: string; href: string; }

export interface Interest { label: string; value: string; }

export interface ProfileData {
  name: string;
  handle: string;
  school: string;
  status: string;
  sidebar: InfoField[];
  bio: string[];
  interests: Interest[];
  skills: SkillCat[];
  projects: Project[];
  experience: Experience[];
  guestbook: GuestbookMsg[];
  contact: ContactLink[];
  mood: MoodStat[];
  visitorCount: string;
  currentFocus: {
    headline: string;
    detail: string;
    progressPct: number;
    footLeft: string;
    footRight: string;
  };
}

export const PROFILE: ProfileData = {
  name: "Nikhil Prabhu",
  handle: "nprabhu",
  school: "CS @ UC San Diego '28",
  status: "stacking reps to start something in the problem space I can't quit.",
  sidebar: [
    { label: "Major", value: "CS" },
    { label: "School", value: "UC San Diego, graduating in 2028" },
    { label: "Location", value: "San Francisco Bay Area" },
    { label: "Here For", value: "Building cool things" },
  ],
  bio: [
    "hey I'm Nikhil! CS student at UCSD building things that probably shouldn't exist yet. I've been fortunate to work on ML inference, distributed systems, and the occasional 36-hour hackathon project.",
    "I have (more or less) three goals in all my work: make it fast, make it correct, and ship it before I change my mind about the architecture.",
    "You can view my resume here! Always down to collab on something interesting — hit me up.",
  ],
  interests: [
    { label: "General", value: "I'm into ML systems, distributed infra, compilers, and anything that runs fast on weird hardware." },
    { label: "Music", value: "I listen to Radiohead, Four Tet, Aphex Twin, 100 gecs, Arca." },
    { label: "Movies", value: "I love Blade Runner 2049, Her, Everything Everywhere All at Once." },
    { label: "Television", value: "Some of my favorite shows: Mr. Robot, Silicon Valley, Severance." },
  ],
  skills: [
    { label: "languages", items: [
      { name: "Python", hot: true }, { name: "C++", hot: true },
      { name: "C" }, { name: "Rust" }, { name: "TypeScript" }, { name: "Java" },
    ]},
    { label: "ML / AI", items: [
      { name: "PyTorch", hot: true }, { name: "HuggingFace", hot: true },
      { name: "CUDA" }, { name: "scikit-learn" }, { name: "NumPy" },
    ]},
    { label: "web / infra", items: [
      { name: "React" }, { name: "Node.js" }, { name: "Docker", hot: true },
      { name: "Linux" }, { name: "PostgreSQL" },
    ]},
    { label: "tools", items: [
      { name: "Git", hot: true }, { name: "Vim" }, { name: "GDB" },
      { name: "Bash" }, { name: "Figma" },
    ]},
  ],
  projects: [
    {
      name: "FluxKV",
      desc: "I built a key-value store in Rust with a custom LSM-tree engine. It handles 200k+ ops/sec on commodity hardware. My magnum opus and the reason I now understand why databases are hard.",
      tags: ["Rust", "Systems", "Storage"],
      links: [{ label: "GitHub", href: "#" }, { label: "Demo", href: "#" }],
    },
    {
      name: "SpeculativeDecoder",
      desc: "My research implementation of speculative decoding for LLM inference: 2.4× speedup on Llama-3 with a draft model. Paper in progress. I work with Prof. Liu @ UCSD.",
      tags: ["Python", "ML", "CUDA", "Research"],
      links: [{ label: "Paper", href: "#" }, { label: "Code", href: "#" }],
    },
    {
      name: "TermCast",
      desc: "Real-time collaborative terminal sessions over WebSockets—I built it so teams can pair-program in the terminal. Shipped in 36 hrs at HackUCSD and won Best Dev Tool.",
      tags: ["Node.js", "xterm.js", "WebSockets"],
      links: [{ label: "GitHub", href: "#" }],
    },
    {
      name: "ByteDB",
      desc: "I built a toy SQL database from scratch in C++. It supports B-tree indexes, basic query planning, and joins—a love letter to my DB systems class.",
      tags: ["C++", "Databases", "Systems"],
      links: [{ label: "GitHub", href: "#" }],
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
  guestbook: [
    { from: "gr4phQL_god", date: "Apr 29", text: "dude your LSM tree code is actually insane. how is read ampl so low??" },
    { from: "prof_liu", date: "Apr 22", text: "great work on the speculative decoding results. let's sync before the submission deadline." },
    { from: "hackUCSD_org", date: "Mar 15", text: "congrats on winning Best Dev Tool!! see you next year" },
  ],
  contact: [
    { icon: "◆", label: "GitHub", href: "#" },
    { icon: "◇", label: "LinkedIn", href: "#" },
    { icon: "✉", label: "Email", href: "mailto:nprabhu@ucsd.edu" },
  ],
  mood: [
    { label: "caffeine", value: 90 },
    { label: "sleep", value: 20 },
    { label: "motivation", value: 65 },
    { label: "git commits", value: 80 },
    { label: "debugging", value: 95 },
    { label: "touching grass", value: 10 },
  ],
  visitorCount: "042137",
  currentFocus: {
    headline: "FluxKV — compaction & crash recovery",
    detail:
      "I'm chasing down merge-iterator edge cases and hammering crash recovery until I'm not afraid of kill -9 anymore.",
    progressPct: 68,
    footLeft: "side project",
    footRight: "nights & weekends",
  },
};
