import React from 'react';
import './Card.css';

interface CardProps {
  id: string;
  title: string;
  description?: string;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, className = '', onClick }) => {
  return (
    <div className={`card ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <h3 className="card-title">{title}</h3>
      <p className="card-id">{id}</p>
      {description && <p className="card-description">{description}</p>}
    </div>
  );
};

export default Card;
