// Card.js
import React from 'react';
import { Link } from 'react-router-dom'; // Isso permitirá a navegação entre as páginas
import './Card.css'; // Supondo que você tenha um arquivo CSS para estilos

function Card({ title, image, link }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image"/>
      <Link to={link} className="card-title">{title}</Link>
    </div>
  );
}

export default Card;
