// Sidebar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import userImage from './placeholder.jpg'; // Importa a imagem do usuário

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="user-profile">
                {/* Imagem do usuário */}
                <img src={userImage} alt="User" />
            </div>
            <div className="sidebar-toggle" onClick={toggleSidebar}>
                <div className="icon"></div>
            </div>
            <nav className='botoes-menu'>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/home'); }}>Cursos</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/home'); }}>Projetos</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/home'); }}>Perfil</button>
                <button type='button' onClick={() => { toggleSidebar(); navigate('/'); }}>Sair</button>
            </nav>
        </div>
    );
}

export default Sidebar;
