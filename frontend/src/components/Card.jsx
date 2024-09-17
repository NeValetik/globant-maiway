import React from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link } from 'react-router-dom';

const Card = ({ offer }) => {
    const { theme } = useTheme();

    return (
        <Link to={`/offers/${offer.id}`} className="block">
            <div
                className={themeChangerDescriptionString(
                    theme,
                    'bg-gray-100 hover:shadow shadow-amber-50',
                    'bg-[#1e1f20] hover:shadow hover:shadow-gray-500',
                    'max-w-sm rounded overflow-hidden min-h-[522px] max-h-[522px] flex flex-col'
                )}
            >
                <div className="w-full flex py-3">
                    <div className='px-6'>
                        <img
                            className="rounded-full h-8"
                            src="https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"
                            alt="Profile"
                        />
                    </div>

                    <div
                        className={themeChangerDescriptionString(
                            theme,
                            'text-black',
                            'text-gray-50',
                            'flex-1 font-semibold content-center'
                        )}
                    >
                        {offer.author.userName}, {offer.author.userAge}
                    </div>

                    <div
                        className={themeChangerDescriptionString(
                            theme,
                            'text-black',
                            'text-gray-50',
                            'flex-1 text-xs px-2 text-right italic content-center'
                        )}
                    >
                        11.22.63
                    </div>
                </div>

                <img className="w-full h-40 object-cover" src={offer.photo} alt="Offer image" />
                <div className={`px-6 py-4 flex-grow ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="font-bold text-[16px] mb-2 line-clamp-2">{offer.title}</div>
                    <p
                        className={themeChangerDescriptionString(
                            theme,
                            "text-gray-700 text-base",
                            "text-gray-300",
                            `text-[14px] line-clamp-[8]`
                        )}
                    >
                        {offer.body}
                    </p>
                </div>
                <div className="px-6 py-2 mt-auto">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #photography
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #travel
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default Card;
