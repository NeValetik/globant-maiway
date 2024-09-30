// src/context/ThemeContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';

// Create the context
const ThemeContext = createContext(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// ThemeProvider component to manage and provide the theme state
export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }

            if (window.matchMedia) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return prefersDark ? 'dark' : 'light';
            }
        }
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === 'light' ? 'dark' : 'light';
        });
    };

    // Effect to update localStorage when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Provide theme state and toggle function to all children
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};