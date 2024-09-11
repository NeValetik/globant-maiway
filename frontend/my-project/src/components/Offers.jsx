import React, { useState } from 'react';
import Card from  "./Card"

const Offers = () => {
  const [offers, setOffers] = useState([
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },

    {
      username: 'Anton',
      location: 'Warshaw',
      description: 'Ne ducem dupa piva',
      image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv',
    },
  ])//here we need to load from database offers I'll be putting some constant data

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
        <div key={groupIndex} className="flex flex-row gap-10">
          {group.map((offer, index) => (
            <Card key={index} offer={offer} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Offers;