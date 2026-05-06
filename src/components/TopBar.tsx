const TopBar: React.FC = () => (
  <div className="topbar">
    <div className="topbar-left">
      <span className="topbar-dot"></span>
      <span className="topbar-dot"></span>
      <span className="topbar-dot"></span>
      <span style={{ marginLeft: 8 }}>x0_profile.exe</span>
    </div>
    <span className="topbar-status">● ONLINE</span>
    <span style={{ fontSize: 13, color: "#888" }}>[ last login: today ]</span>
  </div>
);

export default TopBar;
