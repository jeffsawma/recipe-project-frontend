// authContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To wait for token check

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setUser({ token });
        setLoading(false); // Finished checking token
    }, []);

    const login = async (username, password) => {
        try {
            const res = await api.post('/users/login', { username, password });
            localStorage.setItem('token', res.data.token);
            setUser({ token: res.data.token });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// End of authContext.jsx
