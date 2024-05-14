import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            <img src={product.imgurl} alt={product.title} className="w-full h-64 object-cover" />
            <div className="px-6 py-4 flex flex-col flex-grow">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <div className="flex-grow"></div> {/* This div will push the price and area to the bottom */}
                <div className="mt-10 flex justify-between">
                    <p className="text-gray-700 text-base">Rs {product.price}</p>
                    <p className="text-gray-700 text-base">{product.area} sqft</p>
                </div>
                <button
                    className="mt-5 w-full text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    View Details
                </button>
                {/* You can add more details here */}
            </div>
        </div>
    );
};

export default ProductCard;
