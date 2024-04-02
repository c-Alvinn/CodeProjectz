import React from 'react';
import './LoginPage.css'; // Você pode reutilizar muitos dos estilos do login
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate(); // Mova a declaração do useNavigate para dentro do componente SignUpPage

  const handleCadastro = (event) => {
    navigate('/home');
  }

  return (
    <div className="container">
      <div className="left-section">
        {/* Placeholder para a imagem do lado esquerdo */}
      </div>
      <div className="right-section">
        <h1 className="login-title">Cadastro</h1>
        <form className="login-form">
          {/* Campos adicionais podem ser incluídos aqui */}
          <input type="text" placeholder="Usuário" />
          <input type="email" placeholder="E-mail" /> {/* Novo campo */}
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Repetir Senha" />
          <div className='botoes'>
              <button type="submit" onClick={handleCadastro}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
