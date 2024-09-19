import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Card from "../components/Card";

const UserPage = () => {
    const { username } = useParams(); // Gets the 'username' from the URL
    const [userdata, setUserdata] = useState(null); // State for user data

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
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

        return () => {
            // Cleanup object URLs to avoid memory leaks
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [username]); // Re-fetch when username changes

    if (!userdata) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <div className="text-white">
            <Navbar />
            <h1>{userdata.username}</h1>
            <p>About: {userdata.about}</p>
            {/* Display user's profile picture */}
            {userdata.photo && <img src={userdata.photo} alt="Profile Picture" />}

            {userdata.offers && userdata.offers.length > 0 ? (
                userdata.offers.map((offer, index) => (
                    <Card key={index} offer={offer} />
                ))
            ) : (
                <p>No offers available</p>
            )}
        </div>
    );
};

export default UserPage;
