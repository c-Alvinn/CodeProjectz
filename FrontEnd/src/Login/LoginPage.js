import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios para fazer requisições HTTP
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); // Corrigindo para 'senha'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        localStorage.clear();
        const signupSuccess = localStorage.getItem('signupSuccess');
        if (signupSuccess) {
            setSuccessMessage('Usuário cadastrado com sucesso!');
            localStorage.removeItem('signupSuccess');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();

        const userData = {
            email, // Enviando 'email'
            senha, // Enviando 'senha' em vez de 'password'
        };

        axios.post('http://192.168.7.21:6419/login', userData) // Certifique-se de que o endpoint está correto
            .then((response) => {
                if (response.status === 200) { // Se a resposta for bem-sucedida
                    
                    const token = response.data.token;
                    localStorage.setItem('jwtToken', token);

                    const email = response.data.email;
                    localStorage.setItem('userEmail', email);
                    
                    setError(''); // Limpa o erro anterior
                    navigate('/home'); // Redireciona para a página home
                }
            })
            .catch((error) => {
                // Se a resposta for 400, limpe a senha e exiba uma mensagem de erro
                if (error.response && error.response.status === 403) {
                    setError('Usuário ou senha incorretos.'); // Mensagem de erro para login incorreto
                    setSenha(''); // Limpar a senha ao detectar erro
                } else {
                    setError('Erro ao fazer login. Tente novamente mais tarde.'); // Erro geral
                }
            });
    };

    const handleSignUpClick = () => {
        navigate('/signup'); // Navega para a tela de cadastro
    };

    const handleTutorialClick = () => {
        navigate('/tutorial'); // Navega para a tela de tutorial
    };

    return (
        <div className="container">
            <div className="left-section">{/* Placeholder para a imagem do lado esquerdo */}</div>
            <div className="right-section">
                <h1 className="login-title">Login</h1>
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Exibe mensagem de sucesso se houver */}
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
                        value={senha} // Alterado para 'senha'
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <div className="botoes">
                        <button type="submit">Login</button>
                        <button type="button" onClick={handleSignUpClick}>
                            Não tem cadastro? Clique aqui
                        </button>
                        <button type="button" onClick={handleTutorialClick}>
                            Tutorial CodeProjecz
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro se houver */}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;