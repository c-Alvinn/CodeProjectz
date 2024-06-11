import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function HomePage() {
    const [artigos, setArtigos] = useState([]);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {    
            fetchArtigos();
            fetchCategorias()
    }, []);

    const fetchArtigos = async () => {
        try {
            const response = await axios.get('http://localhost:6419/artigo/lastFive');
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


    //Pegando todas as categorias:
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:6419/categoria');
            if (response.status === 200) {
                setCategorias(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    function FetchLastFiveArticles({ categoryId }) {
        
    
        useEffect(() => {
            fetchLastFiveArticles();
        }, [categoryId]);

        const fetchLastFiveArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:6419/artigo/lastFive/${categoryId}`);
                if (response.status === 200) {
                    const artigosComImagens = await Promise.all(response.data.map(async (artigo) => {
                        return await fetchArtigoCompleto(artigo);
                    }));
                    setArtigos(artigosComImagens);
                }
            } catch (error) {
                console.error('Erro ao buscar artigos da categoria:', error);
            }
        };

        const fetchArtigoCompleto = async (artigo) => {
            try {
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
            <>
                {artigos.map((artigo, index) => (
                    <Card
                        key={index}
                        title={artigo.titulo}
                        description={artigo.descricao}
                        category={artigo.categoria.nome}
                        image={artigo.imagemURL}
                    />
                ))}
            </>
        );}

        return (
            <div className="home-page">
                <h2>Últimos Artigos</h2>
                <div className="scroll-container">
                    {/* Renderiza os últimos artigos */}
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
    
                {/* Renderiza um scroll-container para cada categoria */}
                {categorias.map((categoria, index) => (
                    <div key={index}>
                        <h2>{categoria.nome}</h2>
                        <div className="scroll-container">
                            {/* Componente para buscar os últimos 5 artigos de uma categoria */}
                            <FetchLastFiveArticles categoryId={categoria.id} />
                        </div>
                    </div>
                ))}
            </div>
        );
}

export default HomePage;
