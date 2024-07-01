---

<div align="center">
    <img src="./FrontEnd/src/assets/images/LogoHeader.jpg" alt="Logo do CodeProjectZ">
</div>

# CodeProjectz

## Índice

1. [Sobre](#sobre)
2. [Instalação](#instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Backend](#backend)
    - [Frontend](#frontend)
3. [Tecnologias](#tecnologias)
4. [Autores](#autores)

## Sobre

O **CodeProjectz** é uma plataforma inovadora para criação e gerenciamento de artigos e projetos. Ideal para desenvolvedores, entusiastas de tecnologia e educadores, o CodeProjectz permite que os usuários publiquem, organizem e acessem conteúdos educacionais sobre diversas áreas, como desenvolvimento web, programação, jogos e outras áreas de interesse, onde qualquer aluno e professor pode compartilhar artigos e visualizar artigos da comunidade. A plataforma é construída com um backend robusto em Java Spring Boot e um frontend moderno em React, proporcionando uma experiência de usuário fluida e responsiva.

## Instalação

### Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Java 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html): Necessário para rodar o backend.
- [Node.js](https://nodejs.org/): Utilizado para o desenvolvimento e execução do frontend.
- [MySQL](https://www.mysql.com/): Banco de dados relacional usado pelo backend.

### Backend

1. Clone o repositório:
    ```sh
    git clone https://github.com/yourusername/CodeProjectz.git
    cd CodeProjectz/backend
    ```

2. Configure o banco de dados no arquivo `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/nome_do_banco
    spring.datasource.username=seu_usuario
    spring.datasource.password=sua_senha
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Execute a aplicação:
    ```sh
    ./mvnw spring-boot:run
    ```

### Frontend

1. Navegue para o diretório do frontend:
    ```sh
    cd ../frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie a aplicação:
    ```sh
    npm start
    ```

## Tecnologias

- **Backend**:
    - **Java**: Linguagem de programação utilizada.
    - **Spring Boot**: Framework para construção de aplicações Java.
    - **Spring Data JPA**: Biblioteca para simplificar a implementação de repositórios baseados em JPA.
    - **MySQL**: Sistema de gerenciamento de banco de dados relacional.

- **Frontend**:
    - **React**: Biblioteca JavaScript para construção de interfaces de usuário.
    - **Axios**: Biblioteca para fazer requisições HTTP.


## Autores

| [<img src="https://avatars.githubusercontent.com/u/75548446" width=115><br><sub>Augusto-Castejon</sub>](https://github.com/Augusto-Castejon) | [<img src="https://avatars.githubusercontent.com/u/141906500?v=4" width=115><br><sub>c-Alvinn</sub>](https://github.com/c-Alvinn) | [<img src="https://avatars.githubusercontent.com/u/103593279?v=4" width=115><br><sub>DevGustavus</sub>](https://github.com/DevGustavus) | [<img src="https://avatars.githubusercontent.com/u/97409681?v=4" width=115><br><sub>NahNathan</sub>](https://github.com/NahNathan) |
| :---: | :---: | :---: | :---: |

---
