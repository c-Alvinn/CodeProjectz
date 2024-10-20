import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import Card from '../Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { TokenJWT } from '../Data/TokenJWT';
import ambiente from './../ambiente.js';

function HomePage() {
    const navigate = useNavigate();
    const [artigos, setArtigos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const token = TokenJWT();

    useEffect(() => {
        if (token == ''){
            navigate('/');
        }
        fetchArtigos();
        fetchCategorias();
    }, []);

    const fetchArtigos = async () => {
        try {
            const response = await axios.get(`${ambiente.localHost}/artigo/lastFive`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const artigosComImagens = await Promise.all(response.data.map(async (artigo) => {
                    return await fetchArtigoCompleto(artigo);
                }));
                setArtigos(artigosComImagens);
            }
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
        }
    };

    const fetchArtigoCompleto = async (artigo) => {
        try {
            const resImagem = await axios.get(`${ambiente.localHost}/conteudo/id/${artigo.imagem.conteudoID}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob'
                });
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

    const fetchCategorias = async () => {
        try {
            const response = await axios.get(`${ambiente.localHost}/categoria`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setCategorias(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };


    function FetchLastFiveArticles({ categoryId }) {
        const [artigosCategoria, setArtigosCategoria] = useState([]);
    
        useEffect(() => {
            const fetchLastFiveArticles = async () => {
                try {
                    const response = await axios.get(`${ambiente.localHost}/artigo/lastFive/${categoryId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        const artigosComImagens = await Promise.all(response.data.map(async (artigo) => {
                            const urlImagem = await fetchArtigoImageURL(artigo.imagem.conteudoID);
                            return { ...artigo, imagemURL: urlImagem };
                        }));
                        setArtigosCategoria(artigosComImagens);
                    }
                } catch (error) {
                    console.error('Erro ao buscar artigos da categoria:', error);
                }
            };
    
            fetchLastFiveArticles();
        }, [categoryId]);
    
        const fetchArtigoImageURL = async (conteudoID) => {
            try {
                const resImagem = await axios.get(`${ambiente.localHost}/conteudo/id/${conteudoID}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: 'blob'
                });
                return URL.createObjectURL(resImagem.data);
            } catch (error) {
                console.error('Erro ao buscar imagem do artigo:', error);
                return ''; // Ou algum placeholder padrão
            }
        };
    
        return (
            <>
                {artigosCategoria.map((artigo, index) => (
                    <Link key={index} to={`/view/${artigo.artigoID}`}>
                        <Card
                            title={artigo.titulo}
                            description={artigo.descricao}
                            category={artigo.categoria.nome}
                            image={artigo.imagemURL}
                        />
                    </Link>
                ))}
            </>
        );
    }
    

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
            {categorias.map((categoria, index) => (
                <div key={index}>
                    <h2>{categoria.nome}</h2>
                    
                    <div className="scroll-container">
                        <FetchLastFiveArticles categoryId={categoria.categoriaID} />
                    </div>
                </div>
            ))}


        </div>
    );
}

export default HomePage;
