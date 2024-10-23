import React, { useState, KeyboardEvent } from 'react';

interface PaginationProps {
  itemsPerPage?: number;
  totalItems?: number;
  paginate?: (pageNumber: number) => void;
  currentPage?: number;
}

export default function Pagination({
  itemsPerPage = 1,
  totalItems = 1,
  paginate = () => {},
  currentPage = 1,
}: PaginationProps) {
  const [inputPage, setInputPage] = useState('');
  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const displayedPages: (number | string)[] = [];
    if (totalPages <= 7) {
      return pageNumbers;
    }
    if (currentPage <= 3) {
      displayedPages.push(
        ...pageNumbers.slice(0, 3),
        '...',
        ...pageNumbers.slice(-3)
      );
    } else if (currentPage >= totalPages - 2) {
      displayedPages.push(
        ...pageNumbers.slice(0, 3),
        '...',
        ...pageNumbers.slice(-3)
      );
    } else {
      displayedPages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      );
    }
    return displayedPages;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
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
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        Previous
      </button>
      {renderPageNumbers().map((number, index) => (
        <React.Fragment key={index}>
          {number === '...' ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => paginate(number as number)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
              }`}
            >
              {number}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        Next
      </button>
      <button
        onClick={() => paginate(totalPages)}
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
}
