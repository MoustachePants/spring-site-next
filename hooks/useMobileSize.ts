"use client";

import { useState, useEffect } from "react";

/**
 * useMobileSize
 * Returns true if window.innerWidth < 768 (mobile), false otherwise.
 * SSR-safe: always returns false on server, updates on client.
 */
export function useMobileSize(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    const handleMatchChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleMatchChange(mediaQuery);

    // Modern browsers support addEventListener on MediaQueryList
    mediaQuery.addEventListener('change', handleMatchChange);
    
    return () => mediaQuery.removeEventListener('change', handleMatchChange);
  }, []);

  return isMobile;
}
