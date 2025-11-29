'use client';

import React, { useState } from 'react';
import './UpdatesBox.css';
import Icons from '@/style/icons';
import { SpringUpdate } from '@/models/types/springUpdate';
import SpringAddUpdate from '@/components/panel/details/SpringAddUpdate/SpringAddUpdate';

type SpringUpdateProps = {
  updates?: SpringUpdate[];
  springId: string;
};

const SpringUpdates: React.FC<SpringUpdateProps> = ({ updates, springId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  const hasUpdates = updates && updates.length > 0;
  const displayUpdates = hasUpdates ? [...updates].reverse() : [];
  const currentUpdate = displayUpdates[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayUpdates.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayUpdates.length) % displayUpdates.length);
  };

  return (
    <section className="updates-box-container">
      <section className="updates-title-section">
        <div className="icon-wrapper">
          <Icons.updates width={50} height={50} strokeWidth={1.5} />
        </div>
        <h3>עדכונים מהשטח</h3>
      </section>

      <section className="updates-content">
        {showAddUpdate ? (
          <SpringAddUpdate springId={springId} onClose={() => setShowAddUpdate(false)} />
        ) : (
          <>
            {hasUpdates && displayUpdates.length > 1 && (
              <button className="nav-button prev" onClick={handlePrev}>
                <Icons.prev />
              </button>
            )}

            <div className="updates-text-content">
              {hasUpdates && (
                <>
                  <p className="quote">{currentUpdate.update}</p>
                  {currentUpdate.user && <p className="author">{currentUpdate.user}</p>}
                </>
              )}
              <button className={`action-button`} onClick={() => setShowAddUpdate(true)}>
                ביקרת פה? נשמח לעדכון מהשטח :)
              </button>
            </div>

            {hasUpdates && displayUpdates.length > 1 && (
              <button className="nav-button next" onClick={handleNext}>
                <Icons.next />
              </button>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default SpringUpdates;
