import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"
// Create the context
export const JWTContext = createContext();

// Create the provider component
export const JWTProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Initialize the token from localStorage when the app loads
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        setToken(savedToken);
        setUserId(jwtDecode(savedToken).userId);
    }
  }, []);

  // Function to set the token (and store it in localStorage)
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Function to clear the token (remove from both state and localStorage)
  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('token');
    console.log("token cleared " + !!token);
    window.location.reload();
  };

  // Check if a token exists (useful for authentication checks)
  const isAuthenticated = !!token;

  // Context value to provide
  const contextValue = {
    token,
    userId,
    saveToken,
    clearToken,
    isAuthenticated,
  };

  return (
    <JWTContext.Provider value={contextValue}>
      {children}
    </JWTContext.Provider>
  );
};