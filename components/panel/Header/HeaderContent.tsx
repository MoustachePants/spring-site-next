'use client';

import React from 'react';
import SearchInput from '../../SearchInput/SearchInput';
import Filters from '../Filters/Filters';
import Icons from '@/style/icons';
import { motion, AnimatePresence } from 'motion/react';
import { useMainPageContext } from '@/context/MainPageContext';

const HeaderContent: React.FC = () => {
  const { isFiltersOpen, toggleFilters } = useMainPageContext();

  return (
    <section className="header-filters-search">
      <div className="header-filters-and-search">
        <SearchInput />
        <div className="filter-button" onClick={toggleFilters}>
          <Icons.filter />
          <span>מתקדם</span>
        </div>
      </div>

      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            <Filters />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeaderContent;
