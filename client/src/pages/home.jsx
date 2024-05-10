import React from 'react'
import Navbar from './navbar';
import PropCard from './propCard';


function Home() {

  const prop = [{ id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },
  { id: 1, name: 'Home', image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', price: '10cr' },

  ];

  return (
    <div>
      <Navbar />
      {/* <div class="flex h-screen items-center justify-center">
        <div class="flex">Welcome<b>{localStorage.getItem("username")}</b></div>
      </div> */}
      <h1 class="flex justify-center py-4">Featured Spaces</h1>
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
  )
}

export default Home