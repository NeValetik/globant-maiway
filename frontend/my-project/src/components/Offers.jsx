import React, { useState } from 'react';
import Card from  "./Card"

const Offers = () => {
  const [offer, setOffer] = useState({"username":"Anton", "location":"Warshaw", "description":"Ne ducem dupa piva", "image":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQgSvVwAdK_66hOT_ut0rKqjeYbqeD7qfjN31wUqpfiNKTAqhFv"});//here we need to load from database offers I'll be putting some constant data

//   const handleOffer = async e => {
//     setOffer({"username":"Anton", "location":"Warshaw", "description":"Ne ducem dupa piva"})//here we need to load from database offers I'll be putting some constant data
//   };

  return (

<div className="flex flex-row gap-10 mx-auto justify-center items-center">
  <Card offer={offer}/>
  <Card offer={offer}/>
  <Card offer={offer}/>
</div>
)
};

export default Offers;