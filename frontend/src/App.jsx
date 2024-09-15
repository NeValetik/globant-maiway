import Homepage from "./pages/Homepage";
import {useTheme} from "./context/ThemeContext";

function App() {

    const {theme, toggleTheme} = useTheme()

  return (
    <div className={`${theme === 'light' ? 'bg-[#f1f1f1]' : 'bg-[#131314]'}`}>
      <Homepage />
    </div>
  );
}

// function Header(){
//   return(
    
//   );
// }


export default App;
