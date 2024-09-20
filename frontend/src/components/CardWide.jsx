import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";

const CardWide = ({ offer }) => {
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={themeChangerDescriptionString(
                theme,
                'bg-[#ffffff] hover:shadow shadow-amber-50 group relative',
                'bg-[#1e1f20] hover:shadow hover:shadow-gray-500 group relative',
                'max-w-6xl w-full rounded overflow-hidden max-h-[280px] min-h-[280px] flex'
            )}
        >
            <div className="relative" style={{ width: '370px', height: '280px' }}>
                <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={offer.photo}
                    alt="Offer image"
                />
            </div>
            <div className="flex-1 flex flex-col p-6">
                <div className="flex items-center mb-4">
                    <div
                        className="relative flex items-center mr-4"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Link to={`/user/${offer.author.username}`} className="block">
                            <img
                                className={`rounded-full overflow-hidden h-10 w-10 object-cover hover:drop-shadow-sm hover:shadow-[#016960] transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                                src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                                alt="Profile"
                            />
                        </Link>

                        {isHovered && (
                            <Link to={`/user/${offer.author.username}`} className="block">
                                <div
                                    className={themeChangerDescriptionString(theme,
                                        'bg-white shadow-lg ', 'bg-[#292a2b]',
                                        'absolute left-0 top-12 w-[250px] h-[120px] p-4 border rounded-lg z-10 opacity-100 transition-opacity duration-300 flex flex-col justify-between')}
                                >
                                    <div className="flex">
                                        <img
                                            className="rounded-full h-10 w-10 object-cover mb-4"
                                            src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                                            alt="Profile Preview"
                                        />
                                        <div>
                                            <p className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-[12px] text-center px-2')}>{offer.author.username || "Unknown User"}</p>
                                            <p className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-16px px-2')}>{offer.author.name || "Mr. Nobody"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <MdOutlineEmail className="flex-shrink-0" color={themeChangerDescriptionString(theme, 'black', 'white')} />
                                        <p className={themeChangerDescriptionString(theme, 'text-black', 'text-white', "line-clamp-1 text-[12px] px-1 text-center overflow-hidden text-ellipsis")}>
                                            {offer.author.email || "No email available"}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    <div
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
                            'text-xs italic'
                        )}
                    >
                        11.22.63
                    </div>
                </div>

                <div className={`flex-grow ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="font-bold text-xl mb-2">{offer.title}</div>
                    <p
                        className={themeChangerDescriptionString(
                            theme,
                            "text-gray-700",
                            "text-gray-300",
                            "text-base line-clamp-4"
                        )}
                    >
                        {offer.body}
                    </p>
                </div>
            </div>
            {/* Tags container positioned at the bottom right, outside the image */}
            <div className="absolute bottom-2 left-[400px] flex space-x-2 py-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #travel
                </span>
            </div>
        </div>
    );
};

export default CardWide;
