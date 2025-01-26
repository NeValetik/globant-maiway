'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import themeChangerDescriptionString from './utils/themeChangerDescriptionString';
import { useRouter } from 'next/navigation';
import Filters from './Filters';
import { FaFilter, FaSearch } from 'react-icons/fa';

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);

  const { theme } = useTheme();
  const router = useRouter();

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (search) queryParams.append('query', search);
    if (location) queryParams.append('location', location);
    if (region) queryParams.append('region', region);
    if (before) queryParams.append('before', before);
    if (after) queryParams.append('after', after);

    const queryString = queryParams.toString();
    router.push(`/search${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="w-[1024px] ml-auto my-5 px-3">
          <label
            htmlFor="default-search"
            className={themeChangerDescriptionString(
              theme,
              'mb-2 text-sm font-medium text-gray-900 sr-only',
              'mb-2 text-sm font-medium text-white sr-only bg-[#282a2c]'
            )}
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-blue-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              name="search"
              id="default-search"
              className={themeChangerDescriptionString(
                theme,
                'text-gray-900 border-gray-300 bg-gray-50 border',
                'text-gray-100 bg-[#282a2c]',
                'block w-full p-4 ps-10 text-sm rounded-lg'
              )}
              placeholder="Search offers, users, meaning of life..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className={themeChangerDescriptionString(
                theme,
                'hover:bg-mwdarkgreen bg-mwlightgreen',
                'bg-mwdarkgreen hover:bg-mwlightgreen text-white',
                'text-white absolute end-2.5 bottom-2.5 transition-all focus:outline-none font-semibold rounded-lg text-sm px-4 py-2'
              )}
            >
              <FaSearch size={19} />
            </button>
          </div>
        </div>
        <div className="flex justify-end py-2 mr-auto my-5">
          <button
            type="button"
            className={themeChangerDescriptionString(
              theme,
              'hover:bg-mwdarkgreen bg-mwlightgreen',
              'bg-mwdarkgreen hover:bg-mwlightgreen',
              'text-white focus:outline-none font-medium rounded-lg text-sm px-4 transition-all'
            )}
            onClick={toggleFilters}
          >
            <FaFilter
              size={19}
              className={themeChangerDescriptionString(theme, 'gray-300', 'white')}
            />
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="flex justify-end mb-7">
          <div className="w-1/4 absolute z-50">
            <Filters
              location={location}
              setLocation={setLocation}
              region={region}
              setRegion={setRegion}
              before={before}
              setBefore={setBefore}
              after={after}
              setAfter={setAfter}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Search;
