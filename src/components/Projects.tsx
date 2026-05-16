import { PROFILE } from '@/lib/data';

const Projects: React.FC = () => (
  <div className="panel" id="projects">
    <div className="panel-header"><span className="ph-icon">◆</span> Projects</div>
    {PROFILE.projects.map((p) => (
      <div className="project-item" key={p.name}>
        <div>
          <div className="project-name">{p.name}</div>
          <div className="project-desc">{p.desc}</div>
          <div className="project-tags">{p.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}</div>
        </div>
        <div className="project-links">{p.links.map((l) => <a className="project-link" href={l.href} target="_blank" rel="noopener noreferrer" key={l.label}>{l.label}</a>)}</div>
      </div>
    ))}
  </div>
);

export default Projects;
