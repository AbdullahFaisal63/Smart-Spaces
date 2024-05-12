import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import PropCard from './propCard';

function Search() {
  const [prop, setProp] = useState([]);
  const { query } = useParams();
  console.log(query)

  useEffect(() => {
    axios.get(`http://localhost:3001/listings/search/${query}`)
      .then(response => {
        // Assuming the response data is an array
        setProp(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [query]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  if(prop[0]){
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center py-4">Search results</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {prop.map(product => (
            <a key={product.id} href={`/prop/${product.id}`}>
              <PropCard product={product} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )}
  else{
    return(
        <div>
      <Navbar />
      <h1 className="flex justify-center py-4">No results found!</h1>
    </div>
    )
  }
}

export default Search;