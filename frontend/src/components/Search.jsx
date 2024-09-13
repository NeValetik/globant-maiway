import React from 'react';
import ThemeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import {useTheme} from "../context/ThemeContext";


const Search = () => {

  const {theme, toggleTheme} = useTheme()

  const handleSubmit = async e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    fetch('http://localhost:6969/api/sendData', {
      method: 'POST', // or 'GET' for fetching data
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(form), // Convert data to JSON
    })
      .then(response => response.json()) // Handle the response
      .then(data => {
        console.log('Success:', form);
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
                 placeholder="Search offers, users, meaning of life..." required/>
          <button type="submit"
                  className="text-gray-700 absolute end-2.5 bottom-2.5 bg-indigo-200 hover:bg-indigo-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search
          </button>
        </div>
      </form>
  );
};

export default Search;