'use client';

import React, { useEffect } from 'react';
import { usePanelContext } from '@/context/PanelContext';

interface PanelHeaderProps {
  header?: React.ReactNode;
}

/**
 * PanelHeader is a "remote control" component. 
 * It doesn't render anything itself, but updates the persistent global Panel with the provided header content.
 */
export const PanelHeader = ({ header }: PanelHeaderProps) => {
  const { setHeader } = usePanelContext();

  useEffect(() => {
    setHeader(header);
  }, [header, setHeader]);

  return null;
};
