'use client';

import React, { useEffect, useState } from 'react';
import Grid from '../ui/Grid/Grid';
import Card from '../ui/Card/Card';
import './SpringsOptions.css';

interface Spring {
  id: number;
  title: string;
  description: string;
}

// Mock async fetch function (simulating DB call)
const fetchSprings = async (page: number, limit: number): Promise<Spring[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSprings = Array.from({ length: limit }, (_, i) => {
        const id = (page - 1) * limit + i + 1;
        return {
          id,
          title: `Spring Option ${id}`,
          description: 'A beautiful spring location with clear water and scenic views.',
        };
      });
      resolve(newSprings);
    }, 500); // Simulate 500ms delay
  });
};

const SpringsOptions: React.FC = () => {
  const [springs, setSprings] = useState<Spring[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const TOTAL_ITEMS = 500;
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadSprings = async () => {
      if (springs.length >= TOTAL_ITEMS) {
        setHasMore(false);
        return;
      }

      setLoading(true);
      try {
        const newSprings = await fetchSprings(page, ITEMS_PER_PAGE);
        setSprings((prev) => {
          // Avoid duplicates if strict mode causes double fetch
          const existingIds = new Set(prev.map((s) => s.id));
          const uniqueNewSprings = newSprings.filter((s) => !existingIds.has(s.id));
          return [...prev, ...uniqueNewSprings];
        });
        if (springs.length + newSprings.length >= TOTAL_ITEMS) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch springs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSprings();
  }, [page]);

  return (
    <div className="springs-options-container">
      <h2 className="springs-options-title">Explore Springs ({springs.length})</h2>
      <Grid onEndReached={() => setPage((prev) => prev + 1)} isLoading={loading} hasMore={hasMore}>
        {springs.map((spring) => (
          <Card key={spring.id} title={spring.title} description={spring.description} />
        ))}
      </Grid>
    </div>
  );
};

export default SpringsOptions;
