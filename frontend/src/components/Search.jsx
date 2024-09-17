import React, {useState} from 'react';
import ThemeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import {useTheme} from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";


const Search = () => {

  const {theme, toggleTheme} = useTheme();
  const [search,setSearch] = useState("");

  const handleSubmit = async e => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    console.log("Search value from state:", search);
    // Read the form data
    const formData = {
      "search":search
    };
    window.href = `/query?=${search}`;
    console.log(formData);
    // Or you can work with it as a plain object:
    fetch('http://localhost:6969/api/offer/sendData', {
      method: 'POST', // or 'GET' for fetching data
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(formData), // Convert data to JSON
    })
      .then(response => {console.log(response.json())}) // Handle the response
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
      <form className="max-w-screen-lg mx-auto my-5" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className={ThemeChangerDescriptionString(theme,
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
                 className={ThemeChangerDescriptionString(theme,
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
  );
};

export default Search;