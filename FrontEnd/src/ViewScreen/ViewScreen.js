import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './ViewScreen.css';
import { useParams } from 'react-router-dom';
import { TokenJWT } from '../Data/TokenJWT';
import { useNavigate } from 'react-router-dom';


function ViewScreen() {
    const navigate = useNavigate();
    const { artigoID } = useParams();
    const [articleData, setArticleData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [markdownString, setMarkdownString] = useState(null);
    const [markdownData, setMarkdownData] = useState(null);
    const [error, setError] = useState('');

    const token = TokenJWT();

    useEffect(() => {
        fetchArticleData();
    }, []);

    const fetchArticleData = async () => {
        try {
            const response = await axios.get(`http://localhost:6419/artigo/id/${artigoID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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
            const response = await axios.get(`http://localhost:6419/conteudo/id/${conteudoID}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
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
                <div className='botao'>
                    <button type="button" onClick={() => navigate('/home')}>Voltar</button>
                </div>
                {imageData && <img className="article-image" src={imageData} alt="Article visual content" />}
                <div className='line'></div>
                <h1 className="article-title">{articleData.titulo}</h1>
                <p className="article-content">{articleData.descricao}</p>
                <div className="caixa">
                    <p className="article-category">Categoria: {articleData.categoria.nome}</p>
                    <p className="article-instructor">Criado por: {articleData.criador.nome}</p>
                </div>
                <div className='line'></div>
                <ReactMarkdown 
                    children={markdownString}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                />
            </div>
        </div>
    );
}

export default ViewScreen;
