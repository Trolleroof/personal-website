import { PROFILE } from '@/lib/data';
import ContactLinkItem from './ContactLinkItem';

const Contact: React.FC = () => (
  <div className="panel" id="contact">
    <div className="panel-header"><span className="ph-icon">☞</span> Find Me Online</div>
    <div className="links-grid">
      {PROFILE.contact.map((c) => (
        <ContactLinkItem key={c.label} contact={c} className="link-item" iconClassName="link-icon" />
      ))}
    </div>
  </div>
);

export default Contact;
