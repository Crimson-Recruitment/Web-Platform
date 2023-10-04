import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    
<footer className="bg-[#8B0000] shadow">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
                <img src="" className="h-8 text-white mr-3" alt="Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Crimson Recruitment</span>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">© 2023 All Rights Reserved.</span>
    </div>
</footer>


  );
}
