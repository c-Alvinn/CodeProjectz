import React from 'react';
import './TutorialScreen.css';
import signUpImg from '../assets/images/SignUp-image.png';
import loginImg from '../assets/images/Login-image.png';
import viewScreenImg from '../assets/images/View-image.png';
import addImg from '../assets/images/Add-image.png';
import { useNavigate } from 'react-router-dom';


const TutorialScreen = () => {
  const navigate = useNavigate();
  return (
    <div className='TutorialScreen'>
      <div className='botao'>
      <button type="button" onClick={() => navigate('/')}>Voltar</button>
      </div>
      <div className="TutorialScreen-container">
        <h1>Tutorial da Aplicação</h1>

        <section className="tutorial-section">
          <h2>Cadastro</h2>
          <div className="tutorial-content">
            <div className="tutorial-text-cover">
              <div className="tutorial-text">
                <p>Para se cadastrar, siga os passos abaixo:</p>
                <ol>
                  <li>Na tela de login, clique em "Não tem cadastro? Clique aqui".</li>
                  <li>Preencha todos os campos obrigatórios, incluindo nome, sobrenome, email e senha.</li>
                  <li>O email deve ser do domínio <code>@estudante.iftm.edu.br</code> ou <code>@iftm.edu.br</code>.</li>
                  <li>Clique em "Cadastrar" para completar o processo.</li>
                </ol>
              </div>
            </div>
            <img src={signUpImg} alt="Tela de Cadastro" className="tutorial-image" />
          </div>
        </section>

        <section className="tutorial-section">
          <h2>Login</h2>
          <div className="tutorial-content">
            <div className="tutorial-text-cover">
              <div className="tutorial-text">
                <p>Para fazer login, siga os passos abaixo:</p>
                <ol>
                  <li>Na tela de login, preencha seu email e senha.</li>
                  <li>Clique em "Login" para acessar sua conta.</li>
                </ol>
              </div>
            </div>
            <img src={loginImg} alt="Tela de Login" className="tutorial-image" />
          </div>
        </section>

        <section className="tutorial-section">
          <h2>Visualizar Artigos</h2>
          <div className="tutorial-content">
            <div className="tutorial-text-cover">
              <div className="tutorial-text">
                <p>Para visualizar os artigos disponíveis, siga os passos abaixo:</p>
                <ol>
                  <li>Após fazer login, você será redirecionado para a página principal.</li>
                  <li>Na página principal, você verá uma lista de artigos disponíveis.</li>
                  <li>Clique em qualquer artigo para ver os detalhes, incluindo a descrição e o autor.</li>
                </ol>
              </div>
            </div>
            <img src={viewScreenImg} alt="Tela de Artigos" className="tutorial-image" />
          </div>
        </section>

        <section className="tutorial-section">
          <h2>Adicionar Artigos</h2>
          <div className="tutorial-content">
            <div className="tutorial-text-cover">
              <div className="tutorial-text">
                <p>Para adicionar um novo artigo, siga os passos abaixo:</p>
                <ol>
                  <li>Na página principal, clique em "Adicionar Artigo".</li>
                  <li>Preencha o título, a descrição e selecione a categoria do artigo.</li>
                  <li>Adicione o conteúdo do artigo (Markdown e imagem).</li>
                  <li>Clique em "Salvar" para adicionar o artigo à lista.</li>
                </ol>
              </div>
            </div>
            <img src={addImg} alt="Tela de Adicionar Artigos" className="tutorial-image" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorialScreen;
