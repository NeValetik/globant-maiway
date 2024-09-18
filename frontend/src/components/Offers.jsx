import React, { useState, useEffect } from 'react';
import Card from './Card';
import loading_cat from '../assets/loading_cat.gif'
import sad_robot from '../assets/sad_robot.png'
const Offers = ({query}) => {
    const [offers, setOffers] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
    fetch(query===null?`http://localhost:6969/api/offer/page/${page}` : `http://localhost:6969/api/offer/search?query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                const processedOffers = data.map((offer) => {
                    let imageUrl = '';
                    let userPfpUrl = '';

                    // Handle offer photo
                    if (offer.photo) {
                        if (Array.isArray(offer.photo)) {
                            // If it's a byte array
                            const imageBlob = new Blob([new Uint8Array(offer.photo)], { type: 'image/jpeg' });
                            imageUrl = URL.createObjectURL(imageBlob);
                        } else if (typeof offer.photo === 'string') {
                            // If it's a Base64 encoded string
                            imageUrl = `data:image/jpeg;base64,${offer.photo}`;
                        }
                    }

                    // Handle author's userPfp
                    if (offer.author && offer.author.userPfp) {
                        if (Array.isArray(offer.author.userPfp)) {
                            const imageBlobPfp = new Blob([new Uint8Array(offer.author.userPfp)], { type: 'image/jpeg' });
                            userPfpUrl = URL.createObjectURL(imageBlobPfp);
                        } else if (typeof offer.author.userPfp === 'string') {
                            userPfpUrl = `data:image/jpeg;base64,${offer.author.userPfp}`;
                        }
                    }

                    return { ...offer, photo: imageUrl, author: { ...offer.author, userPfp: userPfpUrl } };
                });
                setOffers(processedOffers);
            })
            .catch((error) => {
                console.log('Error fetching offers:', error);
            });
    }, [page]);

    return (
        <>
            {offers === null ? (
                <div className="flex justify-center items-center">
                    <img src={loading_cat} width={'20%'} height={'auto'} alt="Loading" />
                </div>
            ) : offers.length === 0?
                <div className={'flex justify-center items-center'}>
                    <img className={'w-[250px]'}src={sad_robot} alt={"sad robot picture"}/> <p className={'text-3xl font-mono'}> Sorry, I couldn't find any results.</p>
                </div>
                : (
                <div className="flex justify-center w-full">
                    <div className="flex flex-col gap-3 w-full max-w-screen-xl px-[32px]">
                        <div
                            className="grid gap-5"
                            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 2fr))' }}
                        >
                            {offers.map((offer, index) => (
                                <Card key={index} offer={offer} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Offers;