// Sidebar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import userImage from '../assets/images/placeholder.png'; 


function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Lista de caminhos onde a Sidebar não deve aparecer
    const hiddenPaths = ['/', '/signup'];
    console.log(location)

    // Verifica se a rota atual está na lista de rotas onde a Sidebar não deve ser exibida
    if (hiddenPaths.includes(location.pathname)) {
        return null; // Não renderiza a Sidebar
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="user-profile">
                <img src={userImage} alt="User" />
            </div>
            <div className="sidebar-toggle" onClick={toggleSidebar}>
                <div className="icon"></div>
            </div>
            <nav className='botoes-menu'>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/home'); }}>Artigos</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/profile'); }}>Perfil</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/add'); }}>Adicionar</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/'); }}>Sair</button>
            </nav>
        </div>
    );
}

export default Sidebar;
