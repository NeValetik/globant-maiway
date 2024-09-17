import React, { useState, useEffect } from 'react';
import headerLogoBlack from '../assets/header_logo_black.png'
import headerLogoWhite from '../assets/header_logo_white.png'
import {useTheme} from "../context/ThemeContext";
import ThemeToggler from "./ThemeTogglerButton";
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";

const Navbar = () => {
  const [user, setUser] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userPfp,setUserPfp] = useState("");

  const {theme, toggleTheme} = useTheme()

  const handleCascade = async e =>{
    setDropdownVisible(true)
  }
  const handleBlur = async e =>{
    setDropdownVisible(false) 
  }

  const handleUser = async e => {
    setUser(!user)//TODO: JWT. Here there is need to work with the jwt tokens to get the account data from the user if he is logged
    if (user){//This should be modified
      setUserPfp("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS3l4ZjaN7cVwzh-ISmjRTpyjgePCZ_BqJ6w&s")
    }
  };

  return (
    <header className={themeChangerDescriptionString(theme, 'bg-[#fcfcfc] text-black shadow-[0_0px_0.3px_rgb(0,0,0,0.2)]', 'bg-[#1b1b1b] text-white')}>
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8 bg-[#000000]'`}
        aria-label="Header"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              className="h-12 w-auto"
              src={theme === 'light' ? headerLogoBlack : headerLogoWhite}
              alt="insert header logo psl"
            />
          </a>
          <a href="#"
             className={`py-3 text-3xl font-mono font-bold leading-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-50'} ml-4`}>
            Măi Way
          </a>
        <div className='pt-1.5 text-3xl font-mono font-bold leading-6'>
          <ThemeToggler/>
        </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:space-x-8 lg:justify-end">
          {user ? (
              <>
                <a
                    href="#"
                onClick={handleUser}
                className={themeChangerDescriptionString(theme, 'py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500', 'py-2 text-sm font-semibold leading-6 text-white hover:text-gray-100')}
              >
                Log in
              </a>
              <a
                href="#"

                onClick={handleUser}
                  // hover:bg-[#016960] bg-[#629a8d]

                className={themeChangerDescriptionString(theme, 'text-white bg-[#629a8d] hover:bg-[#016960]', 'hover:bg-[#629a8d] bg-[#016960]',
                    'block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-white')}
              >
                Sign up
              </a>
            </>
          ) : (
            <>
            <a className={themeChangerDescriptionString(theme, 'text-white bg-[#629a8d] hover:bg-[#016960]', 'hover:bg-[#629a8d] bg-[#016960]',
                    'block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-white')}> Travel </a>
            <div className="relative">
              <img
                className="rounded-full h-11 w-11 cursor-pointer"
                tabIndex="0"
                onFocus={handleCascade}
                onBlur={handleBlur}
                src={
                  userPfp ||
                  "https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg"
                }
                alt=""
                />
              {isDropdownVisible && (
                <div className={themeChangerDescriptionString(theme, ' bg-gray-300 hover:bg-gray-400', 'hover:bg-gray-500 bg-gray-600',
                  "absolute left-0 mt-2 z-50 divide-y divide-gray-200 rounded-lg shadow w-44")}>
                  <ul
                    className="py-2 text-sm text-gray-800 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                    >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                        Sign out
                      </a>
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

// hover:bg-[#016960] bg-[#629a8d]

export default Navbar;