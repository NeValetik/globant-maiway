import Homepage from "./pages/Homepage";
import {useTheme} from "./context/ThemeContext";

function App() {

    const {theme, toggleTheme} = useTheme()

  return (
    <div className={`${theme === 'light' ? 'bg-white' : 'bg-[#131314]'}`}>
      <Homepage />
    </div>
  );
}

// function Header(){
//   return(
    
//   );
// }


export default App;
