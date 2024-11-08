import React, { useEffect, useState } from 'react';
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
// import locationsData from '../assets/locations.json';

import {useTheme} from "../context/ThemeContext";


const Tags = ({ classNamePos = "", classNameBody = "", tags }) => {
	const [countries, setCountries] = useState([]);
	const { theme, toggleTheme } = useTheme();
  
	useEffect(() => {
	  const fetchCountries = async () => {
		try {
		  const response = await fetch("http://localhost:6969/api/location/getCountriesJson");
		  if (response.ok) {
			const data = await response.json();
			setCountries(data.countries || []);  // Ensure it's an array
		  } else {
			console.error("Failed to fetch countries");
		  }
		} catch (error) {
		  console.error("Error fetching countries:", error);
		}
	  };
	  fetchCountries();
	}, []);
  
	const country = countries.find((c) => c.code === tags.location);
	const region = country?.regions?.find((r) => r.code === tags.region);
  
	return (
	  <div className={classNamePos || "px-6 py-2 mt-auto"}>
		{country ? (
		  <span className={classNameBody || "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"}>
			{country.name || "Unknown Country"}
		  </span>
		) : null}
		
		{region ? (
		  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{region.name || "Unknown Region"}
		  </span>
		) : null}
	  </div>
	);
};
  
export default Tags;