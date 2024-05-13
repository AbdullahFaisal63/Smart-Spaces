// myProductCard.js
import React from 'react';
import axios from 'axios';

const MyProductCard = ({ product, onDelete }) => {
    const handleDelete = async () => {
        try {
            // Make DELETE request to delete the product with its ID
            await axios.get(`http://localhost:3001/listings/del/${product.id}`);
            // Call onDelete function passed from parent component to update UI
            onDelete(product.id);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.imgurl} alt={product.title} className="w-full h-64 object-cover" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <div className="mt-10 flex justify-between">
                    <p className="text-gray-700 text-base">Rs {product.price}</p>
                    <p className="text-gray-700 text-base">{product.area} sqft</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                    Delete
                </button>
                {/* You can add more details here */}
            </div>
        </div>
    );
};

export default MyProductCard;
