// HomePage.js
import React from 'react';
import './HomePage.css'; // Este arquivo deve conter os estilos da HomePage
import Card from '../Card/Card';

//Estes são json temporários que só estão simulando os dados vindo do banco
const cursos = [
  {
    title: "Fundamentos do Design Responsivo",
    category: "UI/UX",
    image: "https://www.designimador.com.br/wp-content/uploads/2017/03/publico-alvo.png",
    link: "/View"
  },
  {
    title: "Introdução ao JavaScript Moderno",
    category: "Desenvolvimento Web",
    image: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto",
    link: "/View"
  },
  {
    title: "Criando de APIs com Node.js",
    category: "Backend Web",
    image: "https://blog.geekhunter.com.br/wp-content/uploads/2021/02/1_mp91A9RzagntGGjBnwu4Yw.png",
    link: "/View"
  },
  {
    title: "BD Não-Relacionais: MongoDB",
    category: "Banco de Dados",
    image: "https://webimages.mongodb.com/_com_assets/cms/kuzt9r42or1fxvlq2-Meta_Generic.png",
    link: "/View"
  },
  {
    title: "Engenharia de Dados com Python",
    category: "Dados",
    image: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/05/6-careers-you-can-get-with-python.jpg",
    link: "/View"
  },
  {
    title: "Introdução à Inteligência Artificial",
    category: "IA",
    image: "https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=960",
    link: "/View"
  },
  {
    title: "Desenvolvimento Web Full Stack",
    category: "Desenvolvimento Web",
    image: "https://www.cache2net3.com//Repositorio/251/Publicacoes/23126/0332fa88-5.png",
    link: "/View"
  }
]
  ;

const projetos = [
  {
    title: "Visualizador de Dados Climáticos",
    category: "Física",
    image: "https://www.researchgate.net/publication/283212708/figure/fig1/AS:391480523935746@1470347638556/Figura-1-Dados-climaticos-precipitacao-e-temperatura-media-referentes-a-regiao-de.png",
    link: "/View"
  },
  {
    title: "Simulação de Sistemas Físicos",
    category: "Física",
    image: "https://www.clarkson.edu/sites/default/files/2023-06/Physics-Hero-1600x900.jpg",
    link: "/View"
  },
  {
    title: "Jogo Educativo de História",
    category: "História",
    image: "https://s1.static.brasilescola.uol.com.br/be/conteudo/images/historia-ciencia-que-estuda-os-acontecimentos-passados-acao-homem-no-tempo-5c23497443dd8.jpg",
    link: "/View"
  },
  {
    title: "Plataforma de E-learning Colaborativa",
    category: "Aprendizado",
    image: "https://onlinedegrees.sandiego.edu/wp-content/uploads/2023/05/6-careers-you-can-get-with-python.jpg",
    link: "/View"
  },
  {
    title: "Análise de Sentimento em Redes Sociais",
    category: "Social",
    image: "https://www.unisuam.edu.br/wp-content/uploads/2023/06/18th-International-Forum-for-Back-and-Neck-Pain-Research-in-Primary-Care-2-1.png",
    link: "/View"
  },
  {
    title: "Chatbot para Suporte IT",
    category: "IA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlAbHWSZzUL_ffuBjUbkKEbdZdmaeqsHcR9SeaIGx8fA&s",
    link: "/View"
  },
  {
    title: "Sistema de Gerenciamento de Biblioteca",
    category: "Aprendizado",
    image: "https://matriculas.estacio.br/blog/wp-content/uploads/2020/05/29est-biblioteca.jpg",
    link: "/View"
  }
];

function HomePage() {
  return (
    <div className="home-page">
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h2>Últimos Cursos</h2>
      <div className="scroll-container">
        {cursos.map((curso, index) => (
          <a key={index} href={curso.link}>
            <Card title={curso.title} description={curso.description} category={curso.category} image={curso.image} link={curso.link} />
          </a>
        ))}
      </div>
  
      <h2>Últimos Projetos</h2>
      <div className="scroll-container">
        {projetos.map((projeto, index) => (
          <a key={index} href={projeto.link}>
            <Card title={projeto.title} description={projeto.description} category={projeto.category} image={projeto.image} link={projeto.link} />
          </a>
        ))}
      </div>
    </div>
  );

}

export default HomePage;
