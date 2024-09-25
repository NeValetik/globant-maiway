import React, { useState,useEffect } from 'react';
import UploadPhotoSVG from "../assets/buttons/UploadPhotoSVG";
import Navbar from "../components/Navbar";
import themeChangerDescriptionString from "../components/utils/themeChangerDescriptionString";
import {useTheme} from "../context/ThemeContext";
import locationsData from '../assets/locations.json';

import { IoIosSettings } from "react-icons/io";


const NewOffer = () => {

    const {theme, toggleTheme} = useTheme()

    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [region, setRegion] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        setCountries(locationsData);
      }, []);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('location', location);
        formData.append('region',region)
        formData.append('userId', userId);
        const token = localStorage.getItem("token")
        console.log(token)

        try {
            const response = await fetch('http://localhost:6969/api/offer/new-offer', {
                method: 'POST',
                headers:{
                    "Authorization":`Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response;

            console.log('Offer created successfully:', data);
            window.location.href = "/";
        } catch (error) {
            console.error('Error creating offer:', error);
            setError('Failed to create offer. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-[#1e1f20] rounded-lg">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4" >
                    <label className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d]', 'bg-[#016960] hover:bg-[#629a8d]', '' +
                        'cursor-pointer inline-flex items-center text-white py-2 px-4 rounded' +
                        'ml-2')}>
                        <UploadPhotoSVG color={"white"} />
                        <span className='ml-2' >Upload Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="mb-4 h-[200px] w-auto rounded" />
                )}

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2"></label>
                    <textarea
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the offer title"
                        className={themeChangerDescriptionString(theme, '', 'text-gray-300  bg-[#282a2c]', "w-full p-2 rounded")}
                        required maxLength={80}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="body" className="block mb-2"></label>
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
                    id="country"
                    value={location || ''}
                    onChange={(e) => {
                        const selectedCountry = countries.find((country) => country.code === e.target.value);
                        setLocation(selectedCountry.code);
                        setRegions(selectedCountry.regions || []);
                    }}
                    className={themeChangerDescriptionString(
                        theme,
                        'bg-[#ffffff] border-amber-50 text-gray-700',
                        'bg-[#212223] border-gray-500 text-white'," p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500")}
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
                    id="region"
                    value={region || ''}
                    onChange={(e) => setRegion(e.target.value)}
                    className={themeChangerDescriptionString(
                        theme,
                        'bg-[#ffffff] border-amber-50 text-gray-700',
                        'bg-[#212223] border-gray-500 text-white'," p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500")}>
                    <option value="">Choose a region</option>
                    {regions.map((region) => (
                        <option key={region.code} value={region.code}>
                        {region.name}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4 flex items-center space-x-2">
                    <IoIosSettings fill={'white'}/>
                    <label htmlFor="userId" className="sr-only">User ID</label>
                    <input
                        id="userId"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter user ID"
                        className={themeChangerDescriptionString(theme, '', 'bg-[#282a2c]', "flex-grow p-2 rounded")}
                    />
                </div>    
                <button type="submit"
                        className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d]', 'bg-[#016960] hover:bg-[#629a8d]', "w-full py-2 px-4 rounded text-")}>
                    Submit Offer
                </button>
            </form>
        </div>
    );
};
// over:bg-[#016960] bg-[#629a8d]
export default NewOffer;