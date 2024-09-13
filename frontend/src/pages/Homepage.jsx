import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Offers from '../components/Offers';

function Homepage() {
    return (
      <div className="Home flex flex-col min-h-screen">
        <main className="flex-1">
        <Navbar />
        <Search />
        <Offers />
        </main>
        <Footer />
      </div>
    );
  }

export default Homepage;
