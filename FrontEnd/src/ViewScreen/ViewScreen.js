import React from 'react';
import './ViewScreen.css';

function ArticleScreen() {
  // Dados atualizados para incluir tags
  const articleData = {
    titulo: "Introdução ao Desenvolvimento Web",
    criador: {
      nome: "Gustavo Machado Pontes"
    },
    descricao: "Este é um curso intensivo de desenvolvimento web desenvolvido pelo aluno Gustavo Machado Pontes, no 5º Semestre do curso de Análise e Desenvolvimento de Sistemas",
    conteudo: {
      url: "https://www.youtube.com/embed/01bCZPpSQxY?si=YxW6e6zzYY5ecVG5"
    },
    categoria: {
      nome: "Programação",
      tags: ["Web Development", "Programming", "HTML/CSS", "JavaScript"]
    }
  };

  return(
  <div className="article-screen">
    <div className="article-container">
      <h1 className="article-title">{articleData.titulo}</h1>
      <h2 className="article-instructor">Criado por: {articleData.criador.nome}</h2>
      <iframe
        width="560"
        height="315"
        src={articleData.conteudo.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <p className="article-content">{articleData.descricao}</p>
      <h3 className="article-category">Categoria: {articleData.categoria.nome}</h3>
      <div className="tags">
        {articleData.categoria.tags.map(tag => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
  )
}

export default ArticleScreen;
