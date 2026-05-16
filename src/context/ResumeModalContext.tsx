'use client';

import React, { createContext, useContext, useState } from 'react';

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

  const openResume = () => setIsOpen(true);
  const closeResume = () => setIsOpen(false);

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
