import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import ProjectList from '@/components/ProjectList';
import JsonLd from '@/components/JsonLd';
import { getAllProjects } from '@/lib/data';
import { breadcrumbSchema, graph, projectsPageSchema } from '@/lib/structured-data';

const description =
  'Award-winning hackathon builds, robotics experiments, and systems projects by Nikhil Prabhu — including DroneOS, SODIUM, NIGEL, Apollo Labs, PREVUE, and EgoGoal.';

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
    <>
      <JsonLd
        json={graph(
          projectsPageSchema(projects),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
          ]),
        )}
      />
      <Marquee />
      <main className="projects-page-wrap" id="projects">
        <h1 className="sr-only">
          Projects by Nikhil Prabhu — robotics, reinforcement learning, and agent systems
        </h1>
        <div className="panel projects-page-panel">
          <div className="panel-header">Projects</div>
          <div className="panel-body projects-page-body">
            <ProjectList projects={projects} layout="grid" />
          </div>
        </div>
      </main>
    </>
  );
}
