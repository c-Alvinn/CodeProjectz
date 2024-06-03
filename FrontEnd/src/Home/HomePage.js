import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function HomePage() {
    const [categorias, setCategorias] = useState([]);
    const [artigosPorCategoria, setArtigosPorCategoria] = useState({});
    const [ultimosArtigos, setUltimosArtigos] = useState([]);


    useEffect(() => {
        fetchCategoriasEArtigos();
    }, []);

    const fetchCategoriasEArtigos = async () => {
        try {
            const resCategorias = await axios.get('http://localhost:6419/categoria');
            const resUltimosArtigos = await axios.get('http://localhost:6419/artigo/lastFive');
            if (resCategorias.status === 200) {
                setCategorias(resCategorias.data);
                resCategorias.data.forEach(categoria => {
                    fetchArtigosPorCategoria(categoria.categoriaID);
                });
            }
            if (resUltimosArtigos.status === 200) {
                setUltimosArtigos(resUltimosArtigos.data);
            }
        } catch (error) {
            console.error('Erro ao buscar categorias ou últimos artigos:', error);
        }
    };


    const fetchArtigosPorCategoria = async (categoriaId) => {
        try {
            const resArtigos = await axios.get(`http://localhost:6419/artigo/categoria/${categoriaId}`);
            if (resArtigos.status === 200) {
                setArtigosPorCategoria(prevState => ({
                    ...prevState,
                    [categoriaId]: resArtigos.data
                }));
            }
        } catch (error) {
            console.error(`Erro ao buscar artigos para a categoria ${categoriaId}:`, error);
        }
    };

    return (
        <div className="home-page">
            <h2>Últimos Artigos</h2>
            <div className="scroll-container">
                {ultimosArtigos.map((artigo, index) => (
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

            {categorias.map(categoria => (
                <div key={categoria.categoriaID}>
                    <h3>{categoria.nome}</h3>
                    <div className="scroll-container">
                        {artigosPorCategoria[categoria.categoriaID]?.map((artigo, index) => (
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
            ))}
        </div>
    );
}

export default HomePage;
