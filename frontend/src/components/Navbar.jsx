import React, { useState, useEffect, useContext, useRef } from 'react';
import headerLogoBlack from '../assets/header_logo_black.svg';
import headerLogoWhite from '../assets/header_logo_white.svg';
import { useTheme } from "../context/ThemeContext";
import { JWTContext } from "../context/JWTContext";
import ThemeToggler from "./ThemeTogglerButton";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import { Link } from 'react-router-dom';
import BlankPfp from '../assets/blank-pfp.png'


const Navbar = () => {
  const { token, userId, clearToken, authUserPhoto, isAuthenticated } = useContext(JWTContext);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const [userPfp, setUserPfp] = useState(authUserPhoto);

  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  const handleCascade = async e => {
    setDropdownVisible(true);
  };

  const handleBlur = async e => {
    // Check if the element losing focus is inside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setDropdownVisible(false);
    }
  };

  console.log(userId)

  return (
    <header className={themeChangerDescriptionString(theme,
      'bg-[#fcfcfc] text-black shadow-[0_0px_0.3px_rgb(0,0,0,0.2)]',
      'bg-[#1b1b1b] text-white')}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8`} aria-label="Header">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src={theme === 'light' ? headerLogoBlack : headerLogoWhite} alt="Logo" />
          </a>
          <a href="/" className={`py-3 text-3xl font-mono font-bold leading-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-50'} ml-4`}>
            Măi Way
          </a>
          <div className='pt-1.5 text-3xl font-mono font-bold leading-6'>
            <ThemeToggler />
          </div>
        </div>
        <div className="flex flex-1 space-x-8 justify-end">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={themeChangerDescriptionString(
                  theme,
                  'py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500',
                  'py-2 text-sm font-semibold leading-6 text-white hover:text-gray-100'
                )}
              >
                Log in
              </Link>
              <Link
                to="/login"
                className={themeChangerDescriptionString(
                  theme,
                  'text-white bg-mwlightgreen hover:bg-[#067a89]',
                  'hover:bg-lightgreen bg-mwdarkgreen',
                  'block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-white'
                )}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/newoffer"
                className={themeChangerDescriptionString(
                  theme,
                  'text-white bg-[#629a8d] hover:bg-[#016960]',
                  'hover:bg-[#629a8d] bg-[#016960]',
                  'block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-white'
                )}
              >
                Travel
              </Link>
              <div className="relative">
                <img
                  className="h-11 w-11 cursor-pointer rounded-full object-cover "
                  tabIndex="0"
                  onFocus={handleCascade}
                  onBlur={handleBlur}
                  src={authUserPhoto || BlankPfp}
                  alt="User Profile"
                />
                {isDropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className={themeChangerDescriptionString(
                      theme,
                      'bg-gray-300 hover:bg-gray-400',
                      'hover:bg-gray-500 bg-gray-600',
                      'absolute left-0 mt-2 z-50 divide-y divide-gray-200 rounded-lg shadow w-44'
                    )}
                  >
                    <ul className="py-2 text-sm text-gray-800 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white">
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white">
                          Earnings
                        </a>
                      </li>
                      <li>
                        <button onClick={clearToken} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white">
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
