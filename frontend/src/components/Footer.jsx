import React from 'react';
import themeChangerDescriptionString from "./utils/themeChangerDescriptionString";
import {useTheme} from "../context/ThemeContext";


import {
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare,
  } from 'react-icons/fa';

const Footer = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className='mt-auto'>
      <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
        <div>
          <h1 className='w-full text-3xl font-bold text-indigo-500'>Mai Way</h1>
          <p className={themeChangerDescriptionString(theme, 'py-4 text-gray-400', 'py-4 text-white')}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.</p>
          <div className={themeChangerDescriptionString(theme, 'flex justify-between md:w-[75%] my-6 text-gray-400', 'flex justify-between md:w-[75%] my-6 text-white')}>
              <a><FaFacebookSquare size={30}/></a>
              <a><FaInstagram size={30} /></a>
              <a><FaTwitterSquare size={30} /></a>
              <a><FaGithubSquare size={30} /></a>
          </div>
        </div>
        <div className='lg:col-span-2 flex justify-between mt-6'>
          <div >
            <h6 className={themeChangerDescriptionString(theme, 'font-medium text-gray-500', 'font-medium text-gray-200')}>Solutions</h6>
            <ul className={ themeChangerDescriptionString(theme, 'py-2 text-sm font-semibold leading-6 text-gray-400', 'py-2 text-sm font-semibold leading-6 text-white')}>
                <li className='py-2 text-sm'>Analytics</li>
                <li className='py-2 text-sm'>Marketing</li>
                <li className='py-2 text-sm'>Commerce</li>
                <li className='py-2 text-sm'>Insights</li>
            </ul>
          </div>
          <div>
            <h6 className={themeChangerDescriptionString(theme, 'font-medium text-gray-500', 'font-medium text-gray-200')}>Support</h6>
            <ul className={ themeChangerDescriptionString(theme, 'py-2 text-sm font-semibold leading-6 text-gray-400', 'py-2 text-sm font-semibold leading-6 text-white')}>
                <li className='py-2 text-sm '>Pricing</li>
                <li className='py-2 text-sm'>Documentation</li>
                <li className='py-2 text-sm'>Guides</li>
                <li className='py-2 text-sm'>API Status</li>
            </ul>
          </div>
          <div>
            <h6 className={themeChangerDescriptionString(theme, 'font-medium text-gray-500', 'font-medium text-gray-200')}>Company</h6>
            <ul className={ themeChangerDescriptionString(theme, 'py-2 text-sm font-semibold leading-6 text-gray-400', 'py-2 text-sm font-semibold leading-6 text-white')}>
                <li className='py-2 text-sm'>About</li>
                <li className='py-2 text-sm'>Blog</li>
                <li className='py-2 text-sm'>Jobs</li>
                <li className='py-2 text-sm'>Press</li>
                <li className='py-2 text-sm'>Careers</li>
            </ul>
          </div>
          <div>
            <h6 className={themeChangerDescriptionString(theme, 'font-medium text-gray-500', 'font-medium text-gray-200')}>Legal</h6>
            <ul className={ themeChangerDescriptionString(theme, 'py-2 text-sm font-semibold leading-6 text-gray-400', 'py-2 text-sm font-semibold leading-6 text-white')}>
                <li className='py-2 text-sm'>Claim</li>
                <li className='py-2 text-sm'>Policy</li>
                <li className='py-2 text-sm'>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;