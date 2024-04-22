import React, { useState } from 'react';
import './AddScreen.css';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');  // Se referindo ao conteúdo visual associado
    const [link, setLink] = useState('');  // URL de um vídeo ou recurso relacionado
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [postDate, setPostDate] = useState('');  // Data de postagem pode ser definida no frontend ou backend

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === "custom" ? customCategory : category;
        // Aqui você incluiria a lógica para enviar esses dados ao backend
        console.log({ title, description, image, link, category: finalCategory, postDate });
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
                    <option value="Programação">Programação</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Organização">Organização</option>
                    <option value="custom">Outra (especifique)</option>
                </select>
                
                {category === "custom" && (
                    <input
                        type="text"
                        placeholder="Escreva sua categoria"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                    />
                )}

                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}

export default AddScreen;
