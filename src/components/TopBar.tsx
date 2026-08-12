'use client';

import Link from 'next/link';
import { useResumeModal } from '@/context/ResumeModalContext';

const TopBar: React.FC = () => {
  const { openResume } = useResumeModal();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link href="/" className="topbar-home-link">
          nikhil prabhu
        </Link>
      </div>
      <nav className="topbar-nav" aria-label="Site sections">
        <Link href="/">Projects</Link>
        <a href="#experience">Experience</a>
        <Link href="/blog">Blogs</Link>
        <a href="#contact">Contact</a>
        <button type="button" onClick={openResume}>
          Resume ↗
        </button>
      </nav>
    </div>
  );
};

export default TopBar;
