import React, { useEffect, useRef } from 'react';
import './LoadingButton.css';

type LoadingButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  isLoading?: boolean;
  loadingTimeoutMs?: number;
  onTimeout?: () => void;
  disabled?: boolean;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  isLoading = false,
  loadingTimeoutMs,
  onTimeout,
  disabled = false,
  title,
  className = '',
  children,
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && loadingTimeoutMs && onTimeout) {
      timeoutRef.current = setTimeout(() => {
        onTimeout();
      }, loadingTimeoutMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isLoading, loadingTimeoutMs, onTimeout]);

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      title={title}
      className={`loading-button ${className} ${isLoading ? 'loading-button--loading' : ''}`}
    >
      {isLoading ? (
        <span className="loading-button__spinner" />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;

