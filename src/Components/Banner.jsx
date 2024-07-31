import React, { useState } from 'react';

const Banner = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#171717] border border-gray-900 p-3 text-white flex items-center relative w-full shadow-lg">
      <span className="flex-grow text-center">{message}</span>
      <button
        onClick={closeBanner}
        className="text-2xl text-gray-400 hover:text-white focus:outline-none absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        &times;
      </button>
    </div>
  );
};

export default Banner;
