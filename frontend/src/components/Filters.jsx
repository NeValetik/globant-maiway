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
import TextField from "@mui/material/TextField"

const Filters = () => {

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [before, setBefore] = useState(dayjs("20-10-1999", "DD-MM-YYYY"));
  const [after, setAfter] = useState(dayjs("20-10-1999", "DD-MM-YYYY"));

  const navigate = useNavigate();

  const color = "#c44242";

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search?location=${location}&region=${region}&before=${before.format('DD-MM-YYYY') === "Invalid Date"?null : before.format('DD-MM-YYYY')}&after=${after.format('DD-MM-YYYY')=== "Invalid Date"?null: after.format('DD-MM-YYYY')}`);
    window.location.reload();
  };

  useEffect(() => {
    setCountries(locationsData);
  }, []);

  return (
    <form className={themeChangerDescriptionString(
      theme,
      'bg-[#ffffff]',
      'bg-[#1e1f20]',"max-h-screen px-4 sticky top-10 rounded-sm mr-6 pt-6 pb-4 -ml-2")} onSubmit={handleSubmit}>
      <div className="mb-4">
        <select
          id="country"
          value={location || ''}
          onChange={(e) => {
            const selectedCountry = countries.find((country) => country.code === e.target.value);
            setLocation(selectedCountry.code);
            setRegions(selectedCountry.regions || []);
          }}
          className={themeChangerDescriptionString(
            theme,
            'bg-[#ffffff] border-amber-50 text-gray-700',
            'bg-[#212223] border-gray-500 text-white'," p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500")}
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
          className={themeChangerDescriptionString(
            theme,
            'bg-[#ffffff] border-amber-50 text-gray-700',
            'bg-[#212223] border-gray-500 text-white'," p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500")}>
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
            slotProps={{
              textField: {
                size: 'small',
                sx: {
                  '& .MuiInputBase-input': {
                    color: theme==="light"? 'black' : "white",
                  },
                  '& .MuiInputLabel-root': {
                    color: theme==="light"? 'black' : "white",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                },
              },
              openPickerIcon: { 
                sx: { 
                  color: theme==="light"? 'black' : "white",  // This will make the icon white
                }
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className='mb-4 text-gray-200'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="After Date"
            value={after}
            onChange={(newAfter) => setAfter(newAfter)}
            slotProps={{
              textField: {
                size: 'small',
                sx: {
                  '& .MuiInputBase-input': {
                    color: theme==="light"? 'black' : "white",
                  },
                  '& .MuiInputLabel-root': {
                    color: theme==="light"? 'black' : "white",
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme==="light"? 'black' : "white",
                  },
                },
              },
              openPickerIcon: { 
                sx: { 
                  color: theme==="light"? 'black' : "white",  // This will make the icon white
                }
              },
            }}
            />
        </LocalizationProvider>
      </div>
      <div className='flex mb-2'>
        <button type="submit" className={themeChangerDescriptionString(theme, 'hover:bg-[#067a89] bg-mwlightgreen ',
                    'bg-[#067a89] hover:bg-[#07b2a0] text-white',
                    'text-gray-200 focus:ring-4' +
                    ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-auto py-2')}>Submit</button>
        <button className={themeChangerDescriptionString(theme, 'hover:bg-[#067a89] bg-mwlightgreen ',
                    'bg-[#067a89] hover:bg-[#07b2a0] text-white',
                    'text-gray-200 focus:ring-4' +
                    ' focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mx-auto py-2')}>Refresh</button>
      </div>
    </form>
  );
};

export default Filters;