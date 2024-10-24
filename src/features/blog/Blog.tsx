import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { blogDataState, ContentItem } from '../../shared/state/atom';
import SearchFilter from './SearchFilter';
import ContentList from './ContentList';
import Pagination from './Pagination';
import ContentDetail from './ContentDetail';

const Blog: React.FC = () => {
  const [data, setData] = useRecoilState(blogDataState);
  const [sortOptions, setSortOptions] = useState<
    { field: string; direction: string }[]
  >([{ field: 'createdAt', direction: 'desc' }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchData();
  }, [sortOptions, searchTerm, filterType, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://157.66.27.65:8080/api/CMSContent/get-articles',
        {
          params: {
            sortBy: sortOptions[0]?.field,
            isDescending: sortOptions[0]?.direction === 'desc',
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
        // Update total pages based on response
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.totalRecords); // Store total records
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const contentTypes = Array.from(
    new Set(data.map((item) => item.contentType))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterType(null);
    setSortOptions([{ field: 'createdAt', direction: 'desc' }]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Content List</h1>

        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          sortOptions={sortOptions}
          setSortOptions={setSortOptions}
          resetFilters={resetFilters}
          contentTypes={contentTypes}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <ContentList
            data={data}
            formatDate={formatDate}
            setSelectedItem={setSelectedItem}
          />
        )}

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalRecords} // Use totalRecords for pagination
          itemsPerPage={itemsPerPage}
        />

        <ContentDetail
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default Blog;
