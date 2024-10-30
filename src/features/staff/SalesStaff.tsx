import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaDollarSign,
  FaTruck,
  FaBoxOpen,
  FaFilter,
  FaExclamationCircle,
  FaCertificate,
} from 'react-icons/fa';
import Pagination from '../../shared/components/Pagination';
import { Order } from '../../shared/state/atom';
import { toast } from 'react-toastify';

const SalesStaff: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 9,
    totalRecords: 0,
    totalPages: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('HealthCheck');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCertificatePopup, setShowCertificatePopup] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState({
    orderId: 0,
    documentType: '',
    documentPath: '',
    image: '',
  });
  const [certificates, setCertificates] = useState<{ [key: number]: any }>({});

  const statusOptions = ['HealthCheck', 'HealthChecked', 'Packing', 'Packed'];

  useEffect(() => {
    fetchOrders();
  }, [pagination.pageNumber, filterStatus]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/KoiOrder/getKoiOrderAndFilter`,
        {
          params: {
            status: filterStatus,
            sortBy: 'PlacedDate',
            isDescending: true,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize,
          },
        }
      );
      if (response.data.success && response.data.data) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
        setError(null);
        response.data.data.forEach((order: Order) => {
          fetchCertificate(order.orderId);
        });
      } else {
        setError('No orders found');
        setOrders([]);
        setPagination({
          pageNumber: 1,
          pageSize: 10,
          totalRecords: 0,
          totalPages: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
      setOrders([]);
      setPagination({
        pageNumber: 1,
        pageSize: 10,
        totalRecords: 0,
        totalPages: 0,
      });
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificate = async (orderId: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/OrderDocuments/order/${orderId}`
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        setCertificates((prev) => ({
          ...prev,
          [orderId]: response.data.data[0],
        }));
      } else {
        setCertificates((prev) => ({ ...prev, [orderId]: null }));
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
      setCertificates((prev) => ({ ...prev, [orderId]: null }));
    }
  };

  const handleStatusUpdate = async (orderId: number, currentStatus: string) => {
    let newStatus = '';
    switch (currentStatus) {
      case 'HealthCheck':
        if (!certificates[orderId]) {
          setCertificateInfo((prev) => ({
            ...prev,
            orderId: orderId,
          }));
          setShowCertificatePopup(true);
          return;
        }
        newStatus = 'HealthChecked';
        break;
      case 'HealthChecked':
        newStatus = 'Packing';
        break;
      case 'Packing':
        newStatus = 'Packed';
        break;
      default:
        toast.error('Invalid status transition');
        return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/KoiOrder/update-order-status/${orderId}`,
        null,
        {
          params: { status: newStatus },
        }
      );
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders(); // Refresh orders after successful update
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

  const handleCertificateSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/OrderDocuments`,
        certificateInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        toast.success('Certificate added successfully');
        setShowCertificatePopup(false);
        fetchOrders(); // Refresh orders after successful certificate submission
      } else {
        toast.error('Failed to add certificate');
      }
    } catch (error) {
      console.error('Error adding certificate:', error);
      toast.error('Error adding certificate');
    }
  };

  const openDetailPopup = (order: Order) => {
    setSelectedOrder(order);
    fetchCertificate(order.orderId);
  };

  const closeDetailPopup = () => {
    setSelectedOrder(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        <FaShoppingCart className="inline-block mr-2 text-blue-500" />
        Sales Staff Orders
      </h1>
      <div className="mb-6">
        <div className="flex items-center justify-start space-x-2">
          <FaFilter className="text-gray-500" />
          <span className="font-semibold">Filter by status:</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full ${
                filterStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <FaExclamationCircle className="text-gray-400 text-5xl mb-4 mx-auto" />
          <p className="text-xl text-gray-500">{error}</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <FaBoxOpen className="text-gray-400 text-5xl mb-4 mx-auto" />
          <p className="text-xl text-gray-500">No orders found</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.orderId}
              whileHover={{ scale: 1.03 }}
              className="p-6 border rounded-lg shadow-lg bg-white relative"
            >
              {certificates[order.orderId] && (
                <FaCertificate className="absolute top-2 right-2 text-green-500" />
              )}
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Order #{order.orderId}
              </h2>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-medium text-gray-600">Status:</span>{' '}
                  <span className="text-blue-500">{order.status}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Customer:</span>{' '}
                  {order.customerName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Date:</span>{' '}
                  {new Date(order.placedDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Total:</span>{' '}
                  <span className="text-green-500 font-semibold">
                    ${order.total?.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                {order.status !== 'Packed' && (
                  <>
                    {order.status === 'HealthCheck' &&
                    !certificates[order.orderId] ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleStatusUpdate(order.orderId, order.status)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-300 hover:bg-blue-600"
                      >
                        <FaCheckCircle className="mr-2" />
                        Submit Certificate
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleStatusUpdate(order.orderId, order.status)
                        }
                        className={`${
                          certificates[order.orderId]
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        } text-white px-4 py-2 rounded-full flex items-center transition-colors duration-300 hover:bg-blue-600`}
                      >
                        <FaArrowRight className="mr-2" />
                        Next Status
                      </motion.button>
                    )}
                  </>
                )}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      handleStatusUpdate(order.orderId, 'Cancelled')
                    }
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTimesCircle size={24} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openDetailPopup(order)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaInfoCircle size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Pagination
          currentPage={pagination.pageNumber}
          onPageChange={(page) =>
            setPagination((prev) => ({ ...prev, pageNumber: page }))
          }
          totalPages={pagination.totalPages}
          totalItems={pagination.totalRecords}
          itemsPerPage={pagination.pageSize}
        />
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeDetailPopup}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaShoppingCart className="mr-2 text-blue-500" />
                Order Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold flex items-center">
                    <FaUser className="mr-2 text-gray-500" /> Customer:
                  </p>
                  <p>{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="font-semibold flex items-center">
                    <FaCalendarAlt className="mr-2 text-gray-500" /> Order Date:
                  </p>
                  <p>{new Date(selectedOrder.placedDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-semibold flex items-center">
                    <FaDollarSign className="mr-2 text-gray-500" /> Total:
                  </p>
                  <p className="text-green-500">
                    ${selectedOrder.total?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold flex items-center">
                    <FaTruck className="mr-2 text-gray-500" /> Status:
                  </p>
                  <p className="text-blue-500">{selectedOrder.status}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-semibold flex items-center">
                  <FaBoxOpen className="mr-2 text-gray-500" /> Order Details:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Weight: {selectedOrder.weight} kg</li>
                  <li>Quantity: {selectedOrder.quantity}</li>
                  <li>Transport Method: {selectedOrder.transportMethod}</li>
                  <li>
                    Additional Services: {selectedOrder.additionalServices}
                  </li>
                </ul>
              </div>
              {certificates[selectedOrder.orderId] ? (
                <div className="mt-4">
                  <p className="font-semibold flex items-center">
                    <FaCheckCircle className="mr-2 text-gray-500" />{' '}
                    Certificate:
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>
                      Document Type:{' '}
                      {certificates[selectedOrder.orderId].documentType}
                    </li>
                    <li>
                      Document Path:{' '}
                      {certificates[selectedOrder.orderId].documentPath}
                    </li>
                    <li>
                      <img
                        src={`data:image/png;base64,${certificates[selectedOrder.orderId].image}`}
                        alt="Certificate"
                        className="mt-2"
                      />
                    </li>
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-red-500">
                  No certificate found for this order.
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeDetailPopup}
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCertificatePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCertificatePopup(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaCheckCircle className="mr-2 text-blue-500" />
                Add Certificate
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Document Type
                </label>
                <input
                  type="text"
                  value={certificateInfo.documentType}
                  onChange={(e) =>
                    setCertificateInfo((prev) => ({
                      ...prev,
                      documentType: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Document Path
                </label>
                <input
                  type="text"
                  value={certificateInfo.documentPath}
                  onChange={(e) =>
                    setCertificateInfo((prev) => ({
                      ...prev,
                      documentPath: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Image (Base64)
                </label>
                <textarea
                  value={certificateInfo.image}
                  onChange={(e) =>
                    setCertificateInfo((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCertificatePopup(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-600"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCertificateSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SalesStaff;
