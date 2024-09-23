import React, { useState } from 'react';
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import locationsData from '../assets/locations.json';

import {useTheme} from "../context/ThemeContext";


const Tags = ({classNamePos = "",classNameBody = "",tags}) => {
const [countries] = useState(locationsData)
const {theme, toggleTheme} = useTheme()
console.log(classNameBody,classNamePos)
return (
	<div className={classNamePos === "" ? "px-6 py-2 mt-auto":`${classNamePos}`}>
		{tags.region!=null ?
		<span className={classNameBody === "" ?"inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2":`${classNameBody}`}>
			{countries.find((country) => country.code === tags.location).name}
		</span>
		:null}
		{/* {tags.location!=null ?
		<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{countries.find((country) => country.code === tags.location).regions.find((region) => region.code === tags.region).name}
		</span>
		:null} */}
	</div>
);
};

export default Tags;