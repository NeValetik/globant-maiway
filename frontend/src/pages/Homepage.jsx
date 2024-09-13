import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import Offers from './components/Offers';

function Homepage() {
    return (
      <div className="Home">
        <Navbar />
        <Search />
        <Offers />
        <Footer />
      </div>
    );
  }

export default Homepage;
