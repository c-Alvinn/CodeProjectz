import React, { useState, useEffect } from 'react';
import './AddScreen.css';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  // Armazena o arquivo
    const [markdownContent, setMarkdownContent] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:8080/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);  // Pega o primeiro arquivo
        }
    };

    const handleAddCategory = () => {
        if (customCategory.trim() !== '') {
            axios.post('http://localhost:8080/categoria', { nome: customCategory })
                .then(response => {
                    console.log('Categoria adicionada com sucesso:', response.data);
                    fetchCategories();  // Atualiza a lista de categorias após adicionar uma nova
                    setCustomCategory('');  // Limpa o campo de categoria personalizada
                })
                .catch(error => {
                    console.error('Erro ao adicionar categoria:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === "custom" ? customCategory : category;

        // Usa FormData para enviar dados do formulário com arquivos
        const formData = new FormData();
        formData.append("titulo", title);
        formData.append("descricao", description);
        formData.append("imagem", image);  // Adiciona a imagem ao FormData
        formData.append("conteudoMarkdown", markdownContent);
        formData.append("categoria", finalCategory);

        axios.post('http://localhost:8080/artigos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Importante para upload de arquivos
            },
        })
        .then(response => {
            console.log("Artigo adicionado com sucesso:", response.data);
        })
        .catch(error => {
            console.error("Erro ao adicionar artigo:", error);
        });
    };

    return (
        <div className="add-screen">
            <form className="add-form" onSubmit={handleSubmit}>
                <h2>Adicionar Novo Curso/Projeto</h2>
                
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className='add-descricao'
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                
                {/* Campo para upload de arquivo */}
                <input
                    type="file"
                    accept="image/*"  // Apenas imagens
                    onChange={handleImageChange}
                />
                
                <MdEditor
                    value={markdownContent}
                    style={{ height: "400px"}}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => setMarkdownContent(text)}
                /> <br></br>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Selecione a Categoria</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                    ))}
                    <option value="custom">Outra (especifique)</option>
                </select>
                
                {category === "custom" && (
                    <div>
                        <input
                            type="text"
                            placeholder="Escreva sua categoria"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                        />
                        <button type="button" onClick={handleAddCategory}>Adicionar Categoria</button>
                    </div>
                )}

                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}

export default AddScreen;
