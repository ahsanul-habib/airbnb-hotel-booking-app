import React from 'react';
import { FaSearchMinus } from 'react-icons/fa';

const NoHotelBySearch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow p-4">
      <div className="text-center max-w-md">
        <FaSearchMinus className="mx-auto text-6xl text-accent mb-6" />
        <h1 className="text-3xl font-bold text-accent mb-4">
          No Hotels Found
        </h1>
        <p className="text-accent">
          We couldn&apos;t find any hotels matching your search criteria. 
          Please try adjusting your search or filters.
        </p>
      </div>
    </div>
  );
};

export default NoHotelBySearch;