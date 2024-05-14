import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';
import Footer from './footer';

function NewProp() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Options for property type dropdown
    const propertyTypeOptions = [
        'House',
        'Apartment',
        'Residential Plot',
        'Commercial Plot',
        'Shop',
        'Warehouse',
        'Others'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/listings/${id}`);
                const listingData = response.data[0];
                setTitle(listingData.title);
                setDescription(listingData.description);
                setType(listingData.propertyType);
                setPrice(listingData.price);
                setArea(listingData.area);
                setImageUrl(listingData.imgurl);
                setLocation(listingData.location);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching listing details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/listings/update/${id}`, {
                title,
                description,
                propertyType: type,
                price,
                area,
                imgurl: imageUrl,
                location,
                userId: sessionStorage.getItem('userid')
            });
            // Clear input fields
            setTitle('');
            setDescription('');
            setType('');
            setPrice('');
            setArea('');
            setImageUrl('');
            setLocation('');
            // Show success message
            setShowSuccessMessage(true);
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error listing property:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Render loading state until data is fetched
    }

    return (
        <div>
            <Navbar />
            <div className="mt-20 mb-20 flex justify-center items-center">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl text-center mb-4 font-bold text-gray-800">Update details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="House..."
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="title"
                                        name="title"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter description"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="description"
                                        name="description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="type"
                                        name="type"
                                        required
                                    >
                                        <option value="">Select Property Type</option>
                                        {propertyTypeOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">Area</label>
                                    <input
                                        type="text"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="sqft"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="area"
                                        name="area"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Enter image URL"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="imageUrl"
                                        name="imageUrl"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Lahore"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="location"
                                        name="location"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Rs."
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        id="price"
                                        name="price"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-c6a569 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-c6a569 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </form>
                            {showSuccessMessage && (
                                <div style={{ color: 'green', padding: 20 }}>
                                    Property updated successfully!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NewProp;
