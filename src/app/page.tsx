'use client';

import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Offers from '../components/Offers';
import { useSearchParams } from 'next/navigation';

function Homepage() {
  const searchParams = useSearchParams();
  const query = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );

  return (
    <div className="Home flex flex-col min-h-screen relative">
      <Navbar />
      <Search />
      <Offers query={Object.keys(query).length === 0 ? null : query} />
      <Footer />
    </div>
  );
}

export default Homepage;