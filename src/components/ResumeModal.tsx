'use client';

import { useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useResumeModal } from '@/context/ResumeModalContext';

const resumeFileName =
  `${PROFILE.name.replace(/\s+/g, '-')}-Resume.pdf`;

const ResumeModal: React.FC = () => {
  const { isOpen, closeResume } = useResumeModal();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={closeResume}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-toolbar">
          <div className="resume-modal-heading">
            <span className="ph-icon">■</span>
            <span className="resume-modal-title">Resume</span>
          </div>
          <div className="resume-modal-actions">
            <a
              href={PROFILE.resumeUrl}
              download={resumeFileName}
              className="btn resume-download-btn"
            >
              Download PDF
            </a>
            <button
              type="button"
              className="resume-modal-close"
              onClick={closeResume}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="resume-loading-screen">
            <div className="pixelated-loader"></div>
          </div>
        ) : (
          <div className="resume-preview-scroll">
            <img
              src={PROFILE.resumePreviewUrl}
              alt={`${PROFILE.name} — resume`}
              className="resume-preview-img"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
