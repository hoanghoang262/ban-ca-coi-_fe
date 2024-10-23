import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaHistory, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  orderStatusesState,
  customerOrdersState,
  Order as OrderType,
  userInfoState,
} from '../../shared/state/atom';

const Order: React.FC = () => {
  const setOrderStatuses = useSetRecoilState(orderStatusesState);
  const orders = useRecoilValue(customerOrdersState);
  const userInfo = useRecoilValue(userInfoState);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://157.66.27.65:8080/api/KoiOrder/getEnumStatusKoiOrder'
        );
        if (response.data.success) {
          setOrderStatuses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching order statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatuses();
  }, [setOrderStatuses]);

  const handleViewDetails = (order: OrderType) => {
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-96px)]">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <motion.h1
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Order Management Dashboard
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 border-2 border-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaPlus className="text-6xl text-blue-500 mb-4" />
              <h2 className="text-3xl font-semibold mb-4">
                Create a New Order
              </h2>
              <p className="text-center mb-6">
                Quickly create a new order by providing the necessary details.
                Our user-friendly interface makes it easy to enter pickup
                location, destination, weight, quantity, and additional
                services.
              </p>
              <Link
                to="/order/create"
                className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-xl font-semibold"
              >
                Create Order
              </Link>
            </motion.div>
            <motion.div
              className="p-8 border-2 border-blue-500 rounded-lg shadow-lg flex flex-col items-center justify-center bg-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaHistory className="text-6xl text-blue-500 mb-4" />
              <h2 className="text-3xl font-semibold mb-4">
                View Order History
              </h2>
              <p className="text-center mb-6">
                Review your past orders and track their status. Stay informed
                about the progress of your shipments and access detailed
                information about each order.
              </p>
              <Link
                to="/order/history"
                className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-xl font-semibold"
              >
                Order History
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 flex flex-col md:flex-row items-center justify-between bg-blue-100 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="md:w-1/2 md:pr-8">
              <h2 className="text-3xl font-semibold mb-4">
                Efficient and Reliable Shipping Services
              </h2>
              <p className="mb-4">
                We offer a wide range of shipping options to meet your needs.
                Whether you require air, sea, or land transportation, we have
                you covered. Our experienced team ensures that your goods are
                handled with care and delivered on time.
              </p>
              <p className="flex items-center">
                <FaInfoCircle className="text-blue-500 mr-2" />
                Contact our support team for any inquiries or assistance.
              </p>
            </div>
          </motion.div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <ul>
              {orders.map((order) => (
                <li key={order.orderId} className="mb-4 p-4 border rounded">
                  <h3 className="text-xl font-semibold">
                    Order #{order.orderId}
                  </h3>
                  <p>Status: {order.status}</p>
                  <button
                    onClick={() => handleViewDetails(order)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedOrder && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
              {/* Display selected order details */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
