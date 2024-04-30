import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function SignUpPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagens de erro
  const navigate = useNavigate();

  const clearFields = () => {
    setPassword('');
    setPasswordRepeat('');
  };

  const validateFields = () => {
    if (!nome || !email || !password || !passwordRepeat) {
      setErrorMessage('Todos os campos são obrigatórios.');
      clearFields(); // Limpa os campos ao ocorrer erro
      return false;
    }

    if (password !== passwordRepeat) {
      setErrorMessage('As senhas não coincidem.');
      clearFields(); // Limpa os campos ao ocorrer erro
      return false;
    }

    setErrorMessage(''); // Limpa a mensagem de erro se a validação passar
    return true;
  };

  const handleCadastro = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return; // Se a validação falhar, não continue
    }

    const userData = {
      usuario: nome,
      email: email,
      senha: password,
    };

    axios
      .post('http://localhost:8080/usuario/criar', userData)
      .then((response) => {
        console.log('Usuário cadastrado com sucesso:', response.data);
        navigate('/login'); // Redireciona para a página de login após cadastro bem-sucedido
      })
      .catch((error) => {
        setErrorMessage('Erro ao cadastrar usuário. Tente novamente mais tarde.'); // Define a mensagem de erro
        clearFields(); // Limpa os campos ao ocorrer erro
      });
  };

  return (
    <div className="container">
      <div className="left-section">{/* Espaço para uma imagem ou outro conteúdo */}</div>
      <div className="right-section">
        <h1 className="login-title">Cadastro</h1>
        <form className="login-form" onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repetir Senha"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <div className="botoes">
            <button type="submit">Cadastrar</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe mensagem de erro se houver */}
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
