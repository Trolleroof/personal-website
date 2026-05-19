'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/data';
import { PROFILE } from '@/lib/data';
import {
  findProjectBySlug,
  parseProjectDetailHash,
  projectDetailHash,
  projectSlug,
  scrollToProjectsSection,
} from '@/lib/project-slugs';
import ProjectDetailModal from '@/components/ProjectDetailModal';

function ProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project, opener: HTMLElement | null) => void;
}) {
  const d = project.detail;
  const expandable = Boolean(d);
  const awardLabel = d?.award;
  const slug = expandable ? projectSlug(project.name) : undefined;
  const openFrom = (opener: HTMLElement) => {
    if (expandable) onOpen(project, opener);
  };

  const detailsAriaLabel = expandable
    ? `${project.name}${awardLabel ? ` — ${awardLabel}` : ''}. View project details.`
    : undefined;

  return (
    <div
      id={slug ? `project-${slug}` : undefined}
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

  const openProject = useCallback((project: Project, opener: HTMLElement | null) => {
    if (!project.detail) return;
    modalOpenerRef.current = opener;
    setModalProject(project);

    const hash = projectDetailHash(projectSlug(project.name));
    if (window.location.hash !== hash) {
      window.history.pushState({ projectModal: projectSlug(project.name) }, '', hash);
    }
    scrollToProjectsSection();
  }, []);

  const closeProject = useCallback(() => {
    setModalProject(null);
    requestAnimationFrame(() => {
      modalOpenerRef.current?.focus();
      modalOpenerRef.current = null;
    });

    if (parseProjectDetailHash(window.location.hash)) {
      window.history.replaceState(null, '', '#projects');
    }
  }, []);

  const syncModalFromHash = useCallback(() => {
    const slug = parseProjectDetailHash(window.location.hash);
    if (!slug) {
      setModalProject(null);
      return;
    }

    const project = findProjectBySlug(slug);
    if (project) {
      setModalProject(project);
      scrollToProjectsSection();
      return;
    }

    setModalProject(null);
  }, []);

  useEffect(() => {
    syncModalFromHash();
    window.addEventListener('hashchange', syncModalFromHash);
    window.addEventListener('popstate', syncModalFromHash);
    return () => {
      window.removeEventListener('hashchange', syncModalFromHash);
      window.removeEventListener('popstate', syncModalFromHash);
    };
  }, [syncModalFromHash]);

  return (
    <>
      {PROFILE.projects.map((p) => (
        <ProjectRow key={p.name} project={p} onOpen={openProject} />
      ))}
      <ProjectDetailModal project={modalProject} onClose={closeProject} />
    </>
  );
}
