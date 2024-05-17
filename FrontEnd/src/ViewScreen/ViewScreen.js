import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewScreen.css';

function ArticleScreen({ match }) { // Se estiver usando React Router, pode obter o ID via parâmetros de rota
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:6419/artigo/id/${match.params.articleID}`);
        setArticleData(response.data);
      } catch (error) {
        setError('Erro ao buscar dados do artigo.');
        console.error('Erro ao buscar o artigo:', error);
      }
    };

    fetchArticleData();
  }, [match.params.articleID]);

  if (!articleData) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="article-screen">
      <div className="article-container">
        <h1 className="article-title">{articleData.titulo}</h1>
        <h2 className="article-instructor">Criado por: {articleData.criador.nome}</h2>
        <iframe
          width="560"
          height="315"
          src={articleData.conteudo.url} // Certifique-se de que este campo está corretamente mapeado
          title="Video do Artigo"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <p className="article-content">{articleData.descricao}</p>
        <h3 className="article-category">Categoria: {articleData.categoria.nome}</h3>
        <div className="tags">
          {articleData.categoria.tags && articleData.categoria.tags.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleScreen;

