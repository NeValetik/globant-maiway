import React from 'react';

// Define the SunSVG component
const SunSVG = ({color}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" stroke={color}>
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
            <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
    </svg>
);

export default SunSVG;
