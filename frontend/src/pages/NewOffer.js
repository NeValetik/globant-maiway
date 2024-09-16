import React, { useState } from 'react';
import {redirect} from "react-router-dom";

const NewOffer = () => {
    const [Photo, setPhoto] = useState(null);  // For the image
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('');                // For the offer body
    const [userId, setUserId] = useState('');            // For the user ID

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);  // Set the selected photo
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a formData object to send image file and other fields
        const formData = new FormData();
        formData.append('photo', Photo);
        formData.append('body', body);
        formData.append('userId', userId);
        formData.append('title', title);


        console.log(formData);

// Send the formData to the server (adjust the URL to your backend API)
        fetch('http://localhost:6969/api/offer/new-offer', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                console.log('Offer created successfully:', data);
                window.location.href = "/";
            })
            .catch((error) => {
                console.error('Error creating offer:', error);
            });
    }


        return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                />
            </div>

            <div>
                <label>Title:</label>
                <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the offer title"
                />
            </div>


            <div>
                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter the offer details"
                />
            </div>


            <div>
                <label>User ID:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user ID"
                />
            </div>
            <button type="submit">Submit Offer</button>
        </form>
    );
};

export default NewOffer;
