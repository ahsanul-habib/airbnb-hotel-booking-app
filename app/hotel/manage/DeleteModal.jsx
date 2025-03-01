"use client"

import React, { useState } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';

const HotelDeleteModal= ({hotelName,onClose,handleDelete}) => {

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-500 text-3xl" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Delete Hotel
              </h2>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this hotel? This action cannot be undone.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default HotelDeleteModal;