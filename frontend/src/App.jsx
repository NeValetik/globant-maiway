import Homepage from "./pages/Homepage";
import { useTheme } from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewOffer from "./pages/NewOffer";
import { useEffect } from 'react';

function App() {
    const { theme, toggleTheme } = useTheme();

    // Apply the theme to the html and body elements
    useEffect(() => {
        document.documentElement.className = theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]';
        document.body.className = theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]';
    }, [theme]);

    

    return (
        <div className={`min-h-screen flex flex-col`}>
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/newoffer' element={<NewOffer />} />
                    <Route path='/search' element={<Homepage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;