import React, { useState, useEffect } from 'react';
import './AddScreen.css';
import axios from 'axios';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [markdownFile, setMarkdownFile] = useState(null);
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
            setMarkdownFile(e.target.files[0]);
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

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("conteudo", file);

        const response = await axios.post('http://localhost:6419/conteudo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalCategory = category === "custom" ? customCategory : category;

        let imageId = null;
        let markdownId = null;

        if (image) {
            imageId = await uploadFile(image);
        }

        if (markdownFile) {
            markdownId = await uploadFile(markdownFile);
        }

        const selectedCategory = categories.find(cat => cat.nome === finalCategory);

        const artigoData = {
            titulo: title,
            descricao: description,
            categoriaID: selectedCategory ? selectedCategory.id : null,
            criadorID: 1, // Substitua pelo ID do criador atual
        };

        axios.post('http://localhost:6419/artigo', artigoData)
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

                <label>Insira aqui sua imagem:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <label>Insira aqui seu arquivo Markdown:</label>
                <input
                    type="file"
                    accept=".md"
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
