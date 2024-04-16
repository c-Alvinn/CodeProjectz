import React from 'react';
import './ViewScreen.css';

function ArticleScreen() {
  // Dados mockados para o exemplo, normalmente você receberia isso como props ou faria uma chamada API
  const articleData = {
    title: "Introdução ao Desenvolvimento Web",
    image: "http://placekitten.com/200/300", // Link para uma imagem de placeholder
    content: "Este é um curso intensivo de desenvolvimento web...",
    link: "https://exemplo.com/curso-desenvolvimento-web"
  };

  return (
    <div className="article-screen">
      <div className="article-container">
        <h1 className="article-title">{articleData.title}</h1>
        <img src={articleData.image} alt={articleData.title} className="article-image" />
        <p className="article-content">{articleData.content}</p>
        <a href={articleData.link} className="article-link" target="_blank" rel="noopener noreferrer">Acesse o curso</a>
      </div>
    </div>
  );
}

export default ArticleScreen;
