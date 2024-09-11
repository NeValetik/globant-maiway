import React, { useState,useEffect } from 'react';
import Card from  "./Card"

const Offers = () => {
  const [offers, setOffers] = useState([])//here we need to load from database offers I'll be putting some constant data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOffers(data);
      });
  }, []);
//   const handleOffer = async e => {
//     setOffer({"username":"Anton", "location":"Warshaw", "description":"Ne ducem dupa piva"})//here we need to load from database offers I'll be putting some constant data
//   };

  const groupedOffers = offers.reduce((acc, offer, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = []; // Initialize group if not present
    acc[groupIndex].push(offer);
    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-4 mx-auto justify-center items-center">
      {/* Render each group of offers in a new row */}
      {groupedOffers.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-row gap-4">
          {group.map((offer, index) => (
            <Card key={index} offer={offer} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Offers;