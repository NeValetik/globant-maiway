import React, {useState} from 'react';
import {useTheme} from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { useNavigate } from 'react-router-dom';
import {
	FaFilter
} from 'react-icons/fa';

const Filters = () => {

  const {theme, toggleTheme} = useTheme();
  const [search,setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    navigate(`/search?query=${search}`);

    window.location.reload();
  }


  return (
      <form className="mr-auto my-5 " onSubmit={handleSubmit}>
				<div className="flex justify-end pt-2">
					<button className={themeChangerDescriptionString(theme, 'hover:bg-mwdarkgreen bg-mwlightgreen',
                      'bg-mwdarkgreen hover:bg-mwlightgreen text-white',
                      'text-gray-200 focus:ring-4' +
                      ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  ')}>
						<FaFilter size={19} className={themeChangerDescriptionString(theme,
            'gray-300','white') }/>
					</button>
				</div>
      </form>
  );
};

export default Filters;