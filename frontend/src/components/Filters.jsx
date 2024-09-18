import React, { useState, useEffect } from 'react';
import { useTheme } from "../context/ThemeContext";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { useNavigate } from 'react-router-dom';
import locationsData from '../assets/locations.json';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';  // Import Dayjs

const Filters = () => {

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [before, setBefore] = useState(dayjs("20-10-1999", "DD-MM-YYYY"));
  const [after, setAfter] = useState(dayjs("20-10-1999", "DD-MM-YYYY"));

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search?query=null&location=${location}&region=${region}&before=${before.format('DD-MM-YYYY')}&after=${after.format('DD-MM-YYYY')}`);
    window.location.reload();
  };

  useEffect(() => {
    setCountries(locationsData);
  }, []);

  return (
    <form className="max-h-screen px-4 bg-gray-300 sticky top-10 rounded-sm mr-6 pt-6 pb-4 -ml-2" onSubmit={handleSubmit}>
      <div className="mb-4">
        <select
          id="country"
          value={location || ''}
          onChange={(e) => {
            const selectedCountry = countries.find((country) => country.code === e.target.value);
            setLocation(selectedCountry.code);
            setRegions(selectedCountry.regions || []);
          }}
          className="border border-gray-300 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a country</option>
          {countries.map((selLocation) => (
            <option key={selLocation.code} value={selLocation.code}>
              {selLocation.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          id="region"
          value={region || ''}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a region</option>
          {regions.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Before Date"
            value={before}
            onChange={(newBefore) => setBefore(newBefore)}
          />
        </LocalizationProvider>
      </div>
      <div className='mb-4 '>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="After Date"
            value={after}
            onChange={(newAfter) => setAfter(newAfter)}
            className='text-white'
          />
        </LocalizationProvider>
      </div>
      <div className='flex mb-2'>
        <button className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d] ',
                    'bg-[#016960] hover:bg-[#629a8d] text-white',
                    'text-gray-200 focus:ring-4' +
                    ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mx-auto py-2')}>Submit</button>
        <button className={themeChangerDescriptionString(theme, 'hover:bg-[#016960] bg-[#629a8d] ',
                    'bg-[#016960] hover:bg-[#629a8d] text-white',
                    'text-gray-200 focus:ring-4' +
                    ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 mx-auto py-2')}>Refresh</button>
      </div>
    </form>
  );
};

export default Filters;