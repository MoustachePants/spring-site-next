import React from 'react';
import styles from './Loading.module.css';
import { Size } from '@/models/types/style';

type LoadingProps = {
  size?: Size;
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({ size = 'M', color = '#848484ff' }) => {
  return (
    <div
      className={styles.loader}
      style={{
        width: size === 'S' ? '20px' : size === 'M' ? '25px' : '50px',
        borderWidth: size === 'S' ? 2 : size === 'M' ? 3 : 4,
        borderColor: color,
      }}
    ></div>
  );
};

export default Loading;
