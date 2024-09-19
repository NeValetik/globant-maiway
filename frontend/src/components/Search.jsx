import React, {useState} from 'react';
import {useTheme} from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import {FaFilter} from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";

const Search = () => {


  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };


  const {theme, toggleTheme} = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    let queryParams = [];
    if (search) {
      queryParams.push(`query=${search}`);
    }
    if (location) {
      queryParams.push(`location=${location}`);
    }
    if (region) {
      queryParams.push(`region=${region}`);
    }
    if (before) {
      queryParams.push(`before=${before.format('DD-MM-YYYY')}`);
    }
    if (after) {
      queryParams.push(`after=${after.format('DD-MM-YYYY')}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : "";
    navigate(`/search${queryString}`);

    window.location.reload();
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <div className="w-[1024px] ml-auto my-5 px-3" >
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
                  onChange={e => setSearch(e.target.value)}/>
            <button type="submit"

                    className={themeChangerDescriptionString(theme, 'hover:bg-[#067a89] bg-mwlightgreen',
                        'bg-[#067a89] hover:bg-[#07b2a0] text-white',
                        'text-white absolute end-2.5 bottom-2.5 focus:ring-4 ' +
                        ' focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-4 py-2  ')}>
              <FaSearch size={19} />
            </button>
          </div>
        </div>
        <div className="flex justify-end py-2 mr-auto my-5 ">
          <button type="button" className={themeChangerDescriptionString(theme, 'hover:bg-mwdarkgreen bg-mwlightgreen',
                      'bg-mwdarkgreen hover:bg-mwlightgreen text-white',
                      'text-gray-200' +
                      ' focus:outline-none font-medium rounded-lg text-sm px-4')} onClick={toggleFilters}>
            <FaFilter size={19} className={themeChangerDescriptionString(theme,
            'gray-300','white', ) }/>
          </button>
        </div>
      </div>
      {showFilters ? 
        <div className="w-1/4">
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
      : null}
    </form>
  );
};

export default Search;

// bg-[#07b2a0] hover:bg-[#067a89]