import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Offers from '../components/Offers';
import { useLocation } from 'react-router-dom';
import Filters from '../components/Filters';
import { useState } from 'react';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function Homepage() {

  const queryCall = useQuery();
  const query = queryCall !== ""?  null : queryCall;
  console.log("this is query" + " '"+query + "'")
  return (
    <div className="Home flex flex-col min-h-screen relative">
      <Navbar />
      <Search/>
      <Offers query={query}/>
      <Footer />
    </div>
  );
}

export default Homepage;
