import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
const PropPage = () => {
    const { id } = useParams();
    const [prop, setProp] = useState({});
    const [usr, setUsr] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const isLoggedIn = sessionStorage.getItem('accessToken') !== null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propResponse = await axios.get(`http://localhost:3001/listings/${id}`);
                const usrResponse = await axios.get(`http://localhost:3001/auth/${propResponse.data[0].userId}`);
                setProp(propResponse.data[0]);
                setUsr(usrResponse.data[0]);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleContactSeller = () => {
        if (isLoggedIn) {
            setShowContactPopup(true);
        } else {
            navigate('/login');
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
            <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="mt-20 container mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
                <div className="md:w-1/2 lg:w-2/5 mb-6 md:mb-0 mt-20">
                    <img src={prop.imgurl} alt={prop.title} className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-1/2 lg:w-3/5 md:ml-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h1 className="text-3xl font-semibold mb-20">{prop.title}</h1>
                        <div className="mb-20">
                            <p className="text-gray-600"><strong>Price:</strong> Rs {prop.price}</p>
                            <p className="text-gray-600"><strong>Category:</strong> {prop.propertyType}</p>
                            <p className="text-gray-600"><strong>Area:</strong> {prop.area}</p>
                            <p className="text-gray-600"><strong>Seller:</strong> {usr.firstname}</p>
                        </div>
                        <div className="mb-10">
                            <p className="text-gray-700">{prop.description}</p>
                        </div>
                        <button 
                            className="bg-c6a569 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={handleContactSeller}
                        >
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
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
                                        <br></br>
                                        Name: {usr.firstname}<br></br>
                                        Phone: {usr.phone}<br></br>
                                        Address: {usr.address}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    onClick={() => setShowContactPopup(false)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            <Footer />
        </div>
    );
};

export default PropPage;
