import React, { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import PriceTable from './components/PriceTable';
import PriceModal from './components/PriceModal';
import { useRecoilState } from 'recoil';
import { pricingPackagesState } from '../../shared/state/atom';
import Pagination from '../../shared/components/Pagination';

export interface PricingPackage {
  priceId: number;
  transportMethod: string;
  weightRange: string;
  pricePerKg: number;
  additionalServicePrice: number;
}

const PriceManager: React.FC = () => {
  const [pricingPackages, setPricingPackages] =
    useRecoilState(pricingPackagesState);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PricingPackage;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(
    null
  );
  const [editPackage, setEditPackage] = useState<PricingPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transportMethods, setTransportMethods] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<{ data: PricingPackage[] }>(
          'http://157.66.27.65:8080/api/Price/get-prices'
        );
        setPricingPackages(response.data.data);
      } catch (error) {
        setError('Error fetching prices');
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [setPricingPackages]);

  useEffect(() => {
    const fetchTransportMethods = async () => {
      try {
        const response = await axios.get<{ data: string[] }>(
          'http://157.66.27.65:8080/api/Price/transport-methods'
        );
        setTransportMethods(response.data.data);
      } catch (error) {
        console.error('Error fetching transport methods:', error);
      }
    };

    fetchTransportMethods();
  }, []);

  const handleEdit = (packageId: number) => {
    const packageToEdit = pricingPackages.find(
      (pkg) => pkg.priceId === packageId
    );
    if (packageToEdit) {
      setEditPackage(packageToEdit);
      setShowModal(true);
    }
  };

  const handleDelete = (packageId: number) => {
    alert('The Delete Package feature is not implemented yet.');
  };

  const handleAdd = () => {
    alert('The Add Package feature is not implemented yet.');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: keyof PricingPackage) => {
    setSortConfig((prevSortConfig) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (
        prevSortConfig &&
        prevSortConfig.key === key &&
        prevSortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      return { key, direction };
    });
  };

  const sortedPackages = useMemo(() => {
    if (!sortConfig) return pricingPackages;

    return [...pricingPackages].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [pricingPackages, sortConfig]);

  const filteredPackages = useMemo(() => {
    return sortedPackages.filter(
      (pkg) =>
        pkg.transportMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.weightRange.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedPackages, searchTerm]);

  const pageCount = Math.ceil(filteredPackages.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(offset, offset + itemsPerPage);
  }, [filteredPackages, currentPage, itemsPerPage]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editPackage) {
      try {
        const response = await axios.put(
          `http://157.66.27.65:8080/api/Price/update-price/${editPackage.priceId}`,
          {
            transportMethod: editPackage.transportMethod,
            weightRange: editPackage.weightRange,
            pricePerKg: editPackage.pricePerKg,
            additionalServicePrice: editPackage.additionalServicePrice,
          }
        );
        if (response.data.success) {
          setPricingPackages((prevPackages) =>
            prevPackages.map((pkg) =>
              pkg.priceId === editPackage.priceId ? editPackage : pkg
            )
          );
          setShowModal(false);
          setEditPackage(null);
        } else {
          console.error('Error updating package:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating package:', error);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L11.414 10l2.934 2.934a1 1 0 000-1.414z" />
          </svg>
        </span>
      </div>
    );

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-semibold mb-4">Pricing Packages</h2>
      <div className="mb-4 flex items-center">
        <FaSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>
      <button
        onClick={handleAdd}
        className="absolute top-6 right-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
      >
        <FaPlus className="inline-block mr-2" />
        Add Package
      </button>
      <PriceTable
        currentItems={currentItems}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRowClick={handleRowClick}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredPackages.length}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
      <PriceModal
        showModal={showModal}
        selectedPackage={selectedPackage}
        editPackage={editPackage}
        setEditPackage={setEditPackage}
        handleUpdate={handleUpdate}
        setShowModal={setShowModal}
        transportMethods={transportMethods}
      />
    </div>
  );
};

export default PriceManager;
