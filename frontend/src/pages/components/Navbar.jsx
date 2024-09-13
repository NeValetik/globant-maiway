import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [user, setUser] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userPfp,setUserPfp] = useState("");

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
    <header className="">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Header"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img
              className="h-12 w-auto"
              src="https://i.ibb.co/DDb9pyC/photo-2024-09-11-20-05-50.jpg"
              alt=""
            />
          </a>
          <a href="#">
            <div className="py-3 text-xl font-mono font-bold leading-6 text-gray-700 ml-4">
              TravelBuddy
            </div>
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:space-x-8 lg:justify-end">
          {user ? (
            <>
              <a
                href="#"
                onClick={handleUser}
                className="py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500"
              >
                Log in
              </a>
              <a
                href="#"
                onClick={handleUser}
                className="block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-gray-700 bg-indigo-200 hover:bg-indigo-300"
              >
                Sign up
              </a>
            </>
          ) : (
            <div className="relative">
              {/* Parent container with `relative` class */}
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
                <div className="absolute left-0 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
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
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;