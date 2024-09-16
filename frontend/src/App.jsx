import Homepage from "./pages/Homepage";
import { useTheme } from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewOffer from "./pages/NewOffer";

function App() {
    const { theme, toggleTheme } = useTheme();

    // Apply the theme to the html and body elements
    document.documentElement.className = theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]';
    document.body.className = theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]';

    return (
        <div className={`min-h-screen flex flex-col`}>
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/newoffer' element={<NewOffer />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;