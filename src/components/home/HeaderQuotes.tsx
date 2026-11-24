'use client';

import { useCallback, useEffect, useState } from 'react';
import SandGrains from './SandGrains';
import s from './home.module.css';

const QUOTES = [
  {
    id: 'durant',
    text: 'Hard work beats talent when talent fails to work hard.',
    credit: 'Kevin Durant',
    devanagari: false,
  },
  {
    id: 'gita',
    text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    credit: 'your right is to the work, not to the fruit',
    devanagari: true,
  },
] as const;

const ROTATE_MS = 9000;

export default function HeaderQuotes() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const advanceQuote = useCallback(() => {
    setIndex((i) => (i + 1) % QUOTES.length);
    setCycle((c) => c + 1);
  }, []);

  if (reducedMotion) {
    return (
      <div className={s.quoteStageStatic}>
        {QUOTES.map((q) => (
          <figure key={q.id} className={s.quotePaneStatic}>
            <blockquote
              className={q.devanagari ? s.quoteDev : s.quoteText}
              lang={q.devanagari ? 'sa' : undefined}
            >
              {q.text}
            </blockquote>
            <figcaption className={s.gloss}>{q.credit}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className={s.quoteStage}>
      <div className={s.quoteTrack} aria-live="polite">
        {QUOTES.map((q, i) => (
          <figure
            key={q.id}
            className={`${s.quotePane} ${i === index ? s.quotePaneActive : ''}`}
            aria-hidden={i !== index}
          >
            <blockquote
              className={q.devanagari ? s.quoteDev : s.quoteText}
              lang={q.devanagari ? 'sa' : undefined}
            >
              {q.text}
            </blockquote>
            <figcaption className={s.gloss}>{q.credit}</figcaption>
          </figure>
        ))}
      </div>
      <SandGrains cycleKey={cycle} durationMs={ROTATE_MS} onComplete={advanceQuote} />
    </div>
  );
}