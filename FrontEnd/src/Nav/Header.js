
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/LogoHeader.jpg';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const noNavigationPaths = ['/', '/signup', '/login'];

    const goToHome = () => {
        if (!noNavigationPaths.includes(location.pathname)) {
            navigate('/home'); 
        }
    };

    return (
        <header style={{ backgroundColor: '#31363F', color: 'white', padding: '10px', textAlign: 'center' }}>
            <div className="Logo-img" onClick={goToHome} style={{ cursor: 'pointer' }}>
                <img src={Logo} alt="Home" />
            </div>
        </header>
    );
}

export default Header;
