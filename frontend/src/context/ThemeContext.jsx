// src/context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import {get} from "axios";

// Create the context
const ThemeContext = createContext();

// Custom hook to use the ThemeContext easily
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to manage and provide the theme state
export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme());

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Provide theme state and toggle function to all children
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
