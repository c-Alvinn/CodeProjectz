import { useState, useEffect } from 'react';

export const TokenJWT = () => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return token;
}