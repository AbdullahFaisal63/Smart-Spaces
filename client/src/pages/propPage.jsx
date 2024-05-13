import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

const PropPage = () => {
    const { id } = useParams();
    const [prop, setProp] = useState([]);
    const [usr, setUsr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContactPopup, setShowContactPopup] = useState(false); // State for controlling popup visibility
    const isLoggedIn = sessionStorage.getItem('accessToken') !== null;
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propResponse = await axios.get(`http://localhost:3001/listings/${id}`);
                const usrResponse = await axios.get(`http://localhost:3001/auth/${propResponse.data[0].userId}`);
                setProp(propResponse.data);
                setUsr(usrResponse.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Function to handle contact seller button click
    const handleContactSeller = () => {
        if (isLoggedIn) {
            setShowContactPopup(true);
        } else {
            navigate('/login'); // Redirect to login page if not logged in
        }
    };

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
                    <p className="text-gray-600">Seller: {prop[0].userId}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">{prop[0].description}</p>
                </div>
                <div className="mb-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleContactSeller} // Open popup or redirect to login page on button click
                    >
                        Contact Seller
                    </button>
                </div>
            </div>
            {/* Contact Popup */}
            {showContactPopup && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Seller</h3>
                                        {/* Add seller contact info here */}
                                        <br></br>
                                        Name: {usr[0].firstname}<br></br>
                                        Phone: {usr[0].phone}<br></br>
                                        Address: {usr[0].address}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    onClick={() => setShowContactPopup(false)} // Close popup on button click
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropPage;
