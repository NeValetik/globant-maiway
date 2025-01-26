const fetchUserPhoto = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}/photo`, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.blob();
    } catch (error) {
        console.error('Failed to fetch user photo:', error);
        return null; // Return null or handle error as needed
    }
};
