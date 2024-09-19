import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';

const useDominantColor = (imageUrl) => {
    const [dominantColor, setDominantColor] = useState(null);

    useEffect(() => {
        if (!imageUrl) return; // Avoid running if imageUrl is not available

        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Handle cross-origin images
        img.src = imageUrl;

        img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };

        // Cleanup function
        return () => {
            img.onload = null;
        };
    }, [imageUrl]);

    return dominantColor;
};

export default useDominantColor;
