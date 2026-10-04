import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.js';
import api from '../api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token) {
            setUser({ token, username });
        }

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await api.post('/users/login', { username, password });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);

            setUser({
                token: res.data.token,
                username,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message,
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
