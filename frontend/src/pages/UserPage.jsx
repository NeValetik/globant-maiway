import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import useDominantColor from "../components/utils/useDominantColor";

const UserPage = () => {
    const { username } = useParams();
    const [userdata, setUserdata] = useState(null);
    const [userPfpUrl, setUserPfpUrl] = useState(null);
    const dominantColor = useDominantColor(userPfpUrl); // Extract color based on the profile picture URL

    useEffect(() => {
        let objectUrls = [];

        fetch(`http://localhost:6969/api/user/userpage/username/${username}`)
            .then((res) => res.json())
            .then((data) => {
                // Process user profile picture
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

                const processedOffers = data.offers.map((offer) => {
                    let imageUrl = '';
                    let offerUserPfpUrl = '';

                    // Handle offer photo
                    if (offer.photo) {
                        if (Array.isArray(offer.photo)) {
                            const imageBlob = new Blob([new Uint8Array(offer.photo)], { type: 'image/jpeg' });
                            imageUrl = URL.createObjectURL(imageBlob);
                            objectUrls.push(imageUrl);
                        } else if (typeof offer.photo === 'string') {
                            imageUrl = `data:image/jpeg;base64,${offer.photo}`;
                        }
                    }

                    // Handle author's userPfp
                    if (offer.author && offer.author.userPfp) {
                        if (Array.isArray(offer.author.userPfp)) {
                            const imageBlobPfp = new Blob([new Uint8Array(offer.author.userPfp)], { type: 'image/jpeg' });
                            offerUserPfpUrl = URL.createObjectURL(imageBlobPfp);
                            objectUrls.push(offerUserPfpUrl);
                        } else if (typeof offer.author.userPfp === 'string') {
                            offerUserPfpUrl = `data:image/jpeg;base64,${offer.author.userPfp}`;
                        }
                    }

                    return { ...offer, photo: imageUrl, author: { ...offer.author, userPfp: offerUserPfpUrl } };
                });

                setUserdata({ ...data, photo: userPfpUrl, offers: processedOffers });
                setUserPfpUrl(userPfpUrl); // Set user profile picture URL to be used by the dominant color extractor
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

        return () => {
            // Cleanup object URLs to avoid memory leaks
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [username]);

    if (!userdata) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="py-10 justify-center w-[90%] mx-auto flex flex-col relative bg-black pd">
                <div className="min-h-[250px] h-[250px] w-full" style={{ backgroundColor: dominantColor }}>
                </div>

                <div className="text-white">
                    <img
                        src={userPfpUrl}
                        alt="Profile Picture"
                        className="rounded-full object-cover w-[300px] h-[300px] absolute bottom-[-125px] left-[100px] transition-transform duration-300 ease-in-out hover:scale-110 border-4 border-white"
                    />
                    <h1>{userdata.name}</h1>
                    <p>About: {userdata.about}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 px-4">
                {userdata.offers && userdata.offers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userdata.offers.map((offer, index) => (
                            <Card key={index} offer={offer} />
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
