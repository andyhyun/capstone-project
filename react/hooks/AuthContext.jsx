import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.id) {
                setUser({
                    username,
                    id: data.id,
                    is_hr: data.is_hr
                });
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);