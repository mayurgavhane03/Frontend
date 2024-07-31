// Components/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <button
      key={number}
      className={`text-[#888888] hover:text-white m-2 p-2 ${
        currentPage === number ? "font-bold" : ""
      }`}
      onClick={() => {
        onPageChange(number);
        window.scrollTo(0, 0);
      }}
    >
      {number}
    </button>
  ));

  return (
    <div className="flex justify-center mt-4">
      <button
        className={`text-[#888888] hover:text-white ${
          currentPage === 1 ? "hidden" : ""
        }`}
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo(0, 0);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers}
      <button
        className={`text-[#888888] hover:text-white ${
          currentPage === totalPages ? "hidden" : ""
        }`}
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo(0, 0);
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
