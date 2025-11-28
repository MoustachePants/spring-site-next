import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-description">{description}</p>}
    </div>
  );
};

export default Card;
