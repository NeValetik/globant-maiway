import Homepage from "./pages/Homepage";
import { useTheme } from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewOffer from "./pages/NewOffer";
import { useEffect } from 'react';
import UserPage from "./pages/UserPage";


function App() {
    const { theme, toggleTheme } = useTheme();

    // Apply the theme to the html and body elements
    useEffect(() => {
        document.documentElement.className = theme === 'light' ? 'bg-[#f2f3f7]' : 'bg-[#131314]';
        document.body.className = theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]';
    }, [theme]);

    

    return (
        <div className={`min-h-screen flex flex-col`}>
<<<<<<< HEAD
                <Router>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/newoffer' element={<NewOffer />} />
                        <Route path='/search' element={<Homepage />} />
                        {/* <Route path='/filter' element={<Homepage />} /> */}
                    </Routes>
                </Router>
=======
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/newoffer' element={<NewOffer />} />
                    <Route path='/search' element={<Homepage />} />
                    <Route path='/user/:username' element={<UserPage />} />
                </Routes>
            </Router>
>>>>>>> 0c34cdbb93a718db50e8713f271fef62c48629aa
        </div>
    );
}

export default App;