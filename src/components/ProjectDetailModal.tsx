'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project, ProjectGalleryImage } from '@/lib/data';

function ProjectGalleryCarousel({ images, title }: { images: ProjectGalleryImage[]; title: string }) {
  const [slide, setSlide] = useState(0);

  const wrap = images.length;
  const prev = useCallback(() => setSlide((i) => (i - 1 + wrap) % wrap), [wrap]);
  const next = useCallback(() => setSlide((i) => (i + 1) % wrap), [wrap]);

  if (images.length === 0) return null;

  return (
    <section className="proj-modal-gallery" aria-label={`Screenshots — ${title}`}>
      <h3 className="proj-detail-h">Gallery</h3>
      <div className="proj-modal-carousel">
        <button type="button" className="proj-modal-carousel-prev" aria-label="Previous image" onClick={prev}>
          ⟨
        </button>
        <div className="proj-modal-carousel-viewport">
          <div
            className="proj-modal-carousel-track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {images.map((img) => (
              <figure key={`${title}-${img.src}`} className="proj-modal-carousel-slide">
                <img src={img.src} alt={img.alt} className="proj-modal-carousel-img" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
        <button type="button" className="proj-modal-carousel-next" aria-label="Next image" onClick={next}>
          ⟩
        </button>
      </div>
      <div className="proj-modal-carousel-dots">
        {images.map((_, dot) => (
          <button
            key={`dot-${dot}`}
            type="button"
            className={`proj-modal-carousel-dot${dot === slide ? ' proj-modal-carousel-dot--active' : ''}`}
            aria-label={`Image ${dot + 1}`}
            aria-current={dot === slide}
            onClick={() => setSlide(dot)}
          />
        ))}
      </div>
    </section>
  );
}

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectDetailModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const detail = project?.detail;

  const gallery = detail?.galleryImages ?? [];
  const hasVideo = Boolean(detail?.videoEmbedUrl);

  useEffect(() => {
    if (!project) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevPaddingRight = html.style.paddingRight;
    /** Reserve space so layout doesn’t shift when the scrollbar disappears. */
    const gap = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (gap > 0) {
      html.style.paddingRight = `${gap}px`;
    }
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.paddingRight = prevPaddingRight;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  const onModalKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const candidates = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
    const list = [...candidates].filter((el) => !el.closest('[hidden], [aria-hidden="true"]'));
    if (list.length < 2) return;
    const first = list[0];
    const last = list[list.length - 1];

    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  if (!project || !detail) return null;

  const titleSlug = project.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  const titleId = titleSlug.length > 0 ? `proj-modal-title-${titleSlug}` : 'proj-modal-title';
  const descriptionId = `${titleId}-description`;

  return (
    <div className="proj-modal-overlay" role="presentation">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="proj-modal-content"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onModalKeyDown}
      >
        <div className="proj-modal-toolbar">
          <div className="proj-modal-heading">
            <span className="ph-icon">◆</span>
            <span id={titleId} className="proj-modal-title">
              {project.name}
            </span>
          </div>
          <div className="proj-modal-actions">
            {project.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-modal-toolbar-link"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              className="proj-modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="proj-modal-scroll">
          <div className="proj-modal-inner">
            {hasVideo && detail.videoEmbedUrl ? (
              <section className="proj-modal-video" aria-label={`Video — ${project.name}`}>
                <h3 className="proj-detail-h">Demo</h3>
                <div className="proj-modal-video-shell">
                  <iframe
                    className="proj-modal-video-frame"
                    src={detail.videoEmbedUrl}
                    title={`${project.name} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            ) : null}

            <ProjectGalleryCarousel key={project.name} images={gallery} title={project.name} />

            <div className="proj-detail-body">
              {detail.hook ? <p className="proj-detail-hook">{detail.hook}</p> : null}
              <p id={descriptionId} className="proj-detail-overview">{detail.overview}</p>

              <section className="proj-detail-section" aria-labelledby={`${titleId}-stack`}>
                <h3 id={`${titleId}-stack`} className="proj-detail-h">
                  Tech stack
                </h3>
                <ul className="proj-detail-tags-inline">
                  {project.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>

              <section className="proj-detail-section" aria-labelledby={`${titleId}-hi`}>
                <h3 id={`${titleId}-hi`} className="proj-detail-h">
                  Highlights
                </h3>
                <ul className="proj-detail-highlights">
                  {detail.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
