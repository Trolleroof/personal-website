'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project, ProjectGalleryImage } from '@/lib/data';

/** 7×11 “pixel unit” slab — upscale with crispEdges for retro medal vibe. */
function PixelMedalIcon() {
  return (
    <svg
      className="proj-detail-pixel-medal"
      viewBox="0 0 7 11"
      width="35"
      height="55"
      aria-hidden="true"
    >
      {/* ribbon */}
      <rect x="1" y="0" width="1" height="3" fill="#9a1f16" />
      <rect x="5" y="0" width="1" height="3" fill="#9a1f16" />
      <rect x="1" y="2" width="1" height="1" fill="#d04030" />
      <rect x="5" y="2" width="1" height="1" fill="#d04030" />
      <rect x="2" y="2" width="3" height="1" fill="#f6d04d" />
      <rect x="2" y="3" width="3" height="1" fill="#e8b923" />
      {/* medal disc */}
      <rect x="2" y="4" width="3" height="1" fill="#b8860b" />
      <rect x="1" y="5" width="5" height="1" fill="#daa520" />
      <rect x="0" y="6" width="7" height="3" fill="#daa520" />
      <rect x="1" y="9" width="5" height="1" fill="#b8860b" />
      <rect x="2" y="10" width="3" height="1" fill="#8b6914" />
      {/* shine pixels */}
      <rect x="1" y="6" width="1" height="1" fill="#fff4b8" opacity="0.85" />
      <rect x="2" y="7" width="1" height="1" fill="#fff4b8" opacity="0.5" />
    </svg>
  );
}

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
  const hasVideo = Boolean(detail?.videoEmbedUrl || detail?.videoFileUrl);

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

  if (!project || !detail || typeof document === 'undefined') return null;

  const titleSlug = project.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  const titleId = titleSlug.length > 0 ? `proj-modal-title-${titleSlug}` : 'proj-modal-title';
  const descriptionId = `${titleId}-description`;

  return createPortal(
    <div className="proj-modal-overlay" role="presentation" onClick={onClose}>
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
            {detail.award ? (
              <section className="proj-detail-award" aria-labelledby={`${titleId}-award`}>
                <div className="proj-detail-award-row">
                  <span className="proj-detail-medal-cell" aria-hidden="true">
                    <PixelMedalIcon />
                  </span>
                  <div className="proj-detail-award-copy">
                    <h3 id={`${titleId}-award`} className="proj-detail-award-heading">
                      Award
                    </h3>
                    <p className="proj-detail-award-text">{detail.award}</p>
                  </div>
                </div>
              </section>
            ) : null}

            {hasVideo ? (
              <section className="proj-modal-video" aria-label={`Video — ${project.name}`}>
                <h3 className="proj-detail-h">Demo</h3>
                <div className="proj-modal-video-shell">
                  {detail.videoFileUrl ? (
                    <video
                      className="proj-modal-video-frame"
                      src={detail.videoFileUrl}
                      title={`${project.name} demo`}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <iframe
                      className="proj-modal-video-frame"
                      src={detail.videoEmbedUrl}
                      title={`${project.name} demo`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>
              </section>
            ) : null}

            <ProjectGalleryCarousel key={project.name} images={gallery} title={project.name} />

            <div className="proj-detail-body">
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
    </div>,
    document.body,
  );
}
