'use client';

import { useResumeModal } from '@/context/ResumeModalContext';

const Marquee: React.FC = () => {
  const { openResume } = useResumeModal();

  return (
  <div className="marquee-strip">
    <div className="marquee-header">
      <div className="marquee-topbar">
        <div className="marquee-topbar-left">
          <span className="topbar-dot"></span>
          <span className="topbar-dot"></span>
          <span className="topbar-dot"></span>
          <span style={{ marginLeft: 6 }}>nikhil_prabhu</span>
        </div>
        <nav className="marquee-topbar-nav" aria-label="Site sections">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <button type="button" onClick={openResume}>
            Resume
          </button>
        </nav>
      </div>
    </div>
  </div>
  );
};

export default Marquee;
