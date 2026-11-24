'use client';

import { useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useResumeModal } from '@/context/ResumeModalContext';
import ResumeViewer from '@/components/resume/ResumeViewer';
import m from './resume/resume-modal.module.css';

const resumeFileName = `${PROFILE.name.replace(/\s+/g, '-')}-Resume.pdf`;

const ResumeModal = () => {
  const { isOpen, closeResume } = useResumeModal();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeResume();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeResume]);

  if (!isOpen) return null;

  return (
    <div
      className={m.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      onClick={closeResume}
    >
      <button type="button" className={`${m.cornerLink} ${m.backLink}`} onClick={closeResume}>
        ← Close
      </button>
      <a
        href={PROFILE.resumeUrl}
        download={resumeFileName}
        className={`${m.cornerLink} ${m.downloadLink}`}
        onClick={(e) => e.stopPropagation()}
      >
        Download ↓
      </a>
      <span className={m.nameLabel}>{PROFILE.name}</span>
      <div className={m.panel} onClick={(e) => e.stopPropagation()}>
        <ResumeViewer pdfUrl={PROFILE.resumeUrl} compact />
      </div>
    </div>
  );
};

export default ResumeModal;