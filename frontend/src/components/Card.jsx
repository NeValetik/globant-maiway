import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link,useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from "react-icons/md";
import Tags from './Tags';


const Card = ({ offer }) => {
    // console.log(offer)
    const { theme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    console.log(offer);

    const handleClick = () =>{
        navigate(`offer/${offer.id}`);
    }

    return (
            <Link to={`/offer/${offer.id}`}
                className={themeChangerDescriptionString(
                    theme,
                    'bg-[#ffffff] hover:shadow shadow-amber-50 group',
                    'bg-[#1e1f20] hover:shadow hover:shadow-gray-500 group',
                    'max-w-sm rounded overflow-hidden min-h-[522px] max-h-[522px] flex flex-col'
                )
                }
                >
                <div className="w-full flex py-3 relative">
                    <div
                        className="relative px-6 flex items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Link to={`/user/${offer.author.username}`} className={''}><img
                            className={`rounded-full overflow-hidden h-8 w-8 object-cover hover:drop-shadow-sm hover:shadow-[#016960] transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                            src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                            alt="Profile"
                        />
                        </Link>

                        {/*Is hovered container rendering */}

                        {isHovered && (
                            <Link to={`/user/${offer.author.username}`} className={'block'}>
                            <div
                                className={themeChangerDescriptionString(theme,
                                    'bg-white shadow-lg ', 'bg-[#292a2b]',
                                    'absolute left-10 top-0 w-[250px] h-[120px] p-4 border rounded-lg z-10 opacity-100 transition-opacity duration-300 flex flex-col justify-between"\n')}
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
                            'flex text-xs text-right px-3 italic flex items-center'
                        )}
                    >
                        {offer.creationDate && offer.creationDate.substring(0, 16)}
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
                <Tags tags={{"region":offer.region,"location":offer.location}}/>
            </Link>
    );
};

export default Card;
