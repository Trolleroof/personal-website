'use client';

import { useEffect, useRef, useState } from 'react';
import s from './resume-viewer.module.css';

const MAX_TILT = 13;
const MIN_SCALE = 1;
const MAX_SCALE = 1.5;
const SPRING_K = 0.055;
const SPRING_DAMP = 0.78;

type ResumeViewerProps = {
  pdfUrl: string;
  compact?: boolean;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ResumeViewer({ pdfUrl, compact = false }: ResumeViewerProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    raf: null as number | null,
    hovering: false,
    targetRX: 0,
    targetRY: 0,
    currentRX: 0,
    currentRY: 0,
    targetScale: 1,
    currentScale: 1,
    currentTX: 0,
    currentTY: 0,
    targetTX: 0,
    targetTY: 0,
    velTX: 0,
    velTY: 0,
    isDragging: false,
    dragLastX: 0,
    dragLastY: 0,
    dragMouseVX: 0,
    dragMouseVY: 0,
  });

  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const loading = loadingRef.current;
    if (!canvas || !loading) return;

    let cancelled = false;

    const renderPdf = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const delay = (ms: number) => new Promise((res) => window.setTimeout(res, ms));
        const [pdf] = await Promise.all([
          pdfjs.getDocument({ url: pdfUrl }).promise,
          delay(500),
        ]);

        if (cancelled) return;

        const page = await pdf.getPage(1);
        const dpr = window.devicePixelRatio || 1;
        const maxH = window.innerHeight * (compact ? 0.76 : 0.84);
        const maxW = window.innerWidth * 0.7;

        const base = page.getViewport({ scale: 1 });
        const fitScale = Math.min(maxH / base.height, maxW / base.width);
        const viewport = page.getViewport({ scale: fitScale * dpr });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('No canvas context');

        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        if (cancelled) return;

        loading.style.transition = 'opacity 0.4s ease';
        loading.style.opacity = '0';
        loading.addEventListener(
          'transitionend',
          () => {
            loading.remove();
          },
          { once: true },
        );
      } catch (err) {
        console.error(err);
        if (!cancelled) setLoadError('Could not load PDF.');
      }
    };

    void renderPdf();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, compact]);

  useEffect(() => {
    const scene = sceneRef.current;
    const card = cardRef.current;
    const gloss = glossRef.current;
    if (!scene || !card || !gloss) return;

    const st = stateRef.current;

    const isZoomed = () => st.targetScale > MIN_SCALE;

    const tick = () => {
      st.currentRX = lerp(st.currentRX, st.targetRX, 0.12);
      st.currentRY = lerp(st.currentRY, st.targetRY, 0.12);
      st.currentScale = lerp(st.currentScale, st.targetScale, 0.12);

      if (st.isDragging) {
        st.currentTX = lerp(st.currentTX, st.targetTX, 0.35);
        st.currentTY = lerp(st.currentTY, st.targetTY, 0.35);
      } else if (isZoomed()) {
        st.currentTX = lerp(st.currentTX, st.targetTX, 0.12);
        st.currentTY = lerp(st.currentTY, st.targetTY, 0.12);
        st.velTX = 0;
        st.velTY = 0;
      } else {
        st.velTX += -SPRING_K * st.currentTX;
        st.velTY += -SPRING_K * st.currentTY;
        st.velTX *= SPRING_DAMP;
        st.velTY *= SPRING_DAMP;
        st.currentTX += st.velTX;
        st.currentTY += st.velTY;
        st.targetTX = st.currentTX;
        st.targetTY = st.currentTY;
      }

      const dist = Math.sqrt((st.currentRX / MAX_TILT) ** 2 + (st.currentRY / MAX_TILT) ** 2);
      const lift = st.hovering || st.isDragging ? 1.025 : 1;
      const shadowX = (st.currentRY / MAX_TILT) * 28;
      const shadowY = (st.currentRX / MAX_TILT) * -20 + 36;
      const blur = 48 + dist * 24;
      const opacity = 0.12 + dist * 0.06;

      card.style.transform =
        `translate(${st.currentTX}px, ${st.currentTY}px) ` +
        `rotateX(${st.currentRX}deg) rotateY(${st.currentRY}deg) ` +
        `scale(${st.currentScale * lift})`;
      card.style.boxShadow =
        `${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,${opacity}),` +
        `0 6px 20px rgba(0,0,0,0.06)`;

      const gx = ((st.currentRY / MAX_TILT + 1) / 2) * 100;
      const gy = ((-st.currentRX / MAX_TILT + 1) / 2) * 100;
      gloss.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.24) 0%, transparent 55%)`;

      const txSettled = isZoomed()
        ? Math.abs(st.currentTX - st.targetTX) < 0.05 && Math.abs(st.currentTY - st.targetTY) < 0.05
        : Math.abs(st.currentTX) < 0.1 &&
          Math.abs(st.currentTY) < 0.1 &&
          Math.abs(st.velTX) < 0.01 &&
          Math.abs(st.velTY) < 0.01;

      const still =
        !st.isDragging &&
        txSettled &&
        Math.abs(st.currentRX - st.targetRX) < 0.01 &&
        Math.abs(st.currentRY - st.targetRY) < 0.01 &&
        Math.abs(st.currentScale - st.targetScale) < 0.001;

      st.raf = still ? null : requestAnimationFrame(tick);
    };

    const scheduleFrame = () => {
      if (!st.raf) st.raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!st.isDragging) {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
        st.targetRX = -dy * MAX_TILT;
        st.targetRY = dx * MAX_TILT;
        st.hovering = true;
        card.classList.add(s.cardWrapperTilting);
      }
      scheduleFrame();
    };

    const onMouseLeave = () => {
      if (st.isDragging) return;
      st.targetRX = 0;
      st.targetRY = 0;
      st.hovering = false;
      card.classList.remove(s.cardWrapperTilting);
      scheduleFrame();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      st.isDragging = true;
      st.dragLastX = e.clientX;
      st.dragLastY = e.clientY;
      st.dragMouseVX = 0;
      st.dragMouseVY = 0;
      scene.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      if (!st.isDragging) return;
      const dx = e.clientX - st.dragLastX;
      const dy = e.clientY - st.dragLastY;
      st.dragMouseVX = dx;
      st.dragMouseVY = dy;
      st.dragLastX = e.clientX;
      st.dragLastY = e.clientY;
      st.targetTX += dx;
      st.targetTY += dy;
      scheduleFrame();
    };

    const onWindowMouseUp = () => {
      if (!st.isDragging) return;
      st.isDragging = false;
      scene.style.cursor = '';
      if (!isZoomed()) {
        st.velTX = st.dragMouseVX;
        st.velTY = st.dragMouseVY;
      }
      scheduleFrame();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sr = scene.getBoundingClientRect();
      const mx = e.clientX - (sr.left + sr.width / 2);
      const my = e.clientY - (sr.top + sr.height / 2);
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, st.targetScale * factor));

      if (newScale <= MIN_SCALE) {
        st.targetTX = 0;
        st.targetTY = 0;
      } else {
        const ratio = newScale / st.targetScale;
        st.targetTX = mx - (mx - st.targetTX) * ratio;
        st.targetTY = my - (my - st.targetTY) * ratio;
      }

      st.targetScale = newScale;
      scheduleFrame();
    };

    scene.addEventListener('mousemove', onMouseMove);
    scene.addEventListener('mouseleave', onMouseLeave);
    scene.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
    scene.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      scene.removeEventListener('mousemove', onMouseMove);
      scene.removeEventListener('mouseleave', onMouseLeave);
      scene.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      scene.removeEventListener('wheel', onWheel);
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, []);

  const canvasClass = compact ? `${s.canvas} ${s.canvasCompact}` : s.canvas;
  const loadingClass = compact ? `${s.loading} ${s.loadingCompact}` : s.loading;

  return (
    <div ref={sceneRef} className={compact ? `${s.scene} ${s.sceneCompact}` : s.scene}>
      <div ref={cardRef} className={s.cardWrapper}>
        <canvas ref={canvasRef} className={canvasClass} />
        <div ref={glossRef} className={s.gloss} />
        <div ref={loadingRef} className={loadingClass}>
          {loadError ? (
            <div className={s.error}>{loadError}</div>
          ) : (
            <div className={s.skeletonPage}>
              <div className={`${s.bone} ${s.skName}`} />
              <div className={`${s.bone} ${s.skContact}`} style={{ width: '42%' }} />
              <div className={`${s.bone} ${s.skContact}`} style={{ width: '32%' }} />
              <div className={`${s.skRule} ${s.bone}`} />
              <div className={`${s.bone} ${s.skSection}`} />
              <div className={`${s.bone} ${s.skLine}`} style={{ width: '88%' }} />
              <div className={`${s.bone} ${s.skLine}`} style={{ width: '74%' }} />
              <div className={s.skGap} />
              <div className={`${s.bone} ${s.skSection}`} style={{ width: '28%' }} />
              <div className={`${s.bone} ${s.skLine}`} style={{ width: '92%' }} />
              <div className={s.skBulletRow}>
                <div className={s.skDot} />
                <div className={`${s.skBline}`} style={{ maxWidth: '80%' }} />
              </div>
              <div className={s.skBulletRow}>
                <div className={s.skDot} />
                <div className={`${s.skBline}`} style={{ maxWidth: '68%' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}