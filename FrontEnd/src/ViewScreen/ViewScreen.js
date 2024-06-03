import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './ViewScreen.css';
import { useParams } from 'react-router-dom';

function ViewScreen({  }) { // Utilizando match para capturar o parâmetro da rota
  const { artigoID } = useParams();
  console.log(artigoID);
  const [articleData, setArticleData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [markdownString, setMarkdownString] = useState(null);
  const [markdownData, setMarkdownData] = useState(null);
  const [error, setError] = useState('');
  

  useEffect(() => {
      // Primeira chamada para buscar os dados do artigo
      fetchArticleData();
  }, []);

  

  const fetchArticleData = async () => {
      try {
          const response = await axios.get(`http://192.168.7.21:6419/artigo/id/${artigoID}`);
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
          const response = await axios.get(`http://192.168.7.21:6419/conteudo/id/${conteudoID}`, {
              responseType: 'blob'  // Importante para arquivos binários como imagens
          });
          const url = URL.createObjectURL(response.data);
          setter(url);
      } catch (error) {
          setError('Erro ao buscar conteúdo relacionado.');
          console.error('Erro ao buscar conteúdo:', error);
      }
  };

  fetch(markdownData).then(res => res.text()).then(text => {
    setMarkdownString(text);
  });


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
                <ReactMarkdown>{markdownString}</ReactMarkdown>
            </div>
        </div>
    );
}

export default ViewScreen;
