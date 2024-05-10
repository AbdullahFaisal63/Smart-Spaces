import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

const PropPage = () => {
    const { id } = useParams();
    const [prop, setProp] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/listings/${id}`);
                setProp(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // State to keep track of the current image index
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // // Function to handle the next image click
    // const nextImage = () => {
    //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dummyProduct.images.length);
    // };

    // // Function to handle the previous image click
    // const prevImage = () => {
    //     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + dummyProduct.images.length) % dummyProduct.images.length);
    // };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Navbar />
            <div>
                <h1 className="text-3xl font-semibold mb-2">{prop[0].title}</h1>
                {/* Carousel */}
                <div className="relative w-full max-w-md mx-auto">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src='https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt={prop[0].title} className="w-full" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full cursor-pointer">
                        &lt;
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full cursor-pointer">
                        &gt;
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Price: ${prop[0].price}</p>
                    <p className="text-gray-600">Category: {prop[0].propertyType}</p>
                    <p className="text-gray-600">Seller: {prop[0].title}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">{prop[0].description}</p>
                </div>
                <div className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                        Contact Seller
                    </button>
                </div>
                {/* <div className="mb-4">
                    <p className="text-gray-600">Rating: {dummyProduct.rating}/5</p>
                    <p className="text-gray-600">Reviews: {dummyProduct.reviews.length}</p>
                </div> */}
            </div>
        </div>
    );
};

export default PropPage;
