import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Dropdown.css';
import { AnimatePresence, motion } from 'motion/react';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  ariaLabel?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
  ariaLabel = 'Dropdown menu'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    // Return focus to trigger when closing
    const triggerBtn = triggerRef.current?.querySelector('button') || triggerRef.current;
    (triggerBtn as HTMLElement)?.focus();
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }

      if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        const items = menuRef.current?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>;
        if (items?.length) {
          const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLElement);
          let nextIndex;
          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % items.length;
          } else {
            nextIndex = (currentIndex - 1 + items.length) % items.length;
          }
          items[nextIndex].focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      // Focus first item when opened
      setTimeout(() => {
        const firstItem = menuRef.current?.querySelector('[role="menuitem"]') as HTMLElement;
        firstItem?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDropdown]);

  return (
    <div className="dropdown-container" ref={containerRef}>
      <div
        className="dropdown-trigger"
        ref={triggerRef}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className={`dropdown-menu ${align}`}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            aria-label={ariaLabel}
          >
            <div className="dropdown-menu-inner" onClick={(e) => e.stopPropagation()}>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<any>, {
                    onClose: closeDropdown,
                  });
                }
                return child;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DropdownItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export const DropdownItem: React.FC<DropdownItemProps & { onClose?: () => void }> = ({
  onClick,
  icon,
  className = '',
  as: Component = 'button',
  onClose,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick?.();
    onClose?.();
  };

  return (
    <Component
      className={`dropdown-item ${className}`}
      onClick={handleClick}
      role="menuitem"
      tabIndex={0}
      {...props}
    >
      {icon && <span className="dropdown-item-icon">{icon}</span>}
    </Component>
  );
};
