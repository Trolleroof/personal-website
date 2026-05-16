'use client';

import { ResumeModalProvider } from '@/context/ResumeModalContext';
import ResumeModal from '@/components/ResumeModal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ResumeModalProvider>
      {children}
      <ResumeModal />
    </ResumeModalProvider>
  );
}
