import Homepage from "./pages/Homepage";
import {useTheme} from "./context/ThemeContext";

function App() {

    const {theme, toggleTheme} = useTheme()

  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Homepage />
    </div>
  );
}

// function Header(){
//   return(
    
//   );
// }


export default App;
