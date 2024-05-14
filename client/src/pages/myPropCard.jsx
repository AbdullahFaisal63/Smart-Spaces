import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ConfirmationPopup from './confirmationPopup'; // Assuming you have a ConfirmationPopup component

const MyProductCard = ({ product, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleDelete = async () => {
        try {
            await axios.get(`http://localhost:3001/listings/del/${product.id}`);
            onDelete(product.id);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            <img src={product.imgurl} alt={product.title} className="w-full h-64 object-cover" />
            <div className="px-6 py-4 flex flex-col flex-grow">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <div className="flex-grow"></div> {/* Pushes price/area and buttons to the bottom */}
                <div className="mt-10 flex justify-between">
                    <p className="text-gray-700 text-base">Rs {product.price}</p>
                    <p className="text-gray-700 text-base">{product.area} sqft</p>
                </div>
                <div className="flex justify-between mt-5">
                    <button
                        onClick={() => setShowConfirmation(true)}
                        className="w-1/2 mr-2 text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Delete
                    </button>
                    <Link
                        to={`/update/${product.id}`}
                        className="w-1/2 ml-2 text-white bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Update
                    </Link>
                </div>
                {showConfirmation && (
                    <ConfirmationPopup
                        message="Are you sure you want to delete this listing?"
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirmation(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default MyProductCard;
