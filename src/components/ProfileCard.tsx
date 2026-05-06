'use client';

import { useState } from 'react';
import { PROFILE } from '@/lib/data';

const ProfileCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel">
      <div className="profile-name cursor">{PROFILE.name}</div>
      <div className="profile-handle">{PROFILE.handle} · <span style={{ color: "var(--red)" }}>{PROFILE.school}</span></div>
      <div className="deco-line" style={{ margin: "0 12px" }}></div>
      <div className="profile-status">
        <span className="status-label">// current status</span>
        {PROFILE.status}
      </div>
      <div className="profile-actions">
        <button className="btn btn-red" onClick={() => setOpen((o) => !o)}>{open ? "− Socials" : "+ Socials"}</button>
        <button className="btn">✉ Message</button>
      </div>
      <div className={"socials-reveal" + (open ? " open" : "")}>
        <div className="socials-pixels">
          {Array.from({ length: 60 }).map((_, i) => <span key={i} className="sp-px" style={{ animationDelay: `${i * 12}ms` }}></span>)}
        </div>
        <div className="socials-list">
          {PROFILE.contact.map((c, i) => (
            <a key={c.label} href={c.href} className="social-row" style={{ animationDelay: `${300 + i * 70}ms` }}>
              <span className="sr-icon">{c.icon}</span>
              <span className="sr-label">{c.label}</span>
              <span className="sr-arrow">►</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
