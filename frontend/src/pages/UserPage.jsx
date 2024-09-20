import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useDominantColor from "../components/utils/useDominantColor";
import themeChangerDescriptionString from "../components/utils/themeChangerDescriptionString";
import { useTheme } from '../context/ThemeContext';
import CardWide from "../components/CardWide";

const UserPage = () => {
    const { username } = useParams();
    const [userdata, setUserdata] = useState(null);
    const [userPfpUrl, setUserPfpUrl] = useState(null);
    const [offers, setOffers] = useState([]);
    const dominantColor = useDominantColor(userPfpUrl);
    const { theme } = useTheme();

    useEffect(() => {
        let objectUrls = [];

        fetch(`http://localhost:6969/api/user/userpage/username/${username}`)
            .then((res) => res.json())
            .then((data) => {
                let userPfpUrl = '';
                if (data.photo) {
                    if (Array.isArray(data.photo)) {
                        const imageBlobPfp = new Blob([new Uint8Array(data.photo)], { type: 'image/jpeg' });
                        userPfpUrl = URL.createObjectURL(imageBlobPfp);
                        objectUrls.push(userPfpUrl);
                    } else if (typeof data.photo === 'string') {
                        userPfpUrl = `data:image/jpeg;base64,${data.photo}`;
                    }
                }

                setUserdata({ ...data, photo: userPfpUrl });
                setUserPfpUrl(userPfpUrl);

                // Process offers
                const processedOffers = data.offers.map(offer => ({
                    ...offer,
                    photo: offer.photo ? (
                        Array.isArray(offer.photo)
                            ? URL.createObjectURL(new Blob([new Uint8Array(offer.photo)], { type: 'image/jpeg' }))
                            : `data:image/jpeg;base64,${offer.photo}`
                    ) : null,
                    author: {
                        ...offer.author,
                        userPfp: userPfpUrl // Set author's photo to user's profile picture
                    }
                }));
                setOffers(processedOffers);

                console.log(data);
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [username]);

    if (!userdata) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="py-10 justify-center w-full mx-auto flex flex-col relative">
                <div className={themeChangerDescriptionString(theme, 'bg-white',
                    'bg-mvcontainergrey',
                    'shadow-lg rounded-lg overflow-hidden mx-auto max-w-[1200px] w-full')}>
                    <div className="min-h-[20px] h-[200px] w-full" style={{ backgroundColor: dominantColor }}>
                    </div>
                    <div className="p-8 relative">
                        <img
                            src={userPfpUrl}
                            alt="Profile Picture"
                            className={themeChangerDescriptionString(theme,
                                'border-white',
                                'border-mvcontainergrey shadow-md',
                                'rounded-full object-cover w-[200px] h-[200px] mx-auto -mt-28 border-[10px] transition-transform duration-300 ease-in-out hover:scale-110')}
                        />
                        <h1 className={themeChangerDescriptionString(theme,
                            'text-black',
                            'text-white',
                            'text-3xl font-bold text-center mt-4')}>{userdata.name}</h1>

                        <p className={themeChangerDescriptionString(theme, 'text-gray-600 ', 'text-gray-400', "text-center mt-2")}>@{username}</p>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">About Me</h2>
                            <p className={themeChangerDescriptionString(theme, 'text-gray-700', 'text-gray-300')}>{userdata.about || "No bio available"}</p>
                        </div>
                    </div>
                </div>
            </div>

                <h2 className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-2xl font-bold mb-4')}>User's Offers</h2>
            <div className={'py-4 flex-auto items-center'}>
                {offers.length > 0 ? (
                    <div>
                        {offers.map((offer, index) => (
                            <CardWide key={index} offer={offer} />
                        ))}
                    </div>
                ) : (
                    <p>No offers available</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;