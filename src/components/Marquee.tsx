'use client';

import Link from 'next/link';
import { useResumeModal } from '@/context/ResumeModalContext';

const Marquee: React.FC = () => {
  const { openResume } = useResumeModal();

  return (
  <div className="marquee-strip">
    <div className="marquee-header">
      <div className="marquee-topbar">
        <div className="marquee-topbar-left">
          <Link href="/" className="topbar-home-link">
            nikhil prabhu
          </Link>
        </div>
        <nav className="marquee-topbar-nav" aria-label="Site sections">
          <Link href="/projects">Projects</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/blog">Blogs</Link>
          <Link href="/#contact">Contact</Link>
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
