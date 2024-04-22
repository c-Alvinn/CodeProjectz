// Card.js
import React from 'react';
import './Card.css'; // Supondo que você tenha um arquivo CSS para estilos

function Card({ title, image, category }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <span className="card-category">{category}</span>
    </div>
  );
}

export default Card;
