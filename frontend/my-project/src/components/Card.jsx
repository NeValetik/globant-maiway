import React, { useState } from 'react';

const Card = ({offer}) =>{
  // const [author,setAuthor] = useState(offer.author)
  // console.log(author)
  return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-40" src={offer.image} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {offer.title}
        </div>
        <p className="text-gray-700 text-base">
          {offer.body}
          {offer.author.userId}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div>
    </div>
)
}

export default Card;
