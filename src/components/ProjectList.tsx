'use client';

import { useRef, useState } from 'react';
import type { Project } from '@/lib/data';
import { PROFILE } from '@/lib/data';
import ProjectDetailModal from '@/components/ProjectDetailModal';

function ProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project, opener: HTMLElement) => void;
}) {
  const d = project.detail;
  const expandable = Boolean(d);
  const awardLabel = d?.award;
  const openFrom = (opener: HTMLElement) => {
    if (expandable) onOpen(project, opener);
  };

  const detailsAriaLabel = expandable
    ? `${project.name}${awardLabel ? ` — ${awardLabel}` : ''}. View project details.`
    : undefined;

  return (
    <div
      className={`project-item${expandable ? ' project-item--interactive' : ''}`}
      role={expandable ? 'button' : undefined}
      tabIndex={expandable ? 0 : undefined}
      aria-haspopup={expandable ? 'dialog' : undefined}
      aria-label={detailsAriaLabel}
      onClick={(event) => openFrom(event.currentTarget)}
      onKeyDown={(event) => {
        if (!expandable) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openFrom(event.currentTarget);
        }
      }}
    >
      <div className="project-item-top">
        <div className="project-item-main project-item-main--static">
          <div className="project-item-head">
            <div className="project-name-row">
              <span className="project-name">{project.name}</span>
              {expandable ? (
                <span className="project-chevron pixel-chevron" aria-hidden>
                  ▶
                </span>
              ) : null}
            </div>
            {expandable ? (
              <span className="project-row-hint" aria-hidden>
                Click to learn more
              </span>
            ) : null}
          </div>
          {awardLabel ? (
            <p className="project-item-award">
              <span className="project-item-award-icon" aria-hidden>
                ♦
              </span>
              {awardLabel}
            </p>
          ) : null}
          <div className="project-desc">{project.desc}</div>
          <div className="project-tags">
            {project.tags.map((t) => (
              <span className="project-tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="project-links">
          {project.links.map((l) => (
            <a
              className="project-link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              key={l.label}
              onClick={(event) => event.stopPropagation()}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectList() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const modalOpenerRef = useRef<HTMLElement | null>(null);

  const openProject = (project: Project, opener: HTMLElement) => {
    modalOpenerRef.current = opener;
    setModalProject(project);
  };

  const closeProject = () => {
    setModalProject(null);
    requestAnimationFrame(() => {
      modalOpenerRef.current?.focus();
      modalOpenerRef.current = null;
    });
  };

  return (
    <>
      {PROFILE.projects.map((p) => (
        <ProjectRow key={p.name} project={p} onOpen={openProject} />
      ))}
      <ProjectDetailModal project={modalProject} onClose={closeProject} />
    </>
  );
}
