// ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router

const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details based on the ID
        // Example: Fetch product details from an API
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    {/* Display other product details */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductPage;
