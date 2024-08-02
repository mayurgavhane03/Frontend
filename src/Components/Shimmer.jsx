// Shimmer.js
import React from "react";

const Shimmer = ({ cardsCount }) => {
  const shimmerCards = Array.from({ length: cardsCount }).map((_, index) => (
    <div
      key={index}
      className="shimmer-wrapper flex lg:w-56 lg:p-4 rounded-lg lg:items-center lg:justify-center lg:flex-col"
    >
      <div className="shimmer w-[120px] lg:w-[200px] lg:h-[300px] h-[200px] rounded-lg mb-4"></div>
      <div className="flex flex-col">
        <div className="shimmer w-[200px] ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[200px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[80px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
      </div>
    </div>
  ));

  return <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">{shimmerCards}</div>;
};

export default Shimmer;
