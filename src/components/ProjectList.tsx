'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/data';
import {
  findProjectBySlug,
  parseProjectDetailHash,
  projectDetailHash,
  projectSlug,
  scrollToProjectsSection,
} from '@/lib/project-slugs';
import ProjectDetailModal from '@/components/ProjectDetailModal';

type ProjectListProps = {
  projects: Project[];
  layout?: 'list' | 'grid';
  showViewAllLink?: boolean;
};

type ProjectPreview =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; alt: string };

function youtubeIdFromEmbed(url: string): string | null {
  const match = url.match(/embed\/([^?&/]+)/);
  return match?.[1] ?? null;
}

function projectPreview(project: Project): ProjectPreview | undefined {
  const detail = project.detail;
  const gallery = detail?.galleryImages;
  if (gallery?.length) {
    const image = gallery.find((entry) => entry.emphasize) ?? gallery[0];
    return { kind: 'image', src: image.src, alt: image.alt };
  }

  const embed = detail?.videoEmbedUrl;
  if (embed) {
    const id = youtubeIdFromEmbed(embed);
    if (id) {
      return {
        kind: 'image',
        src: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        alt: `${project.name} demo thumbnail`,
      };
    }
  }

  const video = detail?.videoFileUrl;
  if (video) {
    return { kind: 'video', src: video, alt: `${project.name} demo` };
  }

  return undefined;
}

function ProjectCardMedia({ preview }: { preview: ProjectPreview }) {
  return (
    <div className="project-card-media">
      {preview.kind === 'video' ? (
        <video muted playsInline preload="metadata" aria-label={preview.alt}>
          <source src={preview.src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview.src} alt={preview.alt} loading="lazy" />
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.links.map((l) => (
        <a
          className="project-link"
          href={l.href}
          target={l.href.startsWith('/') ? undefined : '_blank'}
          rel={l.href.startsWith('/') ? undefined : 'noopener noreferrer'}
          key={l.label}
          onClick={(event) => event.stopPropagation()}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

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
                <span className="project-chevron" aria-hidden>
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
        </div>
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

function ProjectCard({
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
  const preview = projectPreview(project);
  const openFrom = (opener: HTMLElement) => {
    if (expandable) onOpen(project, opener);
  };

  const detailsAriaLabel = expandable
    ? `${project.name}${awardLabel ? ` — ${awardLabel}` : ''}. View project details.`
    : undefined;

  return (
    <article
      id={slug ? `project-${slug}` : undefined}
      className={`project-card${expandable ? ' project-card--interactive' : ''}`}
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
      {preview ? <ProjectCardMedia preview={preview} /> : null}

      <div className="project-card-body">
        <div className="project-card-head">
          <div className="project-name-row">
            <h3 className="project-name">{project.name}</h3>
            {expandable ? (
              <span className="project-chevron" aria-hidden>
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

        <p className="project-desc">{project.desc}</p>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function ProjectList({
  projects,
  layout = 'list',
  showViewAllLink = false,
}: ProjectListProps) {
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
      const base = window.location.pathname === '/projects' ? '/projects' : '/';
      window.history.replaceState(null, '', `${base}#projects`);
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
      {layout === 'grid' ? (
        <div className="project-grid">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} onOpen={openProject} />
          ))}
        </div>
      ) : (
        projects.map((p) => <ProjectRow key={p.name} project={p} onOpen={openProject} />)
      )}
      {showViewAllLink ? (
        <div className="project-view-all">
          <Link href="/projects" className="project-view-all-btn">
            View all projects
          </Link>
        </div>
      ) : null}
      <ProjectDetailModal project={modalProject} onClose={closeProject} />
    </>
  );
}
