'use client';

import { useState } from 'react';
import { PROFILE, GuestbookMsg } from '@/lib/data';

const BANNED = ['fuck','shit','bitch','asshole','dick','pussy','cunt','nigg','fag','retard','slut','whore','bastard','crap','spam','viagra','porn','xxx'];

const containsBadWord = (s: string) => {
  const lower = s.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  return BANNED.some((w) => new RegExp(`\\b${w}`, 'i').test(lower));
};

const Guestbook: React.FC = () => {
  const [msgs, setMsgs] = useState<GuestbookMsg[]>(PROFILE.guestbook);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const post = () => {
    setError("");
    const n = name.trim(), t = text.trim();
    if (!n || !t) { setError("fill in both fields"); return; }
    if (n.length > 30) { setError("handle too long (30 max)"); return; }
    if (t.length > 280) { setError("message too long (280 max)"); return; }
    if (containsBadWord(n) || containsBadWord(t)) { setError("watch the language"); return; }
    if (/(https?:\/\/|www\.|\.[a-z]{2,}(\/|\b))/i.test(t)) { setError("no links allowed"); return; }
    if (/(.)\1{6,}/.test(t)) { setError("chill on the spam"); return; }
    const now = new Date();
    setMsgs([{ from: n, text: t, date: `${now.getMonth()+1}/${now.getDate()}` }, ...msgs]);
    setName(""); setText("");
  };

  return (
    <div className="panel">
      <div className="panel-header">Nikhil Prabhu's Friend Comments</div>
      <div className="gb-messages">
        {msgs.map((m, i) => (
          <div className="gb-msg" key={i}>
            <div className="gb-row">
              <span className="gb-from">{m.from}</span>
              <span className="gb-date">{m.date}</span>
            </div>
            <div className="gb-text">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="gb-form">
        <input className="gb-input" placeholder="your name..." value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
        <textarea className="gb-textarea" placeholder="leave a comment... (no profanity, no links)" value={text} onChange={(e) => setText(e.target.value)} maxLength={280}></textarea>
        {error && <div style={{ color: 'var(--pink)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>! {error}</div>}
        <button className="btn btn-pink" style={{ alignSelf: "flex-end", width: 150 }} onClick={post}>Post Comment</button>
      </div>
    </div>
  );
};

export default Guestbook;
