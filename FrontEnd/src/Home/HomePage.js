// HomePage.js
import React from 'react';
import './HomePage.css'; // Este arquivo deve conter os estilos da HomePage
import Card from '../Card/Card';

const cursos = [
    {
      "title": "Fundamentos do Design Responsivo",
      "image": "https://www.designimador.com.br/wp-content/uploads/2017/03/publico-alvo.png",
      "link": "/cursos/design-responsivo"
    },
    {
      "title": "Introdução ao JavaScript Moderno",
      "image": "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto",
      "link": "/cursos/javascript-moderno"
    },
    {
      "title": "Criando de APIs com Node.js",
      "image": "https://blog.geekhunter.com.br/wp-content/uploads/2021/02/1_mp91A9RzagntGGjBnwu4Yw.png",
      "link": "/cursos/nodejs-api"
    },
    {
      "title": "BD Não-Relacionais: MongoDB",
      "image": "https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png",
      "link": "/cursos/mongodb"
    },
    {
      "title": "Engenharia de Dados com Python",
      "image": "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/05/6-careers-you-can-get-with-python.jpg",
      "link": "/cursos/data-engineering"
    },
    {
      "title": "Introdução à Inteligência Artificial",
      "image": "https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=960",
      "link": "/cursos/inteligencia-artificial"
    },
    {
      "title": "Desenvolvimento Web Full Stack",
      "image": "https://www.cache2net3.com//Repositorio/251/Publicacoes/23126/0332fa88-5.png",
      "link": "/cursos/full-stack-web"
    }
  ]
  ;

const projetos = [
    {
      "title": "Visualizador de Dados Climáticos",
      "image": "https://www.researchgate.net/publication/283212708/figure/fig1/AS:391480523935746@1470347638556/Figura-1-Dados-climaticos-precipitacao-e-temperatura-media-referentes-a-regiao-de.png",
      "link": "/projetos/visualizador-dados-climaticos"
    },
    {
      "title": "Simulação de Sistemas Físicos",
      "image": "https://www.clarkson.edu/sites/default/files/2023-06/Physics-Hero-1600x900.jpg",
      "link": "/projetos/simulacao-sistemas-fisicos"
    },
    {
      "title": "Jogo Educativo de História",
      "image": "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/historia-ciencia-que-estuda-os-acontecimentos-passados-acao-homem-no-tempo-5c23497443dd8.jpg",
      "link": "/projetos/jogo-educativo-historia"
    },
    {
      "title": "Plataforma de E-learning Colaborativa",
      "image": "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/05/6-careers-you-can-get-with-python.jpg",
      "link": "/projetos/elearning-colaborativo"
    },
    {
      "title": "Análise de Sentimento em Redes Sociais",
      "image": "https://www.unisuam.edu.br/wp-content/uploads/2023/06/18th-International-Forum-for-Back-and-Neck-Pain-Research-in-Primary-Care-2-1.png",
      "link": "/projetos/analise-sentimento"
    },
    {
      "title": "Chatbot para Suporte IT",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAbHWSZzUL_ffuBjUbkKEbdZdmaeqsHcR9SeaIGx8fA&s",
      "link": "/projetos/chatbot-suporte-it"
    },
    {
      "title": "Sistema de Gerenciamento de Biblioteca",
      "image": "https://matriculas.estacio.br/blog/wp-content/uploads/2020/05/29est-biblioteca.jpg",
      "link": "/projetos/gerenciamento-biblioteca"
    }
  ];

function HomePage() {
  return (
    <div className="home-page">
        <br></br><br></br><br></br><br></br><br></br>
      <h2>Últimos Cursos</h2>
      <div className="scroll-container">
        
        {cursos.map((curso, index) => (
          <Card key={index} title={curso.title} image={curso.image} link={curso.link} />
        ))}
       
      </div>

      <h2>Últimos Projetos</h2>
      <div className="scroll-container">
        {projetos.map((projeto, index) => (
          <Card key={index} title={projeto.title} image={projeto.image} link={projeto.link} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
