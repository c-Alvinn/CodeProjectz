import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './ViewScreen.css';

function ViewScreen({ match }) { // Utilizando match para capturar o parâmetro da rota
  const [articleData, setArticleData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [markdownData, setMarkdownData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
      // Primeira chamada para buscar os dados do artigo
      fetchArticleData(match.params.artigoID);
  }, [match.params.artigoID]);

  const fetchArticleData = async (artigoID) => {
      try {
          const response = await axios.get(`http://localhost:6419/artigo/id/${artigoID}`);
          if (response.data) {
              setArticleData(response.data);
              fetchContentData(response.data.conteudo.conteudoID, setMarkdownData);
              fetchContentData(response.data.imagem.conteudoID, setImageData);
          }
      } catch (error) {
          setError('Erro ao buscar dados do artigo.');
          console.error('Erro ao buscar o artigo:', error);
      }
  };

  const fetchContentData = async (conteudoID, setter) => {
      try {
          const response = await axios.get(`http://localhost:6419/conteudo/id/${conteudoID}`, {
              responseType: 'blob'  // Importante para arquivos binários como imagens
          });
          const url = URL.createObjectURL(response.data);
          setter(url);
      } catch (error) {
          setError('Erro ao buscar conteúdo relacionado.');
          console.error('Erro ao buscar conteúdo:', error);
      }
  };

  if (!articleData) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="article-screen">
          <div className="article-container">
              <h1 className="article-title">{articleData.titulo}</h1>
              <h2 className="article-instructor">Criado por: {articleData.criador.nome}</h2>
              {imageData && <img src={imageData} alt="Article visual content" />}
              <p className="article-content">{articleData.descricao}</p>
              <h3 className="article-category">Categoria: {articleData.categoria.nome}</h3>
              {markdownData && <iframe src={markdownData} style={{width: "100%", height: "500px"}} />}
          </div>
      </div>
  );
}

export default ViewScreen;
