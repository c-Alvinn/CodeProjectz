import React, { useState, useEffect } from 'react';
import './AddScreen.css';
import axios from 'axios';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);  // Armazena o arquivo da imagem
    const [markdownFile, setMarkdownFile] = useState(null);  // Armazena o arquivo Markdown
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:6419/categoria')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleMarkdownChange = (e) => {
        if (e.target.files.length > 0) {
            setMarkdownFile(e.target.files[0]); // Pega o arquivo Markdown
        }
    };

    const handleAddCategory = () => {
        if (customCategory.trim() !== '') {
            axios.post('http://localhost:6419/categoria', { nome: customCategory })
                .then(response => {
                    fetchCategories();
                    setCustomCategory(''); 
                })
                .catch(error => {
                    console.error('Erro ao adicionar categoria:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === "custom" ? customCategory : category;

        const formData = new FormData();
        formData.append("titulo", title);
        formData.append("descricao", description);
        formData.append("imagem", image); 
        formData.append("markdown", markdownFile); // Adiciona o arquivo Markdown
        formData.append("categoria", finalCategory);

        axios.post('http://localhost:6419/artigos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
                    className="add-descricao"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Campo para upload de imagem com legenda */}
                <label>Insira aqui sua imagem:</label>
                <input
                    type="file"
                    accept="image/*"  
                    onChange={handleImageChange}
                />

                {/* Campo para upload de arquivo Markdown com legenda */}
                <label>Insira aqui seu arquivo Markdown:</label>
                <input
                    type="file"
                    accept=".md"  // Apenas arquivos Markdown
                    onChange={handleMarkdownChange}
                />

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
