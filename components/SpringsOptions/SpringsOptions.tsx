'use client';

import React, { useEffect, useState } from 'react';
import Grid from '../ui/Grid/Grid';
import Card from '../ui/Card/Card';
import { Spring } from '@/models/types/spring';

const SpringsOptions: React.FC<{ springs: Spring[]; setSelectedSpring: (spring: Spring) => void }> = ({
  springs,
  setSelectedSpring,
}) => {
  return (
    <div className="springs-options-container">
      <h2 className="springs-options-title">Explore Springs ({springs.length})</h2>
      <Grid>
        {springs.map((spring) => (
          <Card
            id={spring._id}
            key={spring._id}
            title={spring.name}
            description={spring.description}
            onClick={() => setSelectedSpring(spring)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default SpringsOptions;
