'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROFILE } from '@/lib/data';
import { parseProjectDetailHash, projectDetailHash, projectSlug } from '@/lib/project-slugs';
import AsciiField from './AsciiField';
import s from './home.module.css';

type Post = { slug: string; title: string; date: string };

const PROJECTS: { name: string; label: string; what: string; detail: string }[] = [
  {
    name: 'MISE benchmark',
    label: 'MISE',
    what: 'can 19 frontier models run a restaurant?',
    detail:
      "stateful benchmark w/ deterministic service, cost, recovery and safety metrics + an LLM judge over 171 episodes. top model hit 66.7% pass@1. presented it at Mercor HQ w/ Chirag Mahapatra and at True Ventures' Scrappy Sessions.",
  },
  {
    name: 'DroneOS',
    label: 'DroneOS',
    what: '1st overall · Bow Capital × DS3 × SIC',
    detail:
      'drone swarms that coordinate w/o GPS or comms. BC + MAPPO policies, VO-SLAM on Gaussian splat maps, YOLOX + Norfair to re-id targets through occlusion.',
  },
  {
    name: 'SODIUM',
    label: 'SODIUM',
    what: '1st overall · DiamondHacks 2026',
    detail:
      'voice-first companion for senior care. wake word, med reminders, crisis detection, and a dashboard for caregivers.',
  },
  {
    name: 'Apollo Labs',
    label: 'Apollo Labs',
    what: '1st overall · OpenClaw hackathon',
    detail:
      'RL orchestrator that trains PPO roombas, evals 1000+ episodes, and emails you the GIFs. shoutout AgentMail + Nia.',
  },
  {
    name: 'PREVUE',
    label: 'PREVUE',
    what: 'checking robot actions before they run',
    detail: 'a world-model verifier that scores candidate actions offline so bad ones never hit the robot.',
  },
  {
    name: 'EgoGoal',
    label: 'EgoGoal',
    what: 'got a G1 to score a penalty',
    detail:
      'first retargeted kick moved the ball 3.7m. goal was 10.5m. pelvis-local retargeting + a differentiable warm start + MuJoCo search got it to both corners.',
  },
];

const UCSD = '/org-logos/ucsd-triton-logo.png';
const EXPERIENCE = [
  { logo: UCSD, dates: 'Oct 2026 – now', org: 'ARClab', role: 'Research Assistant · Prof. Yip', line: 'success-guided resets for humanoid PPO in Isaac Lab.' },
  { logo: '/org-logos/verne.png', dates: 'Jun – Jul 2026', org: 'Verne Robotics', role: 'Robot Operations Engineer · YC S25', line: 'made sure only clean teleop data trained the policy. 300+ episodes, every failure tagged.' },
  { logo: UCSD, dates: 'Mar – Sep 2026', org: 'RL for Circuit Invention', role: 'Research Assistant · Prof. Gudem', line: 'LLMs proposing circuits, Spectre grading them. made the loop 10x faster.' },
  { logo: UCSD, dates: 'Sep 2025 – Sep 2026', org: 'Lab for Emerging Intelligence', role: 'Undergraduate Researcher · Prof. Paturi', line: 'desktop agent that sits in your meetings and does the follow-ups. 40+ pilot users.' },
];

function linksFor(name: string) {
  return PROFILE.projects.find((p) => p.name === name)?.links ?? [];
}

export default function HomeView({ posts }: { posts: Post[] }) {
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
    <div className={s.page} data-theme="dark-home">
      <div className={s.wrap}>
        <main className={s.main}>
          <header className={s.header}>
            <Image src={PROFILE.avatarUrl} alt="Nikhil Prabhu" width={96} height={96} className={s.avatar} priority />
            <div className={s.intro}>
              <h1 className={s.name}>Nikhil Prabhu</h1>
              <p className={s.bio}>
                cs @ ucsd. i train robots to do things i don&apos;t want to do, and build evals to check whether
                models actually can. 10x hackathon winner.
              </p>
              <nav aria-label="Elsewhere" className={s.links}>
                {gh && <a href={gh}>github</a>}
                {li && <a href={li}>linkedin</a>}
                {email && <a href={`mailto:${email}`}>email</a>}
                <a href={PROFILE.resumeUrl}>resume</a>
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
                    <Image src={e.logo} alt="" width={20} height={20} className={s.logo} />
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
                <span>{p.title}</span>
                <span className={s.dates}>{p.date.slice(0, 4)}</span>
              </Link>
            ))}
          </section>

          <footer className={s.footer}>
            <span>© {new Date().getFullYear()} nikhil prabhu</span>
            <span>visitors: {PROFILE.visitorCount}</span>
          </footer>
        </main>
        <AsciiField className={s.ascii} />
      </div>
    </div>
  );
}
