// Header.js
import React from 'react';
import './Sidebar.css';
import Logo from './LogoHeader.jpg'; // Importa a imagem do usuário
function Header() {
    return (
        <header style={{ backgroundColor: '#31363F', color: 'white', padding: '10px', textAlign: 'center' }}>
            <div className="Logo-img">
                {/* Imagem do usuário */}
                <img src={Logo} alt="User" />
            </div>
        </header>
    );
}

export default Header;
