import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import Navbar from './navbar';
import PropCard from './propCard';

function Home() {
  const [prop, setProp] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/listings/usr/${sessionStorage.getItem('userid')}`)
      .then(response => {
        // Assuming the response data is an array
        setProp(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mt-8 mb-4">My Listings</h1>
        <div className="mb-4 flex justify-end">
          <Link to="/newProp" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Add New Listing</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prop.map(product => (
            <a key={product.id} href={`/prop/${product.id}`}>
              <PropCard product={product} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
    