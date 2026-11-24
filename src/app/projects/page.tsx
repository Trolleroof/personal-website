import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectList from '@/components/ProjectList';
import JsonLd from '@/components/JsonLd';
import { getAllProjects } from '@/lib/data';
import { breadcrumbSchema, graph, projectsPageSchema } from '@/lib/structured-data';
import s from './projects.module.css';

const description =
  'Robotics experiments, LLM evals, and hackathon builds by Nikhil Prabhu — including MISE, DroneOS, SODIUM, NIGEL, Apollo Labs, PREVUE, and EgoGoal.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects — Nikhil Prabhu',
    description,
    url: '/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={s.page} data-theme="nocturne">
      <JsonLd
        json={graph(
          projectsPageSchema(projects),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
          ]),
        )}
      />
      <main className={s.main} id="projects">
        <nav className={s.nav} aria-label="Navigation">
          <Link href="/">← home</Link>
          <div className={s.navRight}>
            <Link href="/blog">writing</Link>
            <Link href="/resume">resume</Link>
          </div>
        </nav>
        <header className={s.header}>
          <h1 className={s.label}>Projects</h1>
          <p className={s.sub}>click a project for the demo and notes</p>
        </header>
        <ProjectList projects={projects} layout="grid" />
      </main>
    </div>
  );
}
