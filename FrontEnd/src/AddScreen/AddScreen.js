import React, { useState } from 'react';
import './AddScreen.css';

function AddScreen() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você poderia adicionar a lógica para enviar os dados para o servidor
        console.log({ title, image, link });
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
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}

export default AddScreen;
