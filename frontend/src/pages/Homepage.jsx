import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Offers from '../components/Offers';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Homepage() {
  const query = useQuery().get('query');
    return (
      <div className="Home flex flex-col min-h-screen">
        <main className="flex-1">
        <Navbar />
        <Search />
        <Offers query={query}/>
        </main>
        <Footer />
      </div>
    );
  }

export default Homepage;
