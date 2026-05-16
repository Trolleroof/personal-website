'use client';

import { PROFILE } from '@/lib/data';
import { useResumeModal } from '@/context/ResumeModalContext';

const resumeFileName =
  `${PROFILE.name.replace(/\s+/g, '-')}-Resume.pdf`;

const ResumeModal: React.FC = () => {
  const { isOpen, closeResume } = useResumeModal();

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
        <div className="resume-preview-scroll">
          <img
            src={PROFILE.resumePreviewUrl}
            alt={`${PROFILE.name} — resume`}
            className="resume-preview-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
