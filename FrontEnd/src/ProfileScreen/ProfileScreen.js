import React, { useState, useEffect } from 'react';
import './ProfileScreen.css'
import axios from 'axios';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Supondo que esta seja a rota correta para obter o perfil do usuário
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
        <p><strong>Data de Nascimento:</strong> {user && user.dataNascimento}</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
    