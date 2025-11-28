'use client';

import React, { useEffect, useState } from 'react';
import Grid from '../ui/Grid/Grid';
import Card from '../ui/Card/Card';
import './SpringsOptions.css';
import { Spring } from '@/models/types/spring';
import listSprings from '@/app/actions/listSprings';

const SpringsOptions: React.FC = () => {
  const [springs, setSprings] = useState<Spring[]>([]);

  useEffect(() => {
    const fetchSprings = async () => {
      const springResponse = await listSprings();
      if (!springResponse || springResponse.data?.length === 0) {
        return;
      }

      setSprings(springResponse.data || []);
    };

    fetchSprings();
  }, []);

  return (
    <div className="springs-options-container">
      <h2 className="springs-options-title">Explore Springs ({springs.length})</h2>
      <Grid>
        {springs.map((spring) => (
          <Card
            id={spring._id}
            key={spring._id}
            title={spring.name}
            description={spring.fullDescription}
          />
        ))}
      </Grid>
    </div>
  );
};

export default SpringsOptions;
