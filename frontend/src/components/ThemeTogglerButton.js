import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Ensure this is the correct path

import MoonSVG from '../assets/buttons/MoonSVG';
import SunSVG from '../assets/buttons/SunSVG';

const ThemeToggler = () => {
    const { theme, toggleTheme } = useTheme();

    // Determine the color and button class based on the current theme
    const strokeColor = theme === 'light' ? 'black' : 'white';
    const buttonClass = theme === 'light' ? 'bg-white text-black' : 'bg-[#1b1b1b] text-white';

    return (
        <button
            onClick={toggleTheme}
            className={`mx-3 p-2 rounded flex items-center ${buttonClass}`}
            style={{ color: strokeColor }}
        >
            {/* Render the appropriate SVG component based on the theme */}
            {theme === 'light' ? <MoonSVG color="black" /> : <SunSVG color="white" />}
        </button>
    );
};

export default ThemeToggler;
