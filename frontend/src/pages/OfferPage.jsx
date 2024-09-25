import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Tags from '../components/Tags';
import themeChangerDescriptionString from '../components/utils/themeChangerDescriptionString';
import { useTheme } from "../context/ThemeContext";
import loading_cat from '../assets/loading_cat.gif';
import { JWTContext } from "../context/JWTContext";




const processImage = (photo) => {
  let imageUrl = '';
  if (Array.isArray(photo)) {
    const imageBlob = new Blob([new Uint8Array(photo)], { type: 'image/jpeg' });
    imageUrl = URL.createObjectURL(imageBlob);
  } else if (typeof photo === 'string') {
    imageUrl = `data:image/jpeg;base64,${photo}`;
  }
  return imageUrl;
};

function OfferPage() {
  const { id } = useParams(); // Get the offer ID from the URL parameters
  const [offer, setOffer] = useState(null);
  const [isEditing,setIsEditing] = useState(false);
  const {theme} = useTheme();
  const {token,userId} = useContext(JWTContext);


  const handleClick = () =>{
    
  };

  const fetchOffer = async (id) => {
    try {  
      // Replace this with actual API call or data fetching logic
      const response = await fetch(`http://localhost:6969/api/offer/${id}`);
      const offer = await response.json();
      const processedOffer = {
        ...offer,
        photo: processImage(offer.photo),
        author: {
        ...offer.author,
        userPfp: processImage(offer.author?.userPfp),
        },
      };
      setOffer(processedOffer);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    // Fetch offer data based on the ID
    fetchOffer(id)
  }, [id]);

  if (!offer) {
    return (
      <div className="justify-items-center justify-center flex my-auto">
        <img src={loading_cat} width={'20%'} height={'auto'} alt="Loading" />
      </div>
    ); // Show a loading state until the offer is fetched
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      {isEditing?
      <div className="flex-col relative mt-5">
        {/* Center the image */}
        <img className="mx-auto w-[653px] h-80 rounded-lg" src={offer.photo} alt="Offer Image"/>
        
        {/* Align the text to the left of the image */}
        <div className={themeChangerDescriptionString(theme, 'text-black', 'text-white', `flex flex-col mx-auto w-[653px]`)}>
          <div className="py-4 text-[25px]">
            {offer.title}
          </div>
          <div className="pb-4">
            {offer.body}
          </div>
          <Tags classNamePos="flex" tags={{"region": offer.region, "location": offer.location}} />
        </div>
        {userId === offer.author.userId?
          <button className='flex flex-col mx-auto px-4 py-2 text-white my-2 rounded-lg bg-mwlightgreen' onClick={handleClick}>Edit</button>:
          null
        }
      </div>:
      null

      }
      <Footer />
    </div>
  );
}

export default OfferPage;
