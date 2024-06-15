import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/LogoHeader.jpg';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Direciona para a página de pesquisa com o termo de busca
    };

    return (
        <header style={{
            backgroundColor: '#31363F', 
            color: 'white', 
            padding: '10px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
        }}>
            <div style={{ width: '33%' }}> {/* Espaço reservado para manter a logo no centro */}</div>
            <div className="Logo-img" onClick={goToHome} style={{ cursor: 'pointer', flexShrink: 0 }}>
                <img src={Logo} alt="Home" style={{ display: 'block', margin: 'auto' }} />
            </div>
            <div className='Search' style={{ width: '33%' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔎"
                        style={{ padding: '8px', marginRight: '100px', width: '150px', color: '#DDDDDD', backgroundColor:'#222831' }}
                    />
                </form>
            </div>
        </header>
    );
}

export default Header;
