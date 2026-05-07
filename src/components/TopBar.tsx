const TopBar: React.FC = () => (
  <div className="topbar">
    <div className="topbar-left">
      <span className="topbar-dot"></span>
      <span className="topbar-dot"></span>
      <span className="topbar-dot"></span>
      <span style={{ marginLeft: 6 }}>nikhi_prabhu ✨</span>
    </div>
    <nav className="topbar-nav">
      <a href="#projects">Work</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
      <a href="#" style={{ color: '#fff', fontWeight: 600 }}>Resume ↗</a>
    </nav>
  </div>
);

export default TopBar;
