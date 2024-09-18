import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link } from 'react-router-dom';

const Card = ({ offer }) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/offers/${offer.id}`} className="block">
            <div
                className={themeChangerDescriptionString(
                    theme,
                    'bg-[#ffffff] hover:shadow shadow-amber-50 group',
                    'bg-[#1e1f20] hover:shadow hover:shadow-gray-500 group',
                    'max-w-sm rounded overflow-hidden min-h-[522px] max-h-[522px] flex flex-col'
                )}
            >
                <Link to={`/user/${offer.author.userId}`} className={'block'}>
                    <div className="w-full flex py-3 relative">
                        <div
                            className="px-6 relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <img
                                className={`rounded-full h-8 hover:drop-shadow-sm hover:shadow-[#016960] transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                                src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                                alt="Profile"
                            />
                            {/* Conditionally render the profile preview */}
                            {isHovered && (
                                <div className="absolute left-10 top-0 w-40 p-2 bg-white shadow-lg border rounded-lg z-10 opacity-100 transition-opacity duration-300">
                                    <img
                                        className="rounded-full h-16 mb-2"
                                        src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                                        alt="Profile Preview"
                                    />
                                    <p className="text-sm font-semibold">{offer.author.userName || "Unknown User"}</p>
                                    <p className="text-xs text-gray-500">{offer.author.email || "No email available"}</p>
                                </div>
                            )}
                        </div>

                        <div
                            className={themeChangerDescriptionString(
                                theme,
                                'text-black',
                                'text-gray-50',
                                'flex-1 content-center hover:text-[#016960]'
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
                </Link>

                <img
                    className={`w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110`}
                    src={offer.photo}
                    alt="Offer image"
                />

                <div className={`px-6 py-4 flex-grow ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="font-bold text-[16px] mb-2 line-clamp-2">{offer.title}</div>

                    <p
                        className={themeChangerDescriptionString(
                            theme,
                            "text-gray-700",
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
