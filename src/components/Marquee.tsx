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
        cs @ ucsd &apos;28 &nbsp;&nbsp;|&nbsp;&nbsp; ml systems + distributed infra &nbsp;&nbsp;|&nbsp;&nbsp; sf bay area &nbsp;&nbsp;|&nbsp;&nbsp; currently: research &amp; building
      </div>
    </div>
  </div>
);

export default Marquee;
