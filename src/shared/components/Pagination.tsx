import React, { useState, KeyboardEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number; // Add totalPages prop
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  totalPages, // Use totalPages prop
}) => {
  const [inputPage, setInputPage] = useState('');

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
        <ChevronsLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
      >
        <ChevronsRight className="h-5 w-5" />
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
