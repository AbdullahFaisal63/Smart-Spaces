import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
import PropCard from './propCard';

function Home() {
  const [prop, setProp] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/listings')
      .then(response => {
        // Assuming the response data is an array
        setProp(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <h1 className="mt-20 mb-12 flex justify-center py-4 text-3xl font-bold">Featured Spaces</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {prop.map(product => (
              <a key={product.id} href={`/prop/${product.id}`} className="h-full">
                <PropCard product={product} className="h-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
