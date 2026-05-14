'use client';

import { useState } from 'react';
import { PROFILE } from '@/lib/data';
import ContactLinkItem from './ContactLinkItem';

const ProfileCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel">
      <div className="profile-avatar">
      </div>
      <div className="profile-name cursor">{PROFILE.name}</div>
      <div className="profile-handle">{PROFILE.handle} · <span style={{ color: "var(--pink)" }}>{PROFILE.school}</span></div>
      <div className="deco-line" style={{ margin: "0 12px" }}></div>
      <div className="profile-status">
        <span className="status-label">{'// current status'}</span>
        {PROFILE.status}
      </div>
      <div className="profile-actions">
        <button className="btn btn-pink" onClick={() => setOpen((o) => !o)}>
          {open ? "− Socials" : "+ Contact"}
        </button>
   
      </div>
      <div className={"socials-reveal" + (open ? " open" : "")}>
        <div className="socials-list">
          {PROFILE.contact.map((c, i) => (
            <ContactLinkItem
              key={c.label}
              contact={c}
              className="social-row"
              iconClassName="sr-icon"
              labelClassName="sr-label"
              arrowClassName="sr-arrow"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
