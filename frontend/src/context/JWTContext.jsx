import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; // Ensure correct import of jwtDecode

// Create the context
export const JWTContext = createContext();

// Create the provider component
export const JWTProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authUserPhoto, setAuthUserPhoto] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const decodedToken = jwtDecode(savedToken);
      setUserId(decodedToken.userId);
      fetchUserPhoto(decodedToken.userId); // Fetch user photo
    }
  }, []);

  const fetchUserPhoto = async (userId) => {
    try {
      console.log('Trying to fetch user photo')
      const response = await fetch(`http://localhost:6969/api/user/${userId}/photo`, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (response.ok) {
        const photoBlob = await response.blob(); // Get the photo as Blob
        const photoURL = URL.createObjectURL(photoBlob); // Create a URL for the photo
        setAuthUserPhoto(photoURL); // Set the Blob URL to state
      } else {
        console.error('Failed to fetch photo' + await response.text());
      }
    } catch (error) {
      console.error('Error fetching user photo:', error);
    }
  };

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Function to clear the token (remove from both state and localStorage)
  const clearToken = () => {
    setToken(null);
    setAuthUserPhoto(null); // Clear the photo when token is cleared
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
    authUserPhoto,
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
