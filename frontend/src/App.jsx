import Homepage from "./pages/Homepage";
import {useTheme} from "./context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewOffer from "./pages/NewOffer";

function App() {

    const {theme, toggleTheme} = useTheme();

    return (
        <div className={`${theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]'}`}>

            <Router>
                <Routes>
                    <Route path='/' element = {<Homepage/>}/>
                    <Route path='/newoffer' element = {<NewOffer/>}/>

                </Routes>
            </Router>
        </div>


    )
    ;
}

// function Header(){
//   return(

//   );
// }


export default App;
