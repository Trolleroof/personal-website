import { PROFILE } from '@/lib/data';

const Contact: React.FC = () => (
  <div className="panel" id="contact">
    <div className="panel-header"><span className="ph-icon">☞</span> FIND ME</div>
    <div className="links-grid">
      {PROFILE.contact.map((c) => (
        <a key={c.label} href={c.href} className="link-item">
          <span className="link-icon">{c.icon}</span> {c.label}
        </a>
      ))}
    </div>
  </div>
);

export default Contact;
