import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './ViewScreen.css';
import { useParams } from 'react-router-dom';

function ViewScreen() {
    const { artigoID } = useParams();
    const [articleData, setArticleData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [markdownString, setMarkdownString] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticleData();
    }, []);

    const fetchArticleData = async () => {
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
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            setter(url);
        } catch (error) {
            setError('Erro ao buscar conteúdo relacionado.');
            console.error('Erro ao buscar conteúdo:', error);
        }
    };

    useEffect(() => {
        if (markdownData) {
            fetch(markdownData)
                .then(res => res.text())
                .then(text => setMarkdownString(text))
                .catch(error => {
                    setError('Erro ao carregar o conteúdo Markdown.');
                    console.error('Erro ao carregar Markdown:', error);
                });
        }
    }, [markdownData]);

    if (!articleData) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="article-screen">
            <div className="article-container">
                {imageData && <img className="article-image" src={imageData} alt="Article visual content" />}
                <h1 className="article-title">{articleData.titulo}</h1>
                <h2 className="article-instructor">Criado por: {articleData.criador.nome}</h2>
                <p className="article-content">{articleData.descricao}</p>
                <h3 className="article-category">Categoria: {articleData.categoria.nome}</h3>
                <ReactMarkdown>{markdownString}</ReactMarkdown>
            </div>
        </div>
    );
}

export default ViewScreen;
