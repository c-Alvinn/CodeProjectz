import React, { useState, useEffect } from 'react';
import './SearchScreen.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchScreen() {
    const navigate = useNavigate();
    useEffect(() => {

    }, []);

    return (
        <div className="search-screen">
                <h2>Resultado da sua pesquisa</h2>

        </div>
    );
}

export default SearchScreen;
