import ProjectList from '@/components/ProjectList';
import { getFeaturedProjects } from '@/lib/data';

const Projects: React.FC = () => (
  <div className="panel" id="projects">
    <div className="panel-header">Projects</div>
    <div className="panel-body">
      <ProjectList projects={getFeaturedProjects()} showViewAllLink />
    </div>
  </div>
);

export default Projects;
