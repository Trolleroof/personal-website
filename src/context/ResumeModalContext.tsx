'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ResumeModalContextType {
  isOpen: boolean;
  openResume: () => void;
  closeResume: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(
  undefined
);

export const ResumeModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = () => {
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}#resume`);
    }
  };

  const closeResume = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.location.hash === '#resume') {
      const { pathname, search } = window.location;
      window.history.replaceState(null, '', `${pathname}${search}`);
    }
  };

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === '#resume') setIsOpen(true);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResume, closeResume }}>
      {children}
    </ResumeModalContext.Provider>
  );
};

export const useResumeModal = () => {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error('useResumeModal must be used within ResumeModalProvider');
  }
  return context;
};
