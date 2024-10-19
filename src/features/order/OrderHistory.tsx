import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaInfoCircle,
  FaTruck,
  FaPlane,
  FaShip,
  FaColumns,
  FaList,
  FaSearch,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  customerId: number;
  pickupLocation: string;
  destination: string;
  weight: number;
  quantity: number;
  transportMethod: string;
  additionalServices: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

const mockOrders: Order[] = [
  {
    id: 1,
    customerId: 1,
    pickupLocation: 'New York',
    destination: 'Los Angeles',
    weight: 100,
    quantity: 5,
    transportMethod: 'Air',
    additionalServices: 'Insurance',
    status: 'Pending',
  },
  {
    id: 2,
    customerId: 1,
    pickupLocation: 'Chicago',
    destination: 'Houston',
    weight: 200,
    quantity: 10,
    transportMethod: 'Land',
    additionalServices: 'Fragile',
    status: 'In Progress',
  },
  {
    id: 3,
    customerId: 1,
    pickupLocation: 'Miami',
    destination: 'Seattle',
    weight: 150,
    quantity: 3,
    transportMethod: 'Sea',
    additionalServices: 'Express',
    status: 'Completed',
  },
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCancelOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCancelConfirm = () => {
    if (selectedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: 'Cancelled' }
            : order
        )
      );
      setSelectedOrder(null);
    }
  };

  const handleCancelClose = () => {
    setSelectedOrder(null);
  };

  const getTransportIcon = (transportMethod: string) => {
    switch (transportMethod) {
      case 'Air':
        return <FaPlane className="text-blue-500 mr-2" />;
      case 'Sea':
        return <FaShip className="text-blue-500 mr-2" />;
      case 'Land':
        return <FaTruck className="text-blue-500 mr-2" />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchTerm)
  );

  return (
    <motion.div
      className="container mx-auto px-4 py-8 min-h-[calc(100vh-96px)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-3xl font-semibold text-indigo-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order History
        </motion.h1>
        <motion.button
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </motion.button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <motion.button
            className={`mr-4 border border-indigo-500 rounded-md p-2 ${
              displayMode === 'grid'
                ? 'bg-indigo-500 text-white'
                : 'text-indigo-500 hover:bg-indigo-500 hover:text-white'
            }`}
            onClick={() => setDisplayMode('grid')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaColumns size={20} />
          </motion.button>
          <motion.button
            className={`mr-4 border border-indigo-500 rounded-md p-2 ${
              displayMode === 'list'
                ? 'bg-indigo-500 text-white'
                : 'text-indigo-500 hover:bg-indigo-500 hover:text-white'
            }`}
            onClick={() => setDisplayMode('list')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaList size={20} />
          </motion.button>
        </div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search by ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </motion.div>
      </div>
      {orders.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaSpinner className="mr-2 animate-spin" />
          Loading orders...
        </motion.p>
      ) : (
        <motion.div
          className={`${
            displayMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              className={`bg-white p-6 rounded-lg shadow-md ${
                displayMode === 'grid'
                  ? 'flex flex-col justify-between'
                  : 'flex flex-col md:flex-row justify-between'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="font-semibold text-lg mb-2 flex items-center">
                  <span className="mr-2">Order ID: {order.id}</span>
                  {getTransportIcon(order.transportMethod)}
                </p>
                <div className="mb-4">
                  <p className="mb-1 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">Pickup Location:</span>{' '}
                    {order.pickupLocation}
                  </p>
                  <p className="mb-1 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">Destination:</span>{' '}
                    {order.destination}
                  </p>
                  <p className="mb-1 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">Weight:</span>{' '}
                    {order.weight} kg
                  </p>
                  <p className="mb-1 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">Quantity:</span>{' '}
                    {order.quantity}
                  </p>
                  <p className="mb-1 flex items-center">
                    <FaInfoCircle className="text-blue-500 mr-2" />
                    <span className="font-semibold">
                      Additional Services:
                    </span>{' '}
                    {order.additionalServices}
                  </p>
                </div>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Status:</span>
                  {order.status === 'Completed' ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-1" /> Completed
                    </span>
                  ) : order.status === 'Cancelled' ? (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-1" /> Cancelled
                    </span>
                  ) : (
                    <span className="text-yellow-500 flex items-center">
                      <FaSpinner className="mr-1 animate-spin" /> {order.status}
                    </span>
                  )}
                </p>
              </div>
              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <motion.button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mt-4 md:mt-0 md:ml-4"
                  onClick={() => handleCancelOrder(order)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel Order
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
      {selectedOrder && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Cancel Order {selectedOrder.id}
            </h2>
            <p className="mb-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-end">
              <motion.button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                onClick={handleCancelClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                No
              </motion.button>
              <motion.button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleCancelConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes, Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OrderHistory;
