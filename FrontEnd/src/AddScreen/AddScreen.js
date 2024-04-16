import React, { useState } from 'react';
import './AddScreen.css';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalCategory = category === "custom" ? customCategory : category;
        console.log({ title, image, link, category: finalCategory });
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
                <input
                    type="text"
                    placeholder="Link da Imagem"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link do Curso/Projeto"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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
