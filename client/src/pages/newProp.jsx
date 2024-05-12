import React, { useState } from 'react';
import Navbar from './navbar'
import axios from 'axios';

function NewProp() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/listings/newListing', {
                title,
                description,
                propertyType: type,
                price,
                userId: sessionStorage.getItem('userid')
            });
            // Clear input fields
            setTitle('');
            setDescription('');
            setType('');
            setPrice('');
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

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl text-center mb-4 font-bold text-gray-800">Add New Property</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-input w-full border border-gray-400 rounded py-2 px-3"
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
                                        className="form-input w-full border border-gray-400 rounded py-2 px-3"
                                        id="description"
                                        name="description"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                                    <input
                                        type="text"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="form-input w-full border border-gray-400 rounded py-2 px-3"
                                        id="type"
                                        name="type"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="form-input w-full border border-gray-400 rounded py-2 px-3"
                                        id="price"
                                        name="price"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
                                >
                                    Submit
                                </button>
                            </form>
                            {showSuccessMessage && (
                                <div style={{ color: 'green', padding: 20 }}>
                                    Property listed successfully!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProp;