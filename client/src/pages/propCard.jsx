// ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.price}</p>
                {/* You can add more details here */}
            </div>
        </div>
    );
};

export default ProductCard;
