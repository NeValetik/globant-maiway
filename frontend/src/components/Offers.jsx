import React, { useState, useEffect } from 'react';
import Card from './Card';
import loading_cat from '../assets/loading_cat.gif'

const Offers = ({query}) => {
    const [offers, setOffers] = useState(null);
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:6969/api/offer/page/${page}`)
            .then((res) => res.json())
            .then((data) => {
                const processedOffers = data.map((offer) => {
                    if (offer.photo) {
                        let imageUrl;
                        if (Array.isArray(offer.photo)) {
                            // If it's a byte array
                            const imageBlob = new Blob([new Uint8Array(offer.photo)], { type: 'image/jpeg' });
                            imageUrl = URL.createObjectURL(imageBlob);
                        } else if (typeof offer.photo === 'string') {
                            // If it's a Base64 encoded string
                            imageUrl = `data:image/jpeg;base64,${offer.photo}`;
                        }
                        return { ...offer, photo: imageUrl };
                    }
                    return offer;
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
                    <img src={loading_cat} alt="Loading" />
                </div>
            ) : (
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