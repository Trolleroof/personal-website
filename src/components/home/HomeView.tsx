'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/lib/data';
import { parseProjectDetailHash, projectDetailHash, projectSlug } from '@/lib/project-slugs';
import AsciiField from './AsciiField';
import { useResumeModal } from '@/context/ResumeModalContext';
import { GitaMarginLeft, GitaMarginRight } from './GitaMargin';
import HeaderQuotes from './HeaderQuotes';
import VisitorCount from './VisitorCount';
import s from './home.module.css';

type Post = { slug: string; title: string; date: string; venue?: string };

const PROJECTS: { name: string; label: string; what: string; detail: string }[] = [
  {
    name: 'MISE benchmark',
    label: 'MISE',
    what: 'testing whether 19 frontier models can run a restaurant',
    detail:
      "I built a stateful restaurant shift benchmark where models decide when to intervene and explain why, then scored runs on both deterministic shift metrics and an LLM judge across 171 episodes. Most models landed around the same outcome score, so the reasoning traces ended up being what separated them, with the top model hitting 66.7% pass@1. I also presented it at Mercor HQ with Chirag Mahapatra and live-demoed it at True Ventures' Scrappy Sessions.",
  },
  {
    name: 'DroneOS',
    label: 'DroneOS',
    what: '1st overall · Bow Capital × DS3 × SIC',
    detail:
      'We wanted to see if a drone swarm could find targets and coordinate without relying on GPS or radio comms. We used YOLOX and Norfair to keep tracking targets after occlusion, VO-SLAM with Gaussian splat maps for localization, and behavioral cloning plus MAPPO for the swarm policies.',
  },
  {
    name: 'SODIUM',
    label: 'SODIUM',
    what: '1st overall · DiamondHacks 2026',
    detail:
      'We built a voice-first companion robot for seniors so they would not have to deal with menus or small screens. It listens for a wake word, handles medication reminders and crisis alerts, and logs everything to a caregiver dashboard.',
  },
  {
    name: 'Apollo Labs',
    label: 'Apollo Labs',
    what: '1st overall · OpenClaw hackathon',
    detail:
      'I built an RL training harness for a 2D Roomba sim that pulls notes from past runs in Nia before training, runs PPO and evaluates 1,000+ episodes, and sends the rollout GIFs and report over AgentMail.',
  },
  {
    name: 'PREVUE',
    label: 'PREVUE',
    what: 'checking robot plans with a world model before they run',
    detail:
      'Coding agents can write pick-and-place plans, but they have no way to tell if a grasp is a few centimeters off until the arm misses. I trained a small action-conditioned world model head on top of V-JEPA so it can imagine the rollout first and send bad plans back to Claude to fix.',
  },
  {
    name: 'EgoGoal',
    label: 'EgoGoal',
    what: 'getting a Unitree G1 to score a penalty kick',
    detail:
      'My first retargeted kick looked right, but once I added real turf friction the ball only rolled 3.7 meters toward a 10.5 meter goal. Moving to pelvis-local retargeting, a small differentiable warm start, and CEM search in MuJoCo got it hitting both corners.',
  },
];

const UCSD = '/org-logos/ucsd-triton-logo.png';
const EXPERIENCE: {
  logo: string;
  logoW: number;
  logoH: number;
  logoTone?: 'invert' | 'photo';
  dates: string;
  org: string;
  role: string;
  line: string;
}[] = [
  { logo: '/org-logos/truss.png', logoW: 128, logoH: 128, logoTone: 'invert', dates: 'Nov 2026 – now', org: 'Truss', role: 'Researcher', line: 'Working on frontier model evals. I co-authored SoldierPhysio, a heat-illness benchmark testing whether models know when to keep a soldier training or pull them out.' },
  { logo: '/org-logos/arclab.jpg', logoW: 200, logoH: 200, logoTone: 'photo', dates: 'Oct 2026 – now', org: 'ARClab', role: 'Research Assistant · Prof. Yip', line: 'Working on success-guided resets for humanoid PPO training in Isaac Lab.' },
  { logo: '/org-logos/verne.png', logoW: 800, logoH: 800, logoTone: 'invert', dates: 'Jun – Jul 2026', org: 'Verne Robotics', role: 'Robot Operations Engineer · YC S25', line: 'Collected 300+ teleop episodes per session and checked data quality with the learning team, tagging hardware policy failures so the next training run actually fixed them.' },
  { logo: UCSD, logoW: 4096, logoH: 4096, dates: 'Mar – Sep 2026', org: 'RL for Circuit Invention', role: 'Research Assistant · Prof. Gudem', line: 'Built a loop where LLMs propose analog circuits and Cadence Spectre simulates and grades them, which sped up iteration about 10x.' },
  { logo: UCSD, logoW: 4096, logoH: 4096, dates: 'Sep 2025 – Sep 2026', org: 'Lab for Emerging Intelligence', role: 'Undergraduate Researcher · Prof. Paturi', line: 'Built an Electron desktop agent that listens in on meetings and handles follow-ups across Gmail, Slack, and Notion, with 40+ pilot users.' },
];

function linksFor(name: string) {
  return PROFILE.projects.find((p) => p.name === name)?.links ?? [];
}

export default function HomeView({ posts }: { posts: Post[] }) {
  const { openResume } = useResumeModal();
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setOpen(parseProjectDetailHash(window.location.hash));
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const toggle = (slug: string) => {
    const next = open === slug ? null : slug;
    setOpen(next);
    history.replaceState(null, '', next ? projectDetailHash(next) : window.location.pathname);
  };

  const email = PROFILE.contact.find((c) => c.icon === 'email')?.copyText;
  const gh = PROFILE.contact.find((c) => c.icon === 'github')?.href;
  const li = PROFILE.contact.find((c) => c.icon === 'linkedin')?.href;

  return (
    <div className={s.page} data-theme="nocturne">
      <div className={s.folio}>
        <GitaMarginLeft />
        <div className={s.book}>
        <div className={s.wrap}>
        <main className={s.main}>
          <header className={s.header}>
            <Image src={PROFILE.avatarUrl} alt="Nikhil Prabhu" width={112} height={112} className={s.avatar} priority />
            <div className={s.intro}>
              <h1 className={s.name}>Nikhil Prabhu</h1>
              <HeaderQuotes />
              <p className={s.bio}>
                i pursue research in robot learning, LLM evals, and sometimes a combination of both
              </p>
              <nav aria-label="Elsewhere" className={s.links}>
                {gh && <a href={gh}>github</a>}
                {li && <a href={li}>linkedin</a>}
                {email && <a href={`mailto:${email}`}>email</a>}
                <button type="button" className={s.resumeLink} onClick={openResume}>
                  resume
                </button>
              </nav>
            </div>
          </header>

          <section id="projects">
            <div className={s.sectionHead}>
              <h2 className={s.label}>Projects</h2>
              <Link href="/projects" className={s.more}>all projects →</Link>
            </div>
            {PROJECTS.map((p) => {
              const slug = projectSlug(p.name);
              const isOpen = open === slug;
              return (
                <div key={slug} className={s.row} id={`project-${slug}`}>
                  <button type="button" className={s.rowBtn} aria-expanded={isOpen} onClick={() => toggle(slug)}>
                    <span className={s.rowName}>{p.label}</span>
                    <span className={s.rowWhat}>{p.what}</span>
                    <span className={isOpen ? s.markOpen : s.mark} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className={s.detail}>
                      <p>{p.detail}</p>
                      <div className={s.detailLinks}>
                        {linksFor(p.name).map((l) => (
                          <a key={l.href} href={l.href}>{l.label.toLowerCase()} ↗</a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <section id="experience">
            <h2 className={`${s.label} ${s.sectionHead}`}>Experience</h2>
            {EXPERIENCE.map((e) => (
              <div key={e.org} className={s.exp}>
                <span className={s.dates}>{e.dates}</span>
                <div>
                  <div className={s.expHead}>
                    <span className={e.logoTone === 'photo' ? `${s.logoFrame} ${s.logoFramePhoto}` : s.logoFrame}>
                      <Image
                        src={e.logo}
                        alt=""
                        width={e.logoW}
                        height={e.logoH}
                        className={
                          e.logoTone === 'invert'
                            ? `${s.logo} ${s.logoInvert}`
                            : e.logoTone === 'photo'
                              ? `${s.logo} ${s.logoPhoto}`
                              : s.logo
                        }
                      />
                    </span>
                    <span className={s.org}>{e.org}</span>
                    <span className={s.role}>{e.role}</span>
                  </div>
                  <span className={s.expLine}>{e.line}</span>
                </div>
              </div>
            ))}
          </section>

          <section id="writing">
            <div className={s.sectionHead}>
              <h2 className={s.label}>Writing</h2>
              <Link href="/blog" className={s.more}>all posts →</Link>
            </div>
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={s.post}>
                <span>
                  {p.venue && <span className={s.venue}>{p.venue}</span>}
                  <span>{p.title}</span>
                </span>
                <span className={s.dates}>{p.date}</span>
              </Link>
            ))}
          </section>

          <footer className={s.footer}>
            <VisitorCount />
          </footer>
        </main>
        <AsciiField className={s.ascii} />
        </div>
        </div>
        <GitaMarginRight />
      </div>
    </div>
  );
}
