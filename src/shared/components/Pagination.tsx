import React, { useState, KeyboardEvent } from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState('');
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputPage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  return (
    <nav className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-3 py-1 border rounded-md ${
            currentPage === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 hover:bg-blue-100'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        Last
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-16 px-2 py-1 border rounded-md"
        />
        <button
          onClick={handleGoToPage}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100"
        >
          Go
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
