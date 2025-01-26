import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "../components/utils/themeChangerDescriptionString";

const PolicyPage = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="py-10 px-4 max-w-[1200px] mx-auto">
                <div
                    className={themeChangerDescriptionString(
                        theme,
                        "bg-white text-black",
                        "bg-[#1e1f20] text-white",
                        "shadow-md rounded-lg p-8"
                    )}
                >
                    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                    <p className="mb-4">
                        Welcome to MaiWay! Your privacy is important to us. This policy outlines the data we collect, how it is used, and your rights.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">What Data We Collect</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <span className="font-bold">Name:</span> Used for displaying your profile and helping others find you.
                        </li>
                        <li>
                            <span className="font-bold">Age:</span> Helps others understand your preferences and find compatible travel buddies.
                        </li>
                        <li>
                            <span className="font-bold">Bio:</span> Allows you to share a little about yourself to help build connections.
                        </li>
                        <li>
                            <span className="font-bold">Contact Information:</span> Includes email or social media links to facilitate communication.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Data</h2>
                    <p className="mb-4">
                        We use the data you provide to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Help you connect with like-minded travel companions.</li>
                        <li>Enhance your user experience by personalizing content.</li>
                        <li>Provide necessary support or notifications regarding the service.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
                    <p className="mb-4">
                        You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Request access to your data.</li>
                        <li>Edit or delete your profile information.</li>
                        <li>Contact us with concerns about data usage.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions or concerns, feel free to reach out to us at
                        <a
                            href="mailto:legal@maiway.com"
                            className="text-mwlightgreen underline hover:text-mwdarkgreen ml-1"
                        >
                            support@maiwapp.com
                        </a>.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        This policy may be updated from time to time. Please check back regularly for updates.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PolicyPage;
