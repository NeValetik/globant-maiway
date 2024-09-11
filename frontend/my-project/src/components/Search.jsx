import React, { useState } from 'react';


const Search = () => {
  // const [srch, setSrch] = useState("");
//   const [userPfp,setUserPfp] = useState("");

// const handleUser = async e => {
//   setSrch("Pivo")
//   console.log(srch);
//   // if (user){//This should be modified
//   //   setUserPfp("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS3l4ZjaN7cVwzh-ISmjRTpyjgePCZ_BqJ6w&s")
//   // }
// };

  const handleSubmit = async e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
  }


  return (
    <form className="max-w-screen-lg mx-auto my-5" onSubmit={handleSubmit}>   
      <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" name="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" className="text-gray-700 absolute end-2.5 bottom-2.5 bg-indigo-300 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-300 dark:hover:bg-indigo-400 dark:focus:ring-blue-300">Search</button>
      </div>
    </form>
  );
};

export default Search;