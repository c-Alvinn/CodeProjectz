import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function HomePage() {
    const [artigos, setArtigos] = useState([]);
    const useMockData = true; // Altere isso para false para usar dados reais
    const artigosMockados = [
        {
            artigoID: 1,
            titulo: "Aprenda React Hoje",
            descricao: "Um guia completo para aprender React e construir aplicações poderosas.",
            categoria: { nome: "Desenvolvimento Web" },
            imagem: {
                conteudoID: '1'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 2,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 3,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 4,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 5,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 4,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },
        {
            artigoID: 4,
            titulo: "Explorando Node.js",
            descricao: "Descubra como Node.js pode acelerar o desenvolvimento do lado do servidor.",
            categoria: { nome: "Backend" },
            imagem: {
                conteudoID: '2'
            },
            imagemURL: "https://via.placeholder.com/150"
        },

        // Adicione mais artigos conforme necessário
    ];


    useEffect(() => {
        if (useMockData) {
            setArtigos(artigosMockados); //Vou tirar isso aqui depois, usar apenas para teste
        } else {
            fetchArtigos();
        }
    }, []);

    const fetchArtigos = async () => {
        try {
            const response = await axios.get('http://localhost:6419/artigo');
            if (response.status === 200) {
                console.log(response.data);
                const artigosComImagens = await Promise.all(response.data.map(async (artigo) => {
                    return await fetchArtigoCompleto(artigo);
                }));
                setArtigos(artigosComImagens);
                console.log(artigosComImagens);
            }
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
        }
    };

    const fetchArtigoCompleto = async (artigo) => {
        try {
            // Assume que o ID da imagem está armazenado no campo imagemID do artigo
            console.log(artigo.imagem.conteudoID);
            const resImagem = await axios.get(`http://localhost:6419/conteudo/id/${artigo.imagem.conteudoID}`, { responseType: 'blob' });
            const urlImagem = URL.createObjectURL(resImagem.data);
            return {
                ...artigo,
                imagemURL: urlImagem
            };
        } catch (error) {
            console.error('Erro ao buscar imagem do artigo:', error);
            return {
                ...artigo,
                imagemURL: '' // Ou algum placeholder padrão
            };
        }
    };

    return (
        <div className="home-page">

            <h2>Últimos Artigos</h2>
            <div className="scroll-container">

                {artigos.map((artigo, index) => (
                    <Link key={index} to={`/view/${artigo.artigoID}`}>
                        <Card
                            title={artigo.titulo}
                            description={artigo.descricao}
                            category={artigo.categoria.nome}
                            image={artigo.imagemURL}
                        />
                    </Link>
                ))}
            </div>
            
        </div>
    );
}

export default HomePage;
