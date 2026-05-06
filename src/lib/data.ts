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

export interface ProfileData {
  name: string;
  handle: string;
  school: string;
  status: string;
  sidebar: InfoField[];
  bio: string[];
  github: string;
  skills: SkillCat[];
  projects: Project[];
  experience: Experience[];
  guestbook: GuestbookMsg[];
  contact: ContactLink[];
  mood: MoodStat[];
  visitorCount: string;
  nowPlaying: { track: string; current: string; total: string };
}

export const PROFILE: ProfileData = {
  name: "Alex Chen",
  handle: "x0_alex",
  school: "CS @ UCSD '26",
  status: "grinding leetcode at 2am and questioning my life choices",
  sidebar: [
    { label: "Member Since", value: "September 17, 2024" },
    { label: "Age", value: "21" },
    { label: "Major", value: "Computer Science" },
    { label: "School", value: "UCSD '26" },
    { label: "Location", value: "San Diego, CA" },
    { label: "Status", value: "Single & Shipping" },
    { label: "Track", value: "ML / Systems" },
    { label: "Astrological Sign", value: "Libra" },
  ],
  bio: [
    "MY NAME IS ALEX, IM ON DIS JOINT CHILLEN, BUILDIN THINGS THAT SHOULDNT EXIST YET. SO IF U WANNA COLLAB OR JUS BE FRIENDS HIT ME UP.",
    "MY GITHUB: @GITHUB@",
    "YEA DATS ME GRINDIN LEETCODE AT 2AM AND QUESTIONIN MY LIFE CHOICES AT DA BOTTOM.",
    "AND U SEE DA HOODIE, UCSD CS BABY, GET AT UR BOY.",
    "IM 5'11\n170\nCS / ML TRACK\nSYSTEMS ENJOYER\nVERY CAFFEINATED\nAND LOOKIN 4 COOL PROJECTS TO SHIP",
    "O YEA, ALL DA HATERS THANX 4 DOIN NOTHIN AND LETTIN ME COOK.",
  ],
  github: "github.com/x0_alex",
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
      desc: "A key-value store written in Rust with a custom LSM-tree engine. Handles 200k+ ops/sec on commodity hardware. My magnum opus and the reason I now understand why databases are hard.",
      tags: ["Rust", "Systems", "Storage"],
      links: [{ label: "GitHub", href: "#" }, { label: "Demo", href: "#" }],
    },
    {
      name: "SpeculativeDecoder",
      desc: "Research impl of speculative decoding for LLM inference. 2.4× speedup on Llama-3 with a draft model. Paper in progress. Advisored by Prof. Liu @ UCSD.",
      tags: ["Python", "ML", "CUDA", "Research"],
      links: [{ label: "Paper", href: "#" }, { label: "Code", href: "#" }],
    },
    {
      name: "TermCast",
      desc: "Real-time collaborative terminal sessions over WebSockets. Lets teams pair-program in the terminal. Built in 36 hrs at HackUCSD — won Best Dev Tool.",
      tags: ["Node.js", "xterm.js", "WebSockets"],
      links: [{ label: "GitHub", href: "#" }],
    },
    {
      name: "ByteDB",
      desc: "A toy SQL database from scratch in C++. Supports B-tree indexes, basic query planning, and joins. A love letter to my DB systems class.",
      tags: ["C++", "Databases", "Systems"],
      links: [{ label: "GitHub", href: "#" }],
    },
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      place: "Cloudflare",
      date: "Summer 2025",
      desc: "Worked on the Workers runtime team optimizing cold-start latency. Shipped a 15% improvement to isolate initialization using snapshot-based techniques.",
    },
    {
      role: "Undergraduate Researcher",
      place: "UCSD Systems & ML Lab",
      date: "Jan 2025 – Present",
      desc: "Research on efficient LLM inference with speculative decoding and model compression. Collaborating with PhD students on a paper submission to ICML 2026.",
    },
    {
      role: "Teaching Assistant — CSE 101",
      place: "UCSD CSE Dept.",
      date: "Fall 2024",
      desc: "TA for Design & Analysis of Algorithms. Ran weekly discussion sections of 30 students, held office hours, and wrote exam problems.",
    },
  ],
  guestbook: [
    { from: "gr4phQL_god", date: "Apr 29", text: "dude your LSM tree code is actually insane. how is read ampl so low??" },
    { from: "prof_liu", date: "Apr 22", text: "great work on the speculative decoding results. let's sync before the submission deadline." },
    { from: "hackUCSD_org", date: "Mar 15", text: "congrats on winning Best Dev Tool!! see you next year 🏆" },
  ],
  contact: [
    { icon: "⌥", label: "GitHub", href: "#" },
    { icon: "◈", label: "LinkedIn", href: "#" },
    { icon: "✉", label: "Email", href: "#" },
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
  nowPlaying: { track: "Daft Punk — Harder Better Faster Stronger", current: "01:47", total: "03:45" },
};
