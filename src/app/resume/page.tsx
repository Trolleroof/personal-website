import type { Metadata } from 'next';
import Link from 'next/link';
import ResumeViewer from '@/components/resume/ResumeViewer';
import { PROFILE } from '@/lib/data';
import s from './resume-page.module.css';

const resumeFileName = `${PROFILE.name.replace(/\s+/g, '-')}-Resume.pdf`;

export const metadata: Metadata = {
  title: 'Resume',
  alternates: { canonical: '/resume' },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <div className={s.page}>
      <Link href="/" className={`${s.cornerLink} ${s.backLink}`}>
        ← Back
      </Link>
      <a href={PROFILE.resumeUrl} download={resumeFileName} className={`${s.cornerLink} ${s.downloadLink}`}>
        Download ↓
      </a>
      <span className={s.nameLabel}>{PROFILE.name}</span>
      <ResumeViewer pdfUrl={PROFILE.resumeUrl} />
    </div>
  );
}