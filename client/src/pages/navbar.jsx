import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="example.com" className="text-xl font-bold text-gray-800">Smart Spaces</a>
          <div className="flex">
            <button className="block lg:hidden focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <input type="text" placeholder="Search for a space" className="bg-gray-200 rounded-md py-1 px-2 ml-2 focus:outline-none focus:ring-2 focus:ring-gray-800" />
          </div>
          <ul className="hidden lg:flex space-x-4">
            <li><a href="example.com" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="example.com" className="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="example.com" className="text-gray-600 hover:text-gray-800">Services</a></li>
            <li><a href="example.com" className="text-gray-600 hover:text-gray-800">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;