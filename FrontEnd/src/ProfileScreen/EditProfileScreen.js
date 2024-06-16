import React, { useState, useEffect } from 'react';
import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfileScreen = () => {
  const [user, setUser] = useState({
    nome: '',
    sobrenome: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:6419/usuario/perfil/1');
        setUser({
          nome: response.data.nome,
          sobrenome: response.data.sobrenome,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const validateEmailDomain = (email) => {
    const allowedDomains = ['@estudante.iftm.edu.br', '@iftm.edu.br'];
    return allowedDomains.some(domain => email.endsWith(domain));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.nome || !user.sobrenome || !user.email) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateEmailDomain(user.email)) {
      setErrorMessage('O e-mail deve ser do domínio @estudante.iftm.edu.br ou @iftm.edu.br.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:6419/usuario/perfil/alterar/1', user);
      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage('Erro ao atualizar perfil. Tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ProfileScreen-container">
      <h1>Editar Perfil</h1>
      <div className="user-profile">
        <img src={user.photo} alt="User profile"/>
      </div>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={user.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="sobrenome"
          placeholder="Sobrenome"
          value={user.sobrenome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <button type="submit">Salvar</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditProfileScreen;
