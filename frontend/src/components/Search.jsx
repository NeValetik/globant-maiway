import React, {useState} from 'react';
import {useTheme} from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { useNavigate } from 'react-router-dom';
// import Filters from './Filters';
import {FaFilter} from 'react-icons/fa';

const Search = ({ toggleFilters }) => {

  const {theme, toggleTheme} = useTheme();
  const [search,setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    navigate(`/search?query=${search}`);

    window.location.reload();
    // console.log("Search value from state:", search);
    // // Read the form data
    // const formData = {
    //   "search":search
    // };
    // console.log(formData);
    // // Or you can work with it as a plain object:
    // fetch('http://localhost:6969/api/offer/', {
    //   method: 'POST', // or 'GET' for fetching data
    //   headers: {
    //     'Content-Type': 'application/json', // Specify the content type
    //   },
    //   body: JSON.stringify(formData.search), // Convert data to JSON
    // })
    //   .then(response => {console.log(response.json())}) // Handle the response
    //   .then(data => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  }
  const handleClick = (e) =>{
    e.preventDefault();
    navigate(`/filter`);
  }


  return (
    <div className='flex'>
      <form className="w-[1024px] ml-auto my-5 px-3" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className={themeChangerDescriptionString(theme,
            'mb-2 text-sm font-medium text-gray-900 sr-only',
            'mb-2 text-sm font-medium text-white sr-only bg-[#282a2c]')}>Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className=" w-4 h-4 text-blue-500 dark:text-gray-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" name="search" id="default-search"
                 className={themeChangerDescriptionString(theme,
                     "text-gray-900 border-gray-300 bg-gray-50 border",
                     "text-gray-100 bg-[#282a2c] border border-gray-950",
                     "block w-full p-4 ps-10 text-sm rounded-lg")}
                 placeholder="Search offers, users, meaning of life..."
                 value={search} // Bind input value to state
                 onChange={e => setSearch(e.target.value)} required/>
          <button type="submit"

                  className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d] ',
                      'bg-[#016960] hover:bg-[#629a8d] text-white',
                      'text-gray-200 absolute end-2.5 bottom-2.5 focus:ring-4' +
                      ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  ')}>
            Search
          </button>
        </div>
      </form>
      <div className="flex justify-end py-2 mr-auto my-5 ">
        <button className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d] ',
                    'bg-[#016960] hover:bg-[#629a8d] text-white',
                    'text-gray-200 focus:ring-4' +
                    ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4')} onClick={toggleFilters}>
          <FaFilter size={19} className={themeChangerDescriptionString(theme,
          'gray-300','white', ) }/>
        </button>
      </div>
    </div>
  );
};

export default Search;