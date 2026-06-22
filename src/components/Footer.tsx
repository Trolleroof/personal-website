const Footer: React.FC = () => (
  <footer className="site-footer">
    <p className="site-footer-inner">
      <span className="site-footer-name">Nikhil Prabhu</span>
      <span className="site-footer-sep" aria-hidden="true">
        ·
      </span>
      <span className="site-footer-meta">{new Date().getFullYear()}</span>
      <span className="site-footer-sep" aria-hidden="true">
        ·
      </span>
      <a className="site-footer-link" href="/llms.txt">
        llms.txt
      </a>
    </p>
  </footer>
);

export default Footer;
