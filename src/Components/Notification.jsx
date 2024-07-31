import React, { useState } from 'react';

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#cf1e2e] to-[#f39189] p-3 text-white flex justify-between items-center fixed top-0 w-full z-50">
      <span>{message}</span>
      <button onClick={closeBanner} className="text-2xl text-white focus:outline-none">
        &times;
      </button>
    </div>
  );
};

export default Notification;
