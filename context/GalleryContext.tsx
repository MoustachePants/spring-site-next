'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Spring } from '@/models/types/spring';

type GalleryContextType = {
  isOpen: boolean;
  currentSpring: Spring | null;
  openGallery: (spring: Spring) => void;
  closeGallery: () => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryContextProvider');
  }
  return context;
};

export const GalleryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpring, setCurrentSpring] = useState<Spring | null>(null);

  const openGallery = (spring: Spring) => {
    setCurrentSpring(spring);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
    setCurrentSpring(null); 
  };

  return (
    <GalleryContext.Provider value={{ isOpen, currentSpring, openGallery, closeGallery }}>
      {children}
    </GalleryContext.Provider>
  );
};
