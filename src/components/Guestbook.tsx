'use client';

import { useEffect, useState } from 'react';
import { PROFILE, GuestbookMsg } from '@/lib/data';

const BANNED = [
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'cunt', 'nigg',
  'fag', 'retard', 'slut', 'whore', 'bastard', 'crap', 'viagra', 'porn', 'xxx',
];

const INVISIBLE_CHARS = /[\u200B-\u200F\u2060\uFEFF]/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;
const LEET_MAP: Record<string, string> = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '7': 't',
  '$': 's',
  '@': 'a',
  '!': 'i',
};

const CONFUSABLE_MAP: Record<string, string> = {
  '\u0430': 'a', // Cyrillic а
  '\u03B1': 'a', // Greek α
  '\u0435': 'e', // Cyrillic е
  '\u03BF': 'o', // Greek ο
  '\u043E': 'o', // Cyrillic о
  '\u0440': 'p', // Cyrillic р
  '\u03C1': 'p', // Greek ρ
  '\u0455': 's', // Cyrillic ѕ
  '\u0441': 'c', // Cyrillic с
  '\u03C7': 'x', // Greek χ
  '\u0445': 'x', // Cyrillic х
  '\u0456': 'i', // Cyrillic і
  '\u03B9': 'i', // Greek ι
  '\u0458': 'j', // Cyrillic ј
  '\u03BD': 'v', // Greek ν
  '\u0443': 'y', // Cyrillic у
};

const replaceConfusables = (s: string) =>
  s
    .split('')
    .map((ch) => CONFUSABLE_MAP[ch] ?? ch)
    .join('');

const normalizeBase = (s: string) =>
  replaceConfusables(s)
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '')
    .replace(INVISIBLE_CHARS, '')
    .toLowerCase();

const normalizeForWordCheck = (s: string) =>
  normalizeBase(s)
    .split('')
    .map((ch) => LEET_MAP[ch] ?? ch)
    .join('')
    .replace(/(.)\1{2,}/g, '$1')
    .replace(/[^a-z0-9]+/g, '');

const containsBadWord = (s: string) => {
  const normalized = normalizeForWordCheck(s);
  return BANNED.some((w) => normalized.includes(w));
};

const looksLikeLink = (s: string) => {
  const base = normalizeBase(s)
    .split('')
    .map((ch) => LEET_MAP[ch] ?? ch)
    .join('');
  const compact = base.replace(/\s+/g, ' ');
  const deobfuscatedDot = compact.replace(/\s*(?:\.|\(dot\)|\[dot\]|\{dot\}|\bd(?:o|0)t\b)\s*/gi, '.');
  const squashed = base.replace(/[\s()[\]{}<>\\/_-]+/g, '');

  return (
    /(https?:\/\/|ftp:\/\/|www\.|hxxps?:\/\/)/i.test(base) ||
    /h\s*[tx]\s*[tx]\s*p\s*s?\s*[:;/\\]\s*[:;/\\]/i.test(base) ||
    /w\s*w\s*w\s*[\.\s]/i.test(base) ||
    /\[[^\]]+\]\([^)]+\)/.test(base) ||
    /<a\s+href=/i.test(base) ||
    /\b[a-z0-9-]+\.(com|org|net|io|co|ai|gg|dev|app|me|edu|gov|xyz|info|biz)\b/i.test(deobfuscatedDot) ||
    /\b(discord\.gg|t\.me|bit\.ly|tinyurl\.com)\b/i.test(deobfuscatedDot) ||
    /\b(?:https?|ftp|www|discordgg|tme|bitly)\b/i.test(squashed)
  );
};

const moderateMessage = (name: string, text: string): string => {
  if (containsBadWord(name) || containsBadWord(text)) return 'watch the language';
  if (looksLikeLink(name) || looksLikeLink(text)) return 'no links allowed';
  if (/(.)\1{6,}/.test(text)) return 'chill on the spam';
  return '';
};

function randomCaptchaSum() {
  return {
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1,
  };
}

const Guestbook: React.FC = () => {
  const [msgs, setMsgs] = useState<GuestbookMsg[]>(PROFILE.guestbook);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState('');
  const [captchaSum, setCaptchaSum] = useState({ a: 3, b: 8 });
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    setCaptchaSum(randomCaptchaSum());
  }, []);

  const refreshCaptcha = () => {
    setCaptchaSum(randomCaptchaSum());
    setCaptchaInput('');
  };

  const post = () => {
    setError('');
    const n = name.trim(), t = text.trim();
    if (honeypot.trim()) return;
    if (!n || !t) { setError('fill in both fields'); return; }
    if (n.length > 30) { setError('handle too long (30 max)'); return; }
    if (t.length > 280) { setError('message too long (280 max)'); return; }
    const cap = captchaInput.trim();
    const expected = captchaSum.a + captchaSum.b;
    if (cap === '') {
      setError('captcha is blank idiot try again');
      refreshCaptcha();
      return;
    }
    const parsed = Number.parseInt(cap, 10);
    if (!Number.isFinite(parsed) || parsed !== expected) {
      setError('why cant you add try again');
      refreshCaptcha();
      return;
    }
    const moderationError = moderateMessage(n, t);
    if (moderationError) { setError(moderationError); refreshCaptcha(); return; }
    const now = new Date();
    setMsgs((prev) => [{ from: n, text: t, date: `${now.getMonth() + 1}/${now.getDate()}` }, ...prev]);
    setName(''); setText(''); refreshCaptcha();
  };

  return (
    <div className="panel" id="guestbook">
      <div className="panel-header">Leave a comment</div>
      <div className="gb-messages">
        {msgs.map((m, i) => {
          const blocked = Boolean(moderateMessage(m.from, m.text));
          return (
            <div className="gb-msg" key={i}>
              <div className="gb-row">
                <span className="gb-from">{blocked ? 'mod_bot' : m.from}</span>
                <span className="gb-date">{m.date}</span>
              </div>
              <div className="gb-text">{blocked ? '[comment removed by moderation]' : m.text}</div>
            </div>
          );
        })}
      </div>
      <div className="gb-form">
        <input className="gb-input" placeholder="your name..." value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
        <textarea className="gb-textarea" placeholder="leave a comment... (no profanity, no links)" value={text} onChange={(e) => setText(e.target.value)} maxLength={280}></textarea>
        <div className="gb-captcha-row">
          <span id="guestbook-captcha-label" className="gb-captcha-label">
           what is {captchaSum.a} + {captchaSum.b}?
          </span>
          <input
            id="guestbook-captcha"
            type="text"
            inputMode="numeric"
            className="gb-captcha-input"
            autoComplete="off"
            aria-labelledby="guestbook-captcha-label"
            placeholder="?"
            maxLength={3}
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, ''))}
          />
          <button type="button" className="gb-captcha-refresh" onClick={refreshCaptcha}>
            New question
          </button>
        </div>
        <div className="gb-honey" aria-hidden="true">
          <label htmlFor="gb-company-url">Company website</label>
          <input
            id="gb-company-url"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'var(--pink)', fontSize: 11, letterSpacing: '0.06em' }}>! {error}</div>}
        <button type="button" className="btn btn-pink" style={{ alignSelf: 'flex-end', width: 150 }} onClick={post}>Post Comment</button>
      </div>
    </div>
  );
};

export default Guestbook;
