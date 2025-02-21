"use client"

import React, { useState } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';

const DeleteConfirmPopup = ({handleDelete,onClose}) => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaTrash className="mr-3 text-red-500" /> Confirm Delete
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-8 text-center">
              Are you sure you want to delete this item? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={onClose} 
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default DeleteConfirmPopup; 