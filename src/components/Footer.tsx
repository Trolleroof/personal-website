const Footer: React.FC = () => (
  <footer className="site-footer">
    <p className="site-footer-inner">
      <span className="site-footer-name">Nikhil Prabhu</span>
      <span className="site-footer-sep" aria-hidden="true">
        ·
      </span>
      <span className="site-footer-meta">{new Date().getFullYear()}</span>
    </p>
  </footer>
);

export default Footer;
