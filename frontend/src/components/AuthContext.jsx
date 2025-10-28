// src/components/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log('AuthContext: Initializing from localStorage');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      console.log('AuthContext: Found token and user in localStorage', { token, storedUser });
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('AuthContext: Error parsing stored user', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      console.log('AuthContext: No token or user found in localStorage');
    }
    setIsLoading(false); // Mark loading complete
  }, []);

  const login = (token, user) => {
    console.log('AuthContext: Logging in user', { user });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    console.log('AuthContext: Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};