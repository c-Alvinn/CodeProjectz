import React, { useState, useEffect } from 'react';
import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserEmail } from '../Data/UserEmail';
import { TokenJWT } from '../Data/TokenJWT';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = UserEmail();
  const token = TokenJWT();

// Função para formatar a data
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:6419/usuario/perfil/${userEmail}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }); 
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ProfileScreen-container">
      <h1>Meu Perfil</h1>
      <div className="user-profile">
        <img src={user && user.photo}/>
      </div>
      <div className="profile-details">
        <h2>Informações Gerais</h2>
        <p><strong>Nome:</strong> {user && user.nome}</p>
        <p><strong>Sobrenome:</strong> {user && user.sobrenome}</p>
        <p><strong>Email:</strong> {user && user.email}</p>
        <p><strong>Data de Nascimento:</strong> {user && user.dataNascimento ? formatDate(user.dataNascimento) : ''}</p>
        <button className='profile-button' onClick={() => navigate('/editprofile')}>Editar Perfil</button>
    </div>
    </div>
  );
};

export default ProfileScreen;
