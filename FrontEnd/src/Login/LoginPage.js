import React, { useState } from 'react';
import axios from 'axios'; // Importa Axios para fazer requisições HTTP
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        const userData = {
            email, // Email
            password, // Senha
        };

        axios.post('http://localhost:8080/usuario/login', userData) // Substitua pelo seu endpoint de login
            .then((response) => {
                if (response.status === 200) { // Verifica se a resposta foi bem-sucedida
                    setError(''); // Limpa erros anteriores
                    navigate('/home'); // Redireciona para a página "home"
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setError('Usuário ou senha incorretos.'); // Mensagem de erro para login incorreto
                } else {
                    setError('Erro ao fazer login. Tente novamente mais tarde.'); // Erro geral
                }
            });
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navega para a tela de cadastro
    };

    return (
        <div className="container">
            <div className="left-section">{/* Placeholder para a imagem do lado esquerdo */}</div>
            <div className="right-section">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="botoes">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleSignUpClick}>
                            Não tem cadastro? Clique aqui
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro se houver */}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
