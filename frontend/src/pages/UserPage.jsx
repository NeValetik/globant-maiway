import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useDominantColor from "../components/utils/useDominantColor";
import themeChangerDescriptionString from "../components/utils/themeChangerDescriptionString";
import { useTheme } from '../context/ThemeContext';
import CardWide from "../components/CardWide";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaMale, FaFemale } from "react-icons/fa";
import {JWTContext} from "../context/JWTContext";

const UserPage = () => {

    const { token, authUserId, isAuthenticated } = useContext(JWTContext);
    console.log("Context Values: ", { token, authUserId, isAuthenticated });

    const { username } = useParams();
    const [userdata, setUserdata] = useState(null);
    const [userPfpUrl, setUserPfpUrl] = useState(null);
    const [offers, setOffers] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [formData, setFormData] = useState({});
    const dominantColor = useDominantColor(userPfpUrl);
    const { theme } = useTheme();

    useEffect(() => {
        let objectUrls = [];

        fetch(`http://localhost:6969/api/user/userpage/username/${username}`,)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
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
                console.log("Token from auth " + authUserId)

                setUserdata({ ...data, photo: userPfpUrl });
                setUserPfpUrl(userPfpUrl);
                setFormData({ // Set form data for editing
                    name: data.name,
                    age: data.age,
                    sex: data.sex,
                    email: data.email,
                    instagramLink: data.instagramLink,
                    about: data.about,
                    photo: data.photo,
                    id: data.id
                });

                const processedOffers = data.offers.map(offer => ({
                    ...offer,
                    photo: offer.photo ? (
                        Array.isArray(offer.photo)
                            ? URL.createObjectURL(new Blob([new Uint8Array(offer.photo)], { type: 'image/jpeg' }))
                            : `data:image/jpeg;base64,${offer.photo}`
                    ) : null,
                    author: {
                        ...offer.author,
                        userPfp: userPfpUrl
                    }
                }));
                setOffers(processedOffers);
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [username]);

    const handleSubmit = () => {
        fetch(`http://localhost:6969/api/user/${userdata.id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) {
                    console.log(res.text())
                    throw new Error('Network response was not ok.');
                }
                // return res.json(); // Parse the JSON response
            })
            .then((data) => {
                // Update the userdata with the new data
                setUserdata((prev) => ({
                    ...prev,
                    ...data, // Ensure you get the latest user data
                }));
                setIsEditing(false); // Exit edit mode
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
            });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({
            name: userdata.name,
            age: userdata.age,
            sex: userdata.sex,
            email: userdata.email,
            instagramLink: userdata.instagramLink,
            about: userdata.about,
        });
    };

    if (!userdata) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="py-10 justify-center w-full mx-auto flex flex-col relative">
                <div
                    className={themeChangerDescriptionString(theme, 'bg-white', 'bg-mvcontainergrey', 'shadow-sm rounded-lg overflow-hidden mx-auto max-w-[1200px] w-full relative')}>
                    <div className="min-h-[170px] h-[170px] w-full" style={{ backgroundColor: dominantColor }}></div>

                    <div className="relative p-8 flex items-start">
                        <img
                            src={userPfpUrl}
                            alt="Profile Picture"
                            className={themeChangerDescriptionString(theme, 'border-white', 'border-mvcontainergrey shadow-md', 'rounded-full object-cover w-[200px] h-[200px] border-[10px] transition-transform duration-300 ease-in-out hover:scale-110 absolute -top-20 left-8')}
                        />
                        <div className="h-[220px] flex w-full">
                            <div className="flex-1">
                                <div className="flex ml-[250px] flex-col">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="border px-2 py-1 rounded"
                                            />
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="border px-2 py-1 rounded mt-2"
                                            />
                                            <select
                                                name="sex"
                                                value={formData.sex}
                                                onChange={handleChange}
                                                className="border px-2 py-1 rounded mt-2"
                                            >
                                                <option value="m">Male</option>
                                                <option value="f">Female</option>
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-3xl font-bold')}>
                                                {userdata.name}
                                            </h1>
                                            <p className={themeChangerDescriptionString(theme, 'text-gray-600', 'text-gray-400', "mt-1")}>
                                                @{username}
                                            </p>
                                            <div className={'flex-auto flex items-center'}>
                                                <p className={themeChangerDescriptionString(theme, 'text-gray-600', 'text-[#9ca3af]', "text-lg mr-2")}>
                                                    {userdata.age} y.o
                                                </p>
                                                {userdata.sex === 'm' ? (
                                                    <FaMale color={themeChangerDescriptionString(theme, '#374151', '#9ca3af')} size={20} />
                                                ) : (
                                                    <FaFemale color={themeChangerDescriptionString(theme, '#374151', '#9ca3af')} size={20} />
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className={'mt-10'}>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="border px-2 py-1 rounded"
                                            />
                                            <input
                                                type="text"
                                                name="instagramLink"
                                                value={formData.instagramLink}
                                                onChange={handleChange}
                                                className="border px-2 py-1 rounded mt-2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {userdata.email && (
                                                <div className={'flex items-center'}>
                                                    <MdOutlineEmail
                                                        color={themeChangerDescriptionString(theme, 'black', 'white')}
                                                        className="mr-2"
                                                    />
                                                    <a href={`mailto:${userdata.email}`}
                                                       className={themeChangerDescriptionString(theme, 'text-mwlightgreen', 'text-mwlightgreen')}>
                                                        {userdata.email}
                                                    </a>
                                                </div>
                                            )}
                                            {userdata.instagramLink && (
                                                <div className={'flex items-center'}>
                                                    <FaInstagram
                                                        color={themeChangerDescriptionString(theme, 'black', 'white')}
                                                        className="mr-2"
                                                    />
                                                    <a href={userdata.instagramLink}
                                                       className={themeChangerDescriptionString(theme, 'text-mwlightgreen', 'text-mwlightgreen')}>
                                                        {userdata.instagramLink}
                                                    </a>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="ml-10 w-1/2">
                                <h2 className={themeChangerDescriptionString(theme, 'text-black', 'text-white', "text-3xl font-semibold mb-2 text-left")}>
                                    About Me
                                </h2>
                                {isEditing ? (
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        className="border px-2 py-1 rounded w-full"
                                    />
                                ) : (
                                    <p className={themeChangerDescriptionString(theme, 'text-gray-700', 'text-gray-300', 'text-left line-clamp-7')}>
                                        {userdata.about || "* Empty *"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'m-auto mt-4'}>
                    {isEditing ? (
                        <div className="flex gap-4">
                            <button
                                onClick={cancelEdit}
                                className={'focus:outline-none font-semibold rounded-lg text-white text-sm px-4 bg-red-500 hover:bg-red-600'}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={'focus:outline-none font-semibold rounded-lg text-white text-sm px-4 bg-mwdarkgreen hover:bg-mwlightgreen'}
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleEditMode}
                            className={'focus:outline-none font-semibold rounded-lg text-white text-sm px-4 bg-mwdarkgreen hover:bg-mwlightgreen w-[80px]'}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-10">
                <h2 className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-2xl font-bold mb-4 text-center')}>
                    User's Offers
                </h2>
                <div className="py-4 max-w-[1200px] m-auto">
                    {offers.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {offers.map((offer, index) => (
                                <CardWide key={index} offer={offer} />
                            ))}
                        </div>
                    ) : (
                        <p>No offers available</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPage;
