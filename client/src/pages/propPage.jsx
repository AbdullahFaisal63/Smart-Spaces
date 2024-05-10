import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();
    
    // Dummy product data
    const dummyProduct = {
        id: id,
        name: 'Dummy Product',
        price: 100,
        images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://via.placeholder.com/300'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum mauris vitae neque tristique, vel eleifend arcu condimentum. Nulla vel ex non magna consectetur tempor.',
        category: 'Dummy Category',
        seller: 'Dummy Seller',
        rating: 4.5,
        reviews: [
            { id: 1, user: 'User1', rating: 4, comment: 'Good product' },
            { id: 2, user: 'User2', rating: 5, comment: 'Excellent product' },
        ]
    };

    // State to keep track of the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to handle the next image click
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dummyProduct.images.length);
    };

    // Function to handle the previous image click
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + dummyProduct.images.length) % dummyProduct.images.length);
    };

    return (
        <div>
            <div>
                <h1 className="text-3xl font-semibold mb-2">{dummyProduct.name}</h1>
                {/* Carousel */}
                <div className="relative w-full max-w-md mx-auto">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src={dummyProduct.images[currentImageIndex]} alt={dummyProduct.name} className="w-full" />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full cursor-pointer" onClick={prevImage}>
                        &lt;
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full cursor-pointer" onClick={nextImage}>
                        &gt;
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Price: ${dummyProduct.price}</p>
                    <p className="text-gray-600">Category: {dummyProduct.category}</p>
                    <p className="text-gray-600">Seller: {dummyProduct.seller}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">{dummyProduct.description}</p>
                </div>
                <div className="mb-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                        Contact Seller
                    </button>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600">Rating: {dummyProduct.rating}/5</p>
                    <p className="text-gray-600">Reviews: {dummyProduct.reviews.length}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
