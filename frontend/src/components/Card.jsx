import React, { useState } from 'react';
import {useTheme} from "../context/ThemeContext";

const Card = ({offer}) =>{

    const {theme, toggleTheme} = useTheme()

    // const [author,setAuthor] = useState(offer.author)
  // console.log(author)
  return(
      <div className={`max-w-sm rounded overflow-hidden ${theme === 'dark' ? 'shadow-black bg-[#1e1f20]' : ''}`}>
      <img className="w-full h-40" src={offer.thumbnail} alt="Sunset in the mountains" />
      <div className={`px-6 py-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>


        <div className="font-bold text-xl mb-2">
          {offer.title}
        </div>
        <p className="text-gray-700 text-base">
          {offer.body}
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
