import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  customerOrdersState,
  Order,
  userInfoState,
} from '../../shared/state/atom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-modal';

const OrderHistory: React.FC = () => {
  const orders = useRecoilValue(customerOrdersState);
  const setOrders = useSetRecoilState(customerOrdersState);
  const userInfo = useRecoilValue(userInfoState);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 9,
    totalRecords: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://157.66.27.65:8080/api/KoiOrder/customer-orders`,
          {
            params: {
              customerId: userInfo?.id,
              pageNumber: pagination.pageNumber,
              pageSize: pagination.pageSize,
            },
          }
        );
        if (response.data.success) {
          console.log('customer orders', response.data.data);
          setOrders(response.data.data);
          setPagination(response.data.pagination);
        } else {
          console.error('No orders found for the customer.');
        }
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userInfo, setOrders, pagination.pageNumber, pagination.pageSize]);

  const handleCancelOrder = async (order: Order) => {
    try {
      const response = await axios.post(
        `http://157.66.27.65:8080/api/KoiOrder/cancel-order/${order.orderId}`
      );
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.orderId === order.orderId ? { ...o, status: 'Canceled' } : o
          )
        );
        setSelectedOrder(null);
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const filteredOrders = orders
    .filter(
      (order) =>
        order.orderId.toString().includes(searchTerm) &&
        (filterStatus ? order.status === filterStatus : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.orderId - b.orderId;
      } else {
        return b.orderId - a.orderId;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-96px)]">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaFilter className="mr-2 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="HealthCheck">HealthCheck</option>
              <option value="HealthChecked">HealthChecked</option>
              <option value="Packing">Packing</option>
              <option value="Packed">Packed</option>
              <option value="InTransit">InTransit</option>
              <option value="Delivered">Delivered</option>
              <option value="Success">Success</option>
              <option value="Canceled">Canceled</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              {sortOrder === 'asc' ? (
                <FaSortAmountDown className="inline-block mr-1" />
              ) : (
                <FaSortAmountUp className="inline-block mr-1" />
              )}
              Sort by Order ID
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={() => setDisplayMode('grid')}
              className={`px-4 py-2 rounded ${
                displayMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setDisplayMode('list')}
              className={`ml-2 px-4 py-2 rounded ${
                displayMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              List
            </button>
          </div>
          {filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div
              className={`grid ${
                displayMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              } gap-4`}
            >
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.orderId}
                  className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                    displayMode === 'grid'
                      ? 'flex flex-col justify-between'
                      : 'flex flex-col md:flex-row justify-between items-center'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="font-semibold text-lg mb-2">
                      Order ID: {order.orderId}
                    </p>
                    <div className="mb-4">
                      <p className="mb-1">
                        <span className="font-semibold">Pickup Location:</span>{' '}
                        {order.pickupLocation}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Destination:</span>{' '}
                        {order.destination}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Weight:</span>{' '}
                        {order.weight} kg
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Quantity:</span>{' '}
                        {order.quantity}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">
                          Additional Services:
                        </span>{' '}
                        {order.additionalServices}
                      </p>
                    </div>
                    <p>
                      <span className="font-semibold">Status:</span>{' '}
                      {order.status === 'Delivered' ? (
                        <span className="text-green-500">
                          <FaCheckCircle className="inline-block mr-1" />{' '}
                          Delivered
                        </span>
                      ) : order.status === 'Canceled' ? (
                        <span className="text-red-500">
                          <FaTimesCircle className="inline-block mr-1" />{' '}
                          Canceled
                        </span>
                      ) : (
                        <span className="text-yellow-500">
                          <FaSpinner className="inline-block mr-1 animate-spin" />{' '}
                          {order.status}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 md:ml-4 space-x-2">
                    {order.status !== 'Delivered' &&
                      order.status !== 'Canceled' && (
                        <motion.button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                          onClick={() => handleCancelOrder(order)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel Order
                        </motion.button>
                      )}
                    <motion.button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center"
                      onClick={() => setSelectedOrder(order)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInfoCircle className="mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageNumber: Math.max(prev.pageNumber - 1, 1),
                }))
              }
              className="px-4 py-2 mx-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={pagination.pageNumber === 1}
            >
              Previous
            </button>
            <span className="mx-2">
              Page {pagination.pageNumber} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageNumber: Math.min(
                    prev.pageNumber + 1,
                    pagination.totalPages
                  ),
                }))
              }
              className="px-4 py-2 mx-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={pagination.pageNumber === pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      <AnimatePresence>
        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={() => setSelectedOrder(null)}
            contentLabel="Order Details"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative shadow-xl"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>

              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Order Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Order ID:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.orderId}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Customer ID:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.customerId}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Pickup Location:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.pickupLocation}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Destination:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.destination}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.weight} kg
                    </span>
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Quantity:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.quantity}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Transport Method:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.transportMethod}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">Total:</span>
                    <span className="ml-2 text-gray-600">
                      ${selectedOrder.total?.toFixed(2)}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Additional Services:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.additionalServices || 'None'}
                    </span>
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="ml-2 text-gray-600">
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <p className="mb-4">
                  <span className="font-semibold text-gray-700">
                    Placed Date:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {new Date(selectedOrder.placedDate).toLocaleString()}
                  </span>
                </p>
                {selectedOrder.completedDate && (
                  <p className="mb-4">
                    <span className="font-semibold text-gray-700">
                      Completed Date:
                    </span>
                    <span className="ml-2 text-gray-600">
                      {new Date(selectedOrder.completedDate).toLocaleString()}
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderHistory;
