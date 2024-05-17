import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import Card from '../Card/Card';

function HomePage() {
    const [artigos, setArtigos] = useState([]);

    useEffect(() => {
        fetchArtigos();
    }, []);

    const fetchArtigos = () => {
        axios.get('http://localhost:6419/artigo/listAll')
            .then(response => {
                if (response.status === 200) {
                    setArtigos(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar artigos:', error);
            });
    };

    return (
        <div className="home-page">
            <h2>Últimos Artigos</h2>
            <div className="scroll-container">
                {artigos.map((artigo, index) => (
                    <a key={index} href={`/View/${artigo.artigoID}`}>
                        <Card 
                            title={artigo.titulo} 
                            description={artigo.descricao} 
                            category={artigo.categoria.nome} 
                            image={artigo.conteudo.url} 
                            link={`/View/${artigo.artigoID}`}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
