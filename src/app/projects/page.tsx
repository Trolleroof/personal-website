import type { Metadata } from 'next';
import Marquee from '@/components/Marquee';
import ProjectList from '@/components/ProjectList';
import { getAllProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects — Nikhil Prabhu',
  description: 'Hackathon builds, robotics experiments, and systems projects by Nikhil Prabhu.',
};

export default function ProjectsPage() {
  return (
    <>
      <Marquee />
      <main className="projects-page-wrap" id="projects">
        <div className="panel projects-page-panel">
          <div className="panel-header">Projects</div>
          <div className="panel-body projects-page-body">
            <ProjectList projects={getAllProjects()} layout="grid" />
          </div>
        </div>
      </main>
    </>
  );
}
