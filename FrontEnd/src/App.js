// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Nav/Header'; // Importa o componente de cabeçalho
import Sidebar from './Nav/Sidebar'; 
import LoginPage from './Login/LoginPage';
import SignUpPage from './Login/SignUpPage';
import HomePage from './Home/HomePage'; // Importa a página inicial
import AddScreen from './AddScreen/AddScreen';
import ViewScreen from './ViewScreen/ViewScreen'


function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Renderiza o cabeçalho em todas as páginas */}
        <Sidebar /> {/* Renderiza a barra lateral */}
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Rota para a página inicial */}
          <Route path="/signup" element={<SignUpPage />} /> {/* Rota para a página de cadastro */}
          <Route path="/home" element={<HomePage />} /> {/* Rota para a página de login */}
          <Route path="/add" element={<AddScreen />} /> {/* Rota para a página de novo curso/projeto */}
          <Route path="/view/:artigoID" element={<ViewScreen />} /> {/* Rota para a página de novo curso/projeto */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
