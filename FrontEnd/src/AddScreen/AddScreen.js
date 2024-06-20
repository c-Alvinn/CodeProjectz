import React, { useState, useEffect } from 'react';
import './AddScreen.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserEmail } from '../Data/UserEmail';
import { TokenJWT } from '../Data/TokenJWT';

function AddScreen() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [markdownFile, setMarkdownFile] = useState(null);
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' }); // Estado para mensagens

    const userEmail = UserEmail();
    const token = TokenJWT();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:6419/categoria', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar categoria:", error);
                setMessage({ text: "Erro ao buscar categoria. Tente novamente mais tarde.", type: 'error' });
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
            axios.post('http://localhost:6419/categoria', { nome: customCategory }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setMessage({ text: "Categoria adicionada com sucesso!", type: 'success' });
                    fetchCategories();
                    setCustomCategory('');
                })
                .catch(error => {
                    console.error("Erro ao adicionar categoria:", error);
                    setMessage({ text: "Erro ao adicionar categoria. Tente novamente mais tarde.", type: 'error' });
                });
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("conteudo", file);

        const response = await axios.post('http://localhost:6419/conteudo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    };

    const handleTutorialClick = () => {
        navigate('/tutorial'); // Navega para a tela de tutorial
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalCategory = category === "custom" ? customCategory : category;

        let imageId = null;
        let markdownId = null;

        try {
            if (image) {
                imageId = await uploadFile(image);
            }

            if (markdownFile) {
                markdownId = await uploadFile(markdownFile);
            }

            const artigoData = {
                titulo: title,
                descricao: description,
                categoriaNome: finalCategory,
                criadorEmail: userEmail,
                imagemID: imageId, // Adiciona a referência da imagem ao artigo
                conteudoID: markdownId // Adiciona a referência do conteúdo Markdown ao artigo
            };

            await axios.post('http://localhost:6419/artigo', artigoData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage({ text: "Artigo adicionado com sucesso!", type: 'success' });
            navigate('/home'); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao adicionar artigo:", error);
            setMessage({ text: "Erro ao adicionar artigo. Tente novamente mais tarde.", type: 'error' });
        }
    };

    return (
        <div className="add-screen">
            <form className="add-form" onSubmit={handleSubmit}>
                <h2>Adicionar Novo Curso/Projeto</h2>

                {message.text && (
                    <p className={`message ${message.type}`}>
                        {message.text}
                    </p>
                )}

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
                <label id='cliqueAqui'>Ainda não tem seu arquivo Markdown? 
                    <a href="https://pandao.github.io/editor.md/en.html" target="_blank">Clique aqui</a></label>
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
                <button type="button" onClick={handleTutorialClick}>
                            Tutorial CodeProjecz
                        </button>
            </form>
        </div>
    );
}

export default AddScreen;
