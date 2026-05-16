'use client';

import { useResumeModal } from '@/context/ResumeModalContext';

const TopBar: React.FC = () => {
  const { openResume } = useResumeModal();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-dot"></span>
        <span className="topbar-dot"></span>
        <span className="topbar-dot"></span>
        <span style={{ marginLeft: 6 }}>nikhil_prabhu</span>
      </div>
      <nav className="topbar-nav" aria-label="Site sections">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <button type="button" onClick={openResume}>
          Resume ↗
        </button>
      </nav>
    </div>
  );
};

export default TopBar;
