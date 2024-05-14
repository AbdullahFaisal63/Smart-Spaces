import React from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-xl z-10">
                <p className="text-lg mb-4">{message}</p>
                <div className="flex justify-center">
                    <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 focus:ring-4 focus:outline-none focus:ring-red-400">
                        Confirm
                    </button>
                    <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-gray-400">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
