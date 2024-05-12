import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

function Navbar() {
  // Check if access token exists in session storage
  const isLoggedIn = sessionStorage.getItem('accessToken') !== null;
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle logout
  const handleLogout = () => {
    // Remove access token from session storage
    sessionStorage.removeItem('accessToken');
    // Optional: Redirect the user to the login page or any other page after logout
    // navigate('/login'); // Example redirect to login page
  };

  // Function to handle search
  const handleSearch = () => {
    // Navigate to search page with search query in the URL
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };

  // Function to handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
            <input
              type="text"
              placeholder="Search for a space"
              className="bg-gray-200 rounded-md py-1 px-2 ml-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={searchQuery}
              onChange={handleChange}
            />
            <button onClick={handleSearch} className="bg-gray-200 rounded-md py-1 px-2 ml-2 focus:outline-none focus:ring-2 focus:ring-gray-800">Search</button>
          </div>
          <ul className="hidden lg:flex space-x-4">
            <li><a href="/" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="example.com" className="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="/newProp" className="text-gray-600 hover:text-gray-800">Add Listing</a></li>
            <li>
              {isLoggedIn ? (
                <a href="/login" onClick={handleLogout} className="text-gray-600 hover:text-gray-800">Logout</a>
              ) : (
                <a href="/login" className="text-gray-600 hover:text-gray-800">Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
