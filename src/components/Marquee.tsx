import { PROFILE } from '@/lib/data';

const Marquee: React.FC = () => (
  <div className="marquee-strip">
    <div className="marquee-header">
      <div className="marquee-topbar">
        <div className="marquee-topbar-left">
          <span className="topbar-dot"></span>
          <span className="topbar-dot"></span>
          <span className="topbar-dot"></span>
          <span style={{ marginLeft: 6 }}>nikhil_prabhu</span>
        </div>
        <nav className="marquee-topbar-nav">
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', fontWeight: 600 }}
          >
            Resume
          </a>
        </nav>
      </div>
      <div className="marquee-text">
        fullstack + robotics + rl
      </div>
    </div>
  </div>
);

export default Marquee;
