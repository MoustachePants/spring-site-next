'use client';

import React, { ReactNode, useRef, useCallback } from 'react';
import './Grid.css';

type GridProps = {
  children: ReactNode;
  className?: string;
  onEndReached?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
};

const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  onEndReached,
  isLoading = false,
  hasMore = false,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && onEndReached) {
          onEndReached();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onEndReached]
  );

  return (
    <div className={`grid-layout ${className}`}>
      {children}
      {(hasMore || isLoading) && (
        <div ref={lastElementRef} className="grid-loading-sentinel">
          {isLoading && <p>Loading more...</p>}
          {!hasMore && !isLoading && <p>End of list</p>}
        </div>
      )}
    </div>
  );
};

export default Grid;
