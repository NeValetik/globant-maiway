import React, { useState, useEffect, useContext } from 'react';
import UploadPhotoSVG from "../assets/buttons/UploadPhotoSVG";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tags from '../components/Tags';
import themeChangerDescriptionString from '../components/utils/themeChangerDescriptionString';
import { useParams } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";
import loading_cat from '../assets/loading_cat.gif';
import locationsData from '../assets/locations.json';
import { JWTContext } from "../context/JWTContext";
import { IoIosSettings } from "react-icons/io";

const processImage = (photo) => {
    let imageUrl = '';
    if (Array.isArray(photo)) {
        const imageBlob = new Blob([new Uint8Array(photo)], { type: 'image/jpeg' });
        imageUrl = URL.createObjectURL(imageBlob);
    } else if (typeof photo === 'string') {
        imageUrl = `data:image/jpeg;base64,${photo}`;
    }
    return imageUrl;
};

function OfferPage() {
    const { id } = useParams(); // Get the offer ID from the URL parameters
    const [offer, setOffer] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { theme } = useTheme();
    const { token, userId } = useContext(JWTContext);
    
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [region, setRegion] = useState('');
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleClick = () => {
        setIsEditing(!isEditing);
    };

    const fetchOffer = async (id) => {
        try {
            const response = await fetch(`http://localhost:6969/api/offer/${id}`);
            const offer = await response.json();
            const processedOffer = {
                ...offer,
                photo: processImage(offer.photo),
                author: {
                    ...offer.author,
                    userPfp: processImage(offer.author?.userPfp),
                },
            };
            setOffer(processedOffer);
            // Pre-populate form fields with existing data
            setTitle(processedOffer.title);
            setBody(processedOffer.body);
            setLocation(processedOffer.location);
            setRegion(processedOffer.region);
            setPreviewUrl(processedOffer.photo);
        } catch (error) {
            console.error('Error fetching offer:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id)
        formData.append('title', title);
        formData.append('body', body);
        formData.append('location', location);
        formData.append('region', region);
        if (photo) formData.append('photo', photo);

        try {
            const response = await fetch(`http://localhost:6969/api/offer/edit-offer`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            console.log('Offer edited successfully:', data);
            setIsEditing(false);
            window.location.reload(); // Refresh offer data after successful update
        } catch (error) {
            console.error('Error editing offer:', error);
        }
    };

    useEffect(() => {
        setCountries(locationsData);
        fetchOffer(id);
    }, [id]);

    if (!offer) {
        return (
            <div className="justify-items-center justify-center flex my-auto">
                <img src={loading_cat} width={'20%'} height={'auto'} alt="Loading" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            {!isEditing ? (
                <div className="flex-col relative mt-5">
                    <img className="mx-auto w-[653px] h-80 rounded-lg" src={offer.photo} alt="Offer Image" />
                    <div className={themeChangerDescriptionString(theme, 'text-black', 'text-white', `flex flex-col mx-auto w-[653px]`)}>
                        <div className="py-4 text-[25px]">
                            {offer.title}
                        </div>
                        <div className="pb-4">
                            {offer.body}
                        </div>
                        <Tags classNamePos="flex" tags={{ "region": offer.region, "location": offer.location }} />
                    </div>
                    {userId === offer.author.userId ? (
                        <button className="flex flex-col mx-auto px-4 py-2 text-white my-2 rounded-lg bg-mwlightgreen" onClick={handleClick}>
                            Edit
                        </button>
                    ) : null}
                </div>
            ) : (
                <form onSubmit={handleEditSubmit} className="mx-auto mt-8 p-4">
                    <div className="mb-4">
                        <label className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d]', 'bg-[#016960] hover:bg-[#629a8d]', 'cursor-pointer inline-flex items-center text-white py-2 px-4 rounded ml-2')}>
                            <UploadPhotoSVG color={"white"} />
                            <span className='ml-2'>Upload Photo</span>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </label>
                    </div>

                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" className="mx-auto w-[653px] h-80 rounded-lg mb-5" />
                    )}

                    <div className="mb-4">
                        <textarea
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the offer title"
                            className={themeChangerDescriptionString(theme, '', 'text-gray-300 bg-[#282a2c]', "w-full p-2 rounded")}
                            required maxLength={80}
                        />
                    </div>

                    <div className="mb-4">
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter the offer details"
                            className={themeChangerDescriptionString(theme, '', 'text-gray-300 bg-[#282a2c]', "w-full p-2 rounded")}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            value={location || ''}
                            onChange={(e) => {
                                const selectedCountry = countries.find((country) => country.code === e.target.value);
                                setLocation(selectedCountry.code);
                                setRegions(selectedCountry.regions || []);
                            }}
                            className={themeChangerDescriptionString(theme, 'bg-[#ffffff] border-amber-50 text-gray-700', 'bg-[#212223] border-gray-500 text-white', "p-2 rounded-md shadow-md")}
                        >
                            <option value="">Choose a country</option>
                            {countries.map((selLocation) => (
                                <option key={selLocation.code} value={selLocation.code}>
                                    {selLocation.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <select
                            value={region || ''}
                            onChange={(e) => setRegion(e.target.value)}
                            className={themeChangerDescriptionString(theme, 'bg-[#ffffff] border-amber-50 text-gray-700', 'bg-[#212223] border-gray-500 text-white', "p-2 rounded-md shadow-md")}
                        >
                            <option value="">Choose a region</option>
                            {regions.map((region) => (
                                <option key={region.code} value={region.code}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d] ', 'bg-[#016960] hover:bg-[#629a8d]', "w-full py-2 px-4 rounded text-white")}>
                        Save Changes
                    </button>
                </form>
            )}
            <Footer />
        </div>
    );
}

export default OfferPage;
