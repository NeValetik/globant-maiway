import React, { useState, useEffect } from 'react';
import Card from './Card';
import loading_cat from '../assets/loading_cat.gif';
import sad_robot from '../assets/sad_robot.png';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Offers = ({ query }) => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Track if there are more offers to load

  // Helper function to process images
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

  // Fetch offers
  const fetchOffers = async (page, query) => {
    setLoading(true);
    try {
      const response = await fetch(query === null ? `http://localhost:6969/api/offer/page/${page}` : `http://localhost:6969/api/offer/search?query=${query}`);
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false); // Stop fetching if no more offers
      } else {
        const processedOffers = data.map((offer) => ({
          ...offer,
          photo: processImage(offer.photo),
          author: {
            ...offer.author,
            userPfp: processImage(offer.author?.userPfp),
          },
        }));

        // Append new offers to the existing ones
        setOffers((prevOffers) => [...prevOffers, ...processedOffers]);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset the offers and page when query changes
    setOffers([]);
    setPage(1);
    setHasMore(true);
    fetchOffers(1, query);
  }, [query]);

  useEffect(() => {
    // Fetch offers when page changes (except on the initial load)
    if (page > 1) {
      fetchOffers(page, query);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page to load more offers
    }
  };

  return (
    <>
      {loading && offers.length === 0 ? (
        <div className="flex justify-center items-center">
          <img src={loading_cat} width={'20%'} height={'auto'} alt="Loading" />
        </div>
      ) : offers.length === 0 ? (
        <div className="flex justify-center items-center">
          <img className={'w-[250px]'} src={sad_robot} alt={"sad robot picture"} />
          <p className={'text-3xl font-mono'}> Sorry, I couldn't find any results.</p>
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
                  <Card key={index} offer={offer} />
                ))}
              </div>
            </div>
          </div>
          {hasMore && (
            <button onClick={handleLoadMore} className='font-medium pt-4 flex justify-center'>
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
