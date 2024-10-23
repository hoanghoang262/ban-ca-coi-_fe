import React, { useState } from 'react';
import { Search, ChevronDown, X, ChevronUp } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string | null;
  setFilterType: (type: string | null) => void;
  sortOptions: { field: string; direction: string }[];
  setSortOptions: (options: { field: string; direction: string }[]) => void;
  resetFilters: () => void;
  contentTypes: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  sortOptions,
  setSortOptions,
  resetFilters,
  contentTypes,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortChange = (field: string) => {
    const existingOption = sortOptions.find((option) => option.field === field);
    if (existingOption) {
      const updatedOptions = sortOptions.map((option) =>
        option.field === field
          ? {
              ...option,
              direction: option.direction === 'asc' ? 'desc' : 'asc',
            }
          : option
      );
      setSortOptions(updatedOptions);
    } else {
      setSortOptions([...sortOptions, { field, direction: 'asc' }]);
    }
  };

  const handleRemoveSort = (field: string) => {
    const updatedOptions = sortOptions.filter(
      (option) => option.field !== field
    );
    setSortOptions(updatedOptions);
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <X
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
              onClick={() => setSearchTerm('')}
            />
          )}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
            >
              Filter by Type
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleSortChange('title')}
            className="px-4 py-2 bg-gray-200 rounded-md flex items-center"
          >
            Sort by Title
            {sortOptions.some((option) => option.field === 'title') &&
              (sortOptions.find((option) => option.field === 'title')
                ?.direction === 'desc' ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronUp className="ml-2 h-4 w-4" />
              ))}
          </button>
          <button
            onClick={() => handleSortChange('createdAt')}
            className="px-4 py-2 bg-gray-200 rounded-md flex items-center"
          >
            Sort by Date
            {sortOptions.some((option) => option.field === 'createdAt') &&
              (sortOptions.find((option) => option.field === 'createdAt')
                ?.direction === 'desc' ? (
                <ChevronDown className="ml-2 h-4 w-4" />
              ) : (
                <ChevronUp className="ml-2 h-4 w-4" />
              ))}
          </button>
        </div>
      </div>
      {(searchTerm || filterType || sortOptions.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center">
          <span className="text-sm text-gray-600 mr-2">Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
              Search: {searchTerm}
              <X
                className="h-4 w-4 ml-1 cursor-pointer"
                onClick={() => setSearchTerm('')}
              />
            </span>
          )}
          {filterType && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center">
              Type: {filterType}
              <X
                className="h-4 w-4 ml-1 cursor-pointer"
                onClick={() => setFilterType(null)}
              />
            </span>
          )}
          {sortOptions.map((option) => (
            <span
              key={option.field}
              className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded flex items-center"
            >
              Sort: {option.field} ({option.direction})
              <X
                className="h-4 w-4 ml-1 cursor-pointer"
                onClick={() => handleRemoveSort(option.field)}
              />
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
