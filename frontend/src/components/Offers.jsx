import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';
import loading_cat from '../assets/loading_cat.gif';
import sad_robot from '../assets/sad_robot.png';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import {useTheme} from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";

const Offers = ({ query }) => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const {theme, toggleTheme} = useTheme();
  const fetchInProgress = useRef(false);

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

  const fetchOffers = useCallback(async (currentPage, currentQuery) => {
    if (fetchInProgress.current) return;
    fetchInProgress.current = true;
    setLoading(true);
    
    try {
      const response = await fetch(currentQuery === null 
        ? `http://localhost:6969/api/offer/page/${currentPage}` 
        : `http://localhost:6969/api/offer/search?query=${currentQuery}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        const processedOffers = data.map((offer) => ({
          ...offer,
          photo: processImage(offer.photo),
          author: {
            ...offer.author,
            userPfp: processImage(offer.author?.userPfp),
          },
        }));

        setOffers((prevOffers) => 
          currentPage === 1 ? processedOffers : [...prevOffers, ...processedOffers]
        );
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, []);

  useEffect(() => {
    setOffers([]);
    setPage(1);
    setHasMore(true);
    fetchOffers(1, query);
  }, [query, fetchOffers]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && !fetchInProgress.current) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchOffers(nextPage, query);
        return nextPage;
      });
    }
  }, [hasMore, loading, query, fetchOffers]);

  return (
    <>
      {loading && offers.length === 0 ? (
        <div className="flex justify-center items-center">
          <img src={loading_cat} width={'20%'} height={'auto'} alt="Loading" />
        </div>
      ) : offers.length === 0 ? (
        <div className="flex justify-center items-center">
          <img className={'w-[250px]'} src={sad_robot} alt={"sad robot picture"} />
          <p className={themeChangerDescriptionString(theme, '', 'text-white','text-3xl font-mono')}> Sorry, I couldn't find any results.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="flex flex-col gap-3 w-full max-w-screen-xl px-[32px]">
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))' }}
              >
                {offers.map((offer, index) => (
                  <Card key={`${offer.id}-${index}`} offer={offer} />
                ))}
              </div>
            </div>
          </div>
          {hasMore && !loading && (
            <button onClick={handleLoadMore} className={themeChangerDescriptionString(theme, 'hover:bg-mwdarkgreen bg-mwlightgreen',
              'bg-mwdarkgreen hover:bg-mwlightgreen text-white',
              'text-white font-semibold rounded-lg text-sm px-4 py-2 mx-auto mt-3 flex')}>
              Load More
              <MdKeyboardDoubleArrowDown size={24} />
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Offers;