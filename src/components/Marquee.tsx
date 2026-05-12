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
          <a href="#" style={{ color: '#fff', fontWeight: 600 }}>Resume</a>
        </nav>
      </div>
      <div className="marquee-text">
        ★ welcome to my profile ★ &nbsp;&nbsp;|&nbsp;&nbsp; cs student &amp; builder &nbsp;&nbsp;|&nbsp;&nbsp; current status: shipping &nbsp;&nbsp;|&nbsp;&nbsp; 404: sleep not found &nbsp;&nbsp;|&nbsp;&nbsp; ★ add me as a friend ★ &nbsp;&nbsp;|&nbsp;&nbsp; ucsd '26 &nbsp;&nbsp;|&nbsp;&nbsp; ml + systems
      </div>
    </div>
  </div>
);

export default Marquee;
