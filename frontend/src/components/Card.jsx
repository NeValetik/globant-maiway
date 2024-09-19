import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";

const Card = ({ offer }) => {
    console.log(offer)
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    return (
            <div
                className={themeChangerDescriptionString(
                    theme,
                    'bg-[#ffffff] hover:shadow shadow-amber-50 group',
                    'bg-[#1e1f20] hover:shadow hover:shadow-gray-500 group',
                    'max-w-sm rounded overflow-hidden min-h-[522px] max-h-[522px] flex flex-col'
                )}
            >
                <div className="w-full flex py-3 relative">
                    <div
                        className="relative px-6 flex items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Link to={`/user/${offer.author.username}`} className={'block'}><img
                            className={`rounded-full overflow-hidden h-8 w-8 object-cover hover:drop-shadow-sm hover:shadow-[#016960] transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                            src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                            alt="Profile"
                        />
                        </Link>
                        {isHovered && (
                            <Link to={`/user/${offer.author.username}`} className={'block'}>
                            <div
                                className="absolute left-10 top-0 w-[250px] h-[120px] p-4 bg-white shadow-lg border rounded-lg z-10 opacity-100 transition-opacity duration-300 flex flex-col justify-between"
                            >
                                <div className="flex">
                                    <img
                                        className="rounded-full h-10 w-10 object-cover mb-4"
                                        src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                                        alt="Profile Preview"
                                    />
                                    <div>
                                        <p className="text-[12px] text-center px-2">{offer.author.username || "Unknown User"}</p>
                                        <p className="text-16px px-2 text-black">{offer.author.name || "Mr. Nobody"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MdOutlineEmail className="flex-shrink-0" />
                                    <p className="line-clamp-1 text-[12px] px-1 text-center overflow-hidden text-ellipsis">
                                        {offer.author.email || "No email available"}
                                    </p>
                                </div>
                            </div>
                                </Link>)
                            }
                    </div>

                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        className={themeChangerDescriptionString(
                            theme,
                            'text-black',
                            'text-gray-50',
                            'flex-1 flex items-center hover:text-[#016960]'
                        )}
                    >
                        {offer.author.username}, {offer.author.userAge}
                    </div>
                    <div
                        className={themeChangerDescriptionString(
                            theme,
                            'text-black',
                            'text-gray-50',
                            'flex-1 text-xs px-2 text-right italic flex items-center'
                        )}
                    >

                        11.22.63
                    </div>
                </div>

                <img
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
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
                            "text-[14px] line-clamp-[8]"
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
    );
};

export default Card;
