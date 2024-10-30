import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../shared/components/Pagination';
import { Order } from '../../shared/state/atom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTruck,
  FaFilter,
  FaExclamationCircle,
  FaBoxOpen,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const DeliveringStaff: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 9,
    totalRecords: 0,
    totalPages: 0,
  });
  const [filterStatus, setFilterStatus] = useState<string>('Pending');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusOptions = ['Pending', 'Packed', 'InTransit', 'Delivered'];

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
            pageNumber: currentPage,
            pageSize: pagination.pageSize,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
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

  useEffect(() => {
    fetchOrders();
  }, [currentPage, filterStatus]);

  const handleStatusUpdate = async (orderId: number, currentStatus: string) => {
    let newStatus = '';
    switch (currentStatus) {
      case 'Pending':
        newStatus = 'HealthCheck';
        break;
      case 'HealthCheck':
        newStatus = 'HealthChecked';
        break;
      case 'InTransit':
        newStatus = 'Delivered';
        break;
      case 'Packed':
        newStatus = 'InTransit';
        break;
      default:
        toast.error('Invalid status transition.');
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
        toast.success('Order status updated successfully.');
        fetchOrders(); // Refresh orders after successful update
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status.');
    }
  };

  const openDetailPopup = (order: Order) => {
    setSelectedOrder(order);
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
        <FaTruck className="inline-block mr-2 text-green-500" />
        Delivering Staff Orders
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
                  ? 'bg-green-500 text-white'
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
          <p className="text-xl text-gray-600">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <FaBoxOpen className="text-gray-400 text-6xl mb-4" />
          <p className="text-xl text-gray-600 font-medium mb-2">
            No Orders Available
          </p>
          <p className="text-gray-500">
            Try adjusting your filters to see more orders
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <motion.div
              key={order.orderId}
              whileHover={{ scale: 1.03 }}
              className={`p-6 border rounded-lg shadow-lg ${
                order.status === 'Delivered'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Order #{order.orderId}
              </h2>
              <div className="space-y-2 mb-4">
                <p>
                  <span className="font-medium text-gray-600">Status:</span>{' '}
                  {order.status === 'Delivered' ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <FaCheckCircle /> Delivered Successfully
                    </span>
                  ) : (
                    <span className="text-blue-500">{order.status}</span>
                  )}
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
                {order.status !== 'Delivered' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleStatusUpdate(order.orderId, order.status)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center transition-colors duration-300 hover:bg-blue-600"
                  >
                    <FaArrowRight className="mr-2" />
                    Next Status
                  </motion.button>
                ) : (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    Completed
                  </div>
                )}
                <div className="flex space-x-2">
                  {order.status !== 'Delivered' && (
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
                  )}
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
          onPageChange={setCurrentPage}
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
                <FaInfoCircle className="mr-2 text-blue-500" />
                Order Details
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-600">Order ID:</span>{' '}
                  {selectedOrder.orderId}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Status:</span>{' '}
                  {selectedOrder.status}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Customer:</span>{' '}
                  {selectedOrder.customerName}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Pickup Location:
                  </span>{' '}
                  {selectedOrder.pickupLocation}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Destination:
                  </span>{' '}
                  {selectedOrder.destination}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Weight:</span>{' '}
                  {selectedOrder.weight} kg
                </p>
                <p>
                  <span className="font-medium text-gray-600">Quantity:</span>{' '}
                  {selectedOrder.quantity}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Transport Method:
                  </span>{' '}
                  {selectedOrder.transportMethod}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Total:</span> $
                  {selectedOrder.total?.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Placed Date:
                  </span>{' '}
                  {new Date(selectedOrder.placedDate).toLocaleDateString()}
                </p>
                {selectedOrder.completedDate && (
                  <p>
                    <span className="font-medium text-gray-600">
                      Completed Date:
                    </span>{' '}
                    {new Date(selectedOrder.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
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
    </motion.div>
  );
};

export default DeliveringStaff;
