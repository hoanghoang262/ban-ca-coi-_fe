import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  FileText,
  X,
  ChevronDown,
} from 'lucide-react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { blogDataState, ContentItem } from '../../shared/state/atom';

const Blog: React.FC = () => {
  const [data, setData] = useRecoilState(blogDataState);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [sortField, sortDirection, searchTerm, filterType, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://157.66.27.65:8080/api/CMSContent/get-articles',
        {
          params: {
            sortBy: sortField,
            isDescending: sortDirection === 'desc',
            pageNumber: currentPage,
            pageSize: itemsPerPage,
            contentType: filterType,
            searchTerm: searchTerm,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Get unique content types
  const contentTypes = Array.from(
    new Set(data.map((item) => item.contentType))
  );

  // Sort function
  const sortData = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterType(null);
    setSortField('createdAt');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Content List</h1>

        {/* Enhanced Search, Filter, and Sort */}
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
                onClick={() => sortData('title')}
                className="px-4 py-2 bg-gray-200 rounded-md flex items-center"
              >
                Sort by Title
                {sortField === 'title' && (
                  <ChevronDown
                    className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                  />
                )}
              </button>
              <button
                onClick={() => sortData('createdAt')}
                className="px-4 py-2 bg-gray-200 rounded-md flex items-center"
              >
                Sort by Date
                {sortField === 'createdAt' && (
                  <ChevronDown
                    className={`ml-2 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                  />
                )}
              </button>
            </div>
          </div>
          {(searchTerm ||
            filterType ||
            sortField !== 'createdAt' ||
            sortDirection !== 'desc') && (
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                Active filters:
              </span>
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
              {(sortField !== 'createdAt' || sortDirection !== 'desc') && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                  Sort: {sortField} ({sortDirection})
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all
              </button>
            </div>
          )}
        </div>

        {/* Content cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.contentId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.content}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span>{item.createByName}</span>
                  <Calendar className="h-4 w-4 ml-4 mr-1" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {item.contentType}
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {currentPage * itemsPerPage - itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}{' '}
            entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({
              length: Math.ceil(data.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Item details modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <User className="h-4 w-4 mr-1" />
                <span>{selectedItem.createByName}</span>
                <Calendar className="h-4 w-4 ml-4 mr-1" />
                <span>{formatDate(selectedItem.createdAt)}</span>
                <FileText className="h-4 w-4 ml-4 mr-1" />
                <span>{selectedItem.contentType}</span>
              </div>
              {selectedItem.updatedAt && (
                <p className="text-sm text-gray-500 mb-4">
                  Updated: {formatDate(selectedItem.updatedAt)}
                </p>
              )}
              <p className="text-gray-700 mb-6">{selectedItem.content}</p>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
