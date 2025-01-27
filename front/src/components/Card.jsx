'use client';

import React, { useCallback, useState, useContext } from 'react';
import { useTheme } from "src/context/ThemeContext"; // Update import path as per your project structure
import themeChangerDescriptionString from "src/components/utils/themeChangerDescriptionString"; // Update path
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { JWTContext } from 'src/context/JWTContext';
import Tags from "src/components/Tags"; // Update path


const Card = ({ offer, sizeType = "default" }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { token } = useContext(JWTContext);

  const handleClick = () => {
    router.push(`/offer/${offer.id}`);
  };

  const handleTrashClick = useCallback(async () => {
    try {
      console.log("Offer ID:", offer.id);
      console.log("Token:", token);
  
      const response = await fetch(`http://localhost:6969/api/offer/delete?id=${offer.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response; // Parse the response if applicable
      console.log("Delete Response:", data);
      
      window.location.reload();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  }, [offer.id, token]);
  

  const isWide = sizeType === "wide";

  return (
    <Link
      href={`/offer/${offer.id}`}
      className={themeChangerDescriptionString(
        theme,
        `bg-[#ffffff] hover:shadow shadow-amber-50 group relative`,
        `bg-[#1e1f20] hover:shadow hover:shadow-gray-500 group relative`,
        `${isWide ? "max-w-6xl w-full max-h-[280px] min-h-[280px] flex" : "max-w-sm min-h-[522px] max-h-[522px] flex flex-col"} rounded overflow-hidden`
      )}
    >
      {/* Image Section */}
      <div
        className={`relative`}
        style={{ width: isWide ? "370px" : "100%", height: isWide ? "280px" : "160px" }}
      >
        <Image
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={offer.photo}
          alt="Offer image"
          layout="fill"
        />
      </div>

      {/* Content Section */}
      <div className={`${isWide ? "flex-1 flex flex-col p-6" : "px-6 py-4 flex-grow"} ${theme === "dark" ? "text-white" : "text-black"}`}>
        <div className="flex items-center mb-4">
          {/* Profile Section */}
          <div
            className="relative flex items-center mr-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href={`/user/${offer.author.username}`} className="block">
              <Image
                className={`rounded-full overflow-hidden ${isWide ? "h-10 w-10" : "h-8 w-8"} object-cover hover:drop-shadow-sm hover:shadow-[#016960] transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
                src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                alt="Profile"
                width={40}
                height={40}
              />
            </Link>

            {isHovered && (
              <Link href={`/user/${offer.author.username}`} className="block">
                <div
                  className={themeChangerDescriptionString(
                    theme,
                    "bg-white shadow-lg",
                    "bg-[#292a2b]",
                    "absolute left-0 top-12 w-[250px] h-[120px] p-4 border rounded-lg z-10 opacity-100 transition-opacity duration-300 flex flex-col justify-between"
                  )}
                >
                  <div className="flex">
                    <Image
                      className="rounded-full h-10 w-10 object-cover mb-4"
                      src={offer.author.userPfp || "https://braverplayers.org/wp-content/uploads/2022/09/blank-pfp.png"}
                      alt="Profile Preview"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className={themeChangerDescriptionString(theme, "text-black", "text-white", "text-[12px] text-center px-2")}>
                        {offer.author.username || "Unknown User"}
                      </p>
                      <p className={themeChangerDescriptionString(theme, "text-black", "text-white", "text-16px px-2")}>
                        {offer.author.name || "Mr. Nobody"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineEmail className="flex-shrink-0" color={themeChangerDescriptionString(theme, "black", "white")} />
                    <p className={themeChangerDescriptionString(theme, "text-black", "text-white", "line-clamp-1 text-[12px] px-1 text-center overflow-hidden text-ellipsis")}>
                      {offer.author.email || "No email available"}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* User Info */}
          <div className={themeChangerDescriptionString(theme, "text-black", "text-gray-50", "flex-1 flex items-center hover:text-[#016960]")}>
            {offer.author.username}, {offer.author.userAge}
          </div>

          {/* Creation Date */}
          <div className={themeChangerDescriptionString(theme, "text-black", "text-gray-50", "text-xs italic")}>
            {offer.creationDate && offer.creationDate.substring(0, 16)}
          </div>

          {/* Trash Bin */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent link navigation
              e.stopPropagation(); // Stop event bubbling to the parent link
              handleTrashClick(); // Call the delete function
            }}
            className="absolute top-2 right-2 w-6 h-6"
          >
            <CiTrash
              className={themeChangerDescriptionString(
                theme,
                "text-black hover:text-red-500 transition-colors duration-200",
                "text-gray-50 hover:text-red-500 transition-colors duration-200",
                "hover:z-50"
              )}
              />
          </button>
        </div>

        {/* Title and Description */}
        <div className="flex-grow">
          <div 
            className={themeChangerDescriptionString(
              theme,
              "text-gray-700",
              "text-gray-300",
              `
                mb-2 line-clamp-2 
                font-bold 
                ${isWide ? "text-xl" : "text-[16px]"}
              `
            )}
          >
            {offer.title}
          </div>
          <p
            className={themeChangerDescriptionString(
              theme,
              "text-gray-700",
              "text-gray-300",
              `${isWide ? "text-base line-clamp-4" : "text-[14px] line-clamp-[8]"}`
            )}
          >
            {offer.body}
          </p>
        </div>
      </div>

      {/* Tags Section */}
      <div className={`flex ${isWide && "flex-col"} gap-2 px-6 pb-4 items-center justify-center`}>
        <Link
          href={`?location=${offer.country}`}
          className={themeChangerDescriptionString(
            theme,
            "bg-gray-500 text-gray-50 hover:bg-gray-300",
            "bg-[#0d0f13] text-gray-300 hover:bg-black",
            "text-sm font-medium px-3 py-1 rounded-full transition-all"
          )}
        >
          {offer.country}
        </Link>

        <Link
          href={`?location=${offer.region}`}
          className={themeChangerDescriptionString(
            theme,
            "bg-gray-500 text-gray-50 hover:bg-gray-300",
            "bg-[#0d0f13] text-gray-300 hover:bg-black",
            "text-sm font-medium px-3 py-1 rounded-full transition-all"
          )}
        >
          {offer.region}
        </Link>
      </div>
    </Link>
  );
};

export default Card;
