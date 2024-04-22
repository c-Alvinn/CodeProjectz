import React, { useState, useEffect } from 'react';
import './AddScreen.css';
import axios from 'axios';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');  
    const [link, setLink] = useState('');  
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [postDate, setPostDate] = useState('');
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:8080/api/categorias')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    const handleAddCategory = () => {
        if (customCategory.trim() !== '') {
            axios.post('http://localhost:8080/api/categorias', { nome: customCategory })
                .then(response => {
                    console.log('Categoria adicionada com sucesso:', response.data);
                    fetchCategories();  // Atualiza a lista de categorias após adicionar uma nova
                    setCustomCategory(''); // Limpa o campo de categoria personalizada
                })
                .catch(error => {
                    console.error('Erro ao adicionar categoria:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === "custom" ? customCategory : category;
        const formData = {
            titulo: title,
            descricao: description,
            link : link,
            categoria: finalCategory,
            dataPostagem: postDate,
        };
        console.log(formData);
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
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link da Imagem"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link do Conteúdo (ex: URL do Vídeo)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <input
                    type="date"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
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
