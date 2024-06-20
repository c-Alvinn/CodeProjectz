import { useState, useEffect } from 'react';

export const UserEmail = () => {
    const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    return email;
}