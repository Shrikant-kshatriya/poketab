import React from 'react';

const Error = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <p className="text-red-500 text-lg mb-4">Oops! Failed to fetch Pokémon.</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
