import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Offers from '../components/Offers';
import { useLocation } from 'react-router-dom';
import Filters from '../components/Filters';
import { useState } from 'react';


function useQuery() {
  console.log(useLocation().pathname)
  return new URLSearchParams(useLocation().search);
}


function Homepage() {

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };
  

  const query = useQuery().get('query');
  return (
    <div className="Home flex flex-col min-h-screen relative">
      <Navbar />
      <Search toggleFilters={toggleFilters} />
      <div className="flex flex-1">
        {/* Main content */}
        <div className="flex-1">
          <Offers query={query}/>
        </div>
        {showFilters ? 
          <div className="w-1/4">
            <Filters />
          </div>
        : null}
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
