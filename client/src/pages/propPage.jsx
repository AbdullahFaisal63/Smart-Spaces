import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

const PropPage = () => {
    const { id } = useParams();
    const [prop, setProp] = useState({});
    const [usr, setUsr] = useState({});
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
                setProp(propResponse.data[0]); // Assuming response is an object, not an array
                setUsr(usrResponse.data[0]); // Assuming response is an object, not an array
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
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-semibold mb-4">{prop.title}</h1>
                    <img src={prop.imgurl} alt={prop.title} className="w-full mb-4 rounded-lg" />
                    <div className="mb-4">
                        <p className="text-gray-600">Price: Rs {prop.price}</p>
                        <p className="text-gray-600">Category: {prop.propertyType}</p>
                        <p className="text-gray-600">Seller: {usr.firstname}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-700">{prop.description}</p>
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
                                        Name: {usr.firstname}<br></br>
                                        Phone: {usr.phone}<br></br>
                                        Address: {usr.address}
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
