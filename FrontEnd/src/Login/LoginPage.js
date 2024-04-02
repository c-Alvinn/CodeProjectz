// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Simulando um banco de dados
        const users = {
            admin: "1234567",
            augustio: "AmoA-CC",
            alvin: "CalvoAos16"
        };

        // Verificando se o usuário existe e a senha está correta
        if (users.hasOwnProperty(username) && users[username] === password) {
            setError('');
            // Redireciona para a próxima página após o login bem-sucedido
            navigate('/home');

        } else {
            setError('Usuário ou senha incorretos.');
        }
    };

    function handleSignUpClick() {
        navigate('/signup'); // Navega para a tela de cadastro
      }
    

    return (
        <div className="container">
            <div className="left-section">
                {/* Placeholder para a imagem do lado esquerdo */}
            </div>
            <div className="right-section">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='botoes'>
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleSignUpClick}>Não tem cadastro? Clique aqui</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
