import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import MyProductCard from './myPropCard';
import Footer from './footer';

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
  }, []);

  // Function to handle deletion of a card
  const handleDelete = (productId) => {
    // Filter out the deleted product from the state
    setProp(prevProp => prevProp.filter(item => item.id !== productId));
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        <h1 className="mt-20 mb-12 flex justify-center py-4 text-3xl font-bold">My Listings</h1>
        <div className="mb-4 flex justify-end">
          <Link to="/newProp" className="text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add New Listing
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prop.map(product => (
            <MyProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
