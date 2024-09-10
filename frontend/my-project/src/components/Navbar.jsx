import React, { useState,useEffect } from 'react';
import axios from "axios";


const Navbar = () => {
  const [user, setUser] = useState(true);

  const handleUser = async e => {
    // e.preventDefault();
    // const user = { username:"piv", password:"voo" };
    // send the username and password to the server
    // const response = await axios.post({/*'https://your-vercel-app.vercel.app/api/login' PUT HERE A VALID API KEY*/}, {
    //     username: "piv",
    //     password: "voo"
    //   });
    // set the state of the user
    setUser(!user)
    // store the user in localStorage
    // localStorage.setItem('user', response.data)
    // console.log(response.data)
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  return (
    <header class="bg-gray-100">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-12 w-auto" src="https://i.ibb.co/yVV1bfW/photo-2024-09-06-18-24-29.jpg" alt=""></img>
          </a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:space-x-8 lg:justify-end">
          {/* <a href="#" class="py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500">Prod */}
          {user ?<>
          <a href="#" onClick={handleUser} class="py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500">Sign up</a>
          <a href="#" onClick={handleUser} class="block rounded-lg py-2 pl-6 pr-6 text-sm font-semibold leading-7 text-gray-700 bg-indigo-200 hover:bg-indigo-300 ">Log in</a></>:
          <img class="rounded-full h-11  w-auto" src="https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg" alt=""></img>}{/* here there is a need in the dinamic recieving of user profile */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;