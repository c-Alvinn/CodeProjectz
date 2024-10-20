import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import './ViewScreen.css';
import { useParams, useNavigate } from 'react-router-dom';
import { TokenJWT } from '../Data/TokenJWT';
import ambiente from './../ambiente.js';

function ViewScreen() {
    const navigate = useNavigate();
    const { artigoID } = useParams();
    const [articleData, setArticleData] = useState(null);
    const [markdownString, setMarkdownString] = useState('');
    const [summary, setSummary] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const token = TokenJWT();

    useEffect(() => {
        fetchArticleData();
    }, []);

    const fetchArticleData = async () => {
        try {
            const response = await axios.get(
                `${ambiente.localHost}/artigo/id/${artigoID}`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data) {
                setArticleData(response.data);
                setMarkdownString(response.data.conteudo.textoMarkdown);
            }
        } catch (error) {
            setError('Erro ao buscar dados do artigo.');
            console.error('Erro ao buscar o artigo:', error);
        }
    };

    const summarizeArticle = async () => {
        try {
            const result = await window.model.generateContent(markdownString);
            const response = await result.response.text();
            setSummary(response);
        } catch (error) {
            console.error('Error summarizing:', error);
            setSummary('Erro ao resumir o artigo.');
        }
    };

    const askQuestion = async () => {
        try {
            const result = await window.model.generateContent(`${markdownString}\nPergunta: ${question}`);
            const response = await result.response.text();
            setAnswer(response);
        } catch (error) {
            console.error('Error answering question:', error);
            setAnswer('Erro ao obter uma resposta da IA.');
        }
    };

    if (!articleData) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="article-screen">
            <div className="article-container">
                <button type="button" onClick={() => navigate('/home')}>Voltar</button>
                <h1 className="article-title">{articleData.titulo}</h1>
                <ReactMarkdown 
                    children={markdownString} 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]} 
                />

                <div className="ai-features">
                    <button onClick={summarizeArticle}>Resumir Artigo</button>
                    <p>Resumo:</p>
                    <ReactMarkdown>{summary}</ReactMarkdown>

                    <input
                        type="text"
                        placeholder="Pergunte sobre o artigo"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button onClick={askQuestion}>Perguntar</button>
                    <p>Resposta:</p>
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default ViewScreen;