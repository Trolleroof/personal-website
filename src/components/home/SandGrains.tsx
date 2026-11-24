'use client';

import { useEffect, useRef } from 'react';
import s from './home.module.css';

type Grain = {
  baseY: number;
  size: number;
  delay: number;
  wobble: number;
  drift: number;
  tone: number;
  squat: number;
};

type SandGrainsProps = {
  cycleKey: number;
  durationMs: number;
  onComplete: () => void;
};

const W = 320;
const H = 40;
const GRAIN_COUNT = 240;

function makeGrains(): Grain[] {
  return Array.from({ length: GRAIN_COUNT }, () => ({
    baseY: 6 + Math.random() * (H - 12),
    size: 0.7 + Math.random() * 2.8,
    delay: Math.random() * 0.42,
    wobble: Math.random() * Math.PI * 2,
    drift: (Math.random() - 0.5) * 1.4,
    tone: 0.45 + Math.random() * 0.55,
    squat: 0.55 + Math.random() * 0.45,
  }));
}

export default function SandGrains({ cycleKey, durationMs, onComplete }: SandGrainsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    doneRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const grains = makeGrains();
    const start = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);

      ctx.clearRect(0, 0, W, H);

      for (const g of grains) {
        const local = Math.max(0, (progress - g.delay) / Math.max(0.08, 1 - g.delay));
        if (local <= 0) continue;

        const pile = Math.pow(local, 1.35);
        const x =
          pile * (W - 8) +
          g.drift * local * 14 +
          Math.sin(local * 9 + g.wobble) * (2.5 + local * 5);
        const y =
          g.baseY + Math.sin(local * 11 + g.wobble) * (1.5 + local * 2.5) + Math.cos(local * 17 + g.wobble) * 1.2;
        const swell = 1 + local * 0.85;
        const alpha = Math.min(0.82, 0.1 + local * 0.62) * g.tone;
        const glint = g.tone > 0.9;

        ctx.fillStyle = glint
          ? `rgba(216, 226, 248, ${Math.min(0.92, alpha * 1.15)})`
          : `rgba(${122 + g.tone * 66}, ${136 + g.tone * 62}, ${188 + g.tone * 46}, ${alpha})`;
        ctx.beginPath();
        ctx.ellipse(
          x,
          y,
          g.size * swell,
          g.size * g.squat * swell,
          g.wobble * 0.15,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
        return;
      }

      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current();
      }
    };

    raf = requestAnimationFrame(draw);
    const failSafe = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onCompleteRef.current();
      }
    }, durationMs + 120);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failSafe);
    };
  }, [cycleKey, durationMs]);

  return (
    <canvas
      ref={canvasRef}
      className={s.sandCanvas}
      width={W}
      height={H}
      aria-hidden="true"
    />
  );
}