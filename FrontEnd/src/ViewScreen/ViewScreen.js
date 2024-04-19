import React from 'react';
import './ViewScreen.css';

function ArticleScreen() {
  // Dados atualizados para incluir tags
  const articleData = {
    title: "Introdução ao Desenvolvimento Web",
    instructor: "Gustavo Machado Pontes",
    content: "Este é um curso intensivo de desenvolvimento web desenvolvido pelo aluno Gustavo Machado Pontes, no 5º Semestre do curso de Análise e Desenvolvimento de Sistemas",
    link: "https://www.youtube.com/embed/01bCZPpSQxY?si=YxW6e6zzYY5ecVG5",
    tags: ["Web Development", "Programming", "HTML/CSS", "JavaScript"] // Tags adicionadas
  };

  return (
    <div className="article-screen">
      <div className="article-container">
        <h1 className="article-title">{articleData.title}</h1>
        <h2 className="article-title">Instrutor: {articleData.instructor}</h2>
        <iframe width="560" height="315" src={articleData.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <p className="article-content">{articleData.content}</p>
        <div className="tags">
          {articleData.tags.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleScreen;
