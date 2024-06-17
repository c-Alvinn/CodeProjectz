import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/LogoHeader.jpg'; // Ajuste o caminho conforme necessário

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const isLoginOrSignup = location.pathname === '/' || location.pathname === '/signup';

    const goToHome = () => {
        if (!isLoginOrSignup) {
            navigate('/home');
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // Corrige a interpolação de strings
    };

    const hideSearchOnRoutes = ['/', '/signup'];
    const showSearchBar = !hideSearchOnRoutes.includes(location.pathname);

    return (
        <header style={{
            backgroundColor: '#31363F',
            color: 'white',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ width: '33%', visibility: 'hidden' }}></div>
            <div className="Logo-img" onClick={goToHome} style={{ cursor: 'pointer', flexShrink: 0 }}>
                <img src={Logo} alt="Home" style={{ display: 'block', margin: 'auto' }} />
            </div>
            <div className='Search' style={{ width: '33%' }}>
                {showSearchBar ? (
                    <form onSubmit={handleSearch} style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: '50%'  
                    }}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Pesquisar Artigos"
                            style={{
                                flex: 1, 
                                padding: '8px',
                                marginRight: '5px',
                                minWidth: '150px', 
                                color: '#DDDDDD',
                                backgroundColor: '#222831'
                            }}
                        />
                        <button type="submit" className='botaoPesquisa' style={{ width: '35px', height: '40px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="bi bi-search">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </form>
                ) : <div style={{ visibility: 'hidden' }}></div>}
            </div>
        </header>
    );
}

export default Header;
