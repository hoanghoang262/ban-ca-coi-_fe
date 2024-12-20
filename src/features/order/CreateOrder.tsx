import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { orderStatusesState, userInfoState } from '../../shared/state/atom';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import tutorialImage from '../../assets/koi-koi-about-us.webp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateOrder: React.FC = () => {
  const orderStatuses = useRecoilValue(orderStatusesState);
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    customerId: userInfo?.id || 0,
    pickupLocation: '',
    destination: '',
    weight: 0,
    quantity: 0,
    total: 0,
    transportMethod: '',
    pricingId: 1,
    additionalServices: '',
  });
  const [pricingOptions, setPricingOptions] = useState<
    { priceId: number; transportMethod: string; pricePerKg: number }[]
  >([]);

  useEffect(() => {
    const fetchPricingOptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/Price/get-prices`
        );
        setPricingOptions(response.data.data);
      } catch (error) {
        console.error('Error fetching pricing options:', error);
        toast.error('Error fetching pricing options');
      }
    };

    fetchPricingOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => {
      const updatedOrder = {
        ...prevOrder,
        [name]: value,
      };

      // Recalculate total when weight, quantity, or pricingId changes
      if (name === 'weight' || name === 'quantity' || name === 'pricingId') {
        const selectedPricing = pricingOptions.find(
          (option) =>
            option.priceId === parseInt(updatedOrder.pricingId.toString())
        );
        const pricePerKg = selectedPricing?.pricePerKg || 0;
        updatedOrder.total =
          pricePerKg *
          parseFloat(updatedOrder.weight.toString()) *
          parseFloat(updatedOrder.quantity.toString());
      }

      return updatedOrder;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.pickupLocation || !order.destination || !order.transportMethod) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/KoiOrder/create-order`,
        order
      );
      if (response.data.success) {
        console.log('Order created:', response.data.data);
        toast.success('Order created successfully');
        const newOrder = response.data.data;
        if (newOrder.status === 'WaitingForPayment') {
          const paymentResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/VNPay/Payment`,
            null,
            { params: { orderId: newOrder.orderId } }
          );
          if (paymentResponse.data.paymentUrl) {
            window.open(paymentResponse.data.paymentUrl, '_blank');
          }
        }
        setOrder({
          customerId: userInfo?.id || 0,
          pickupLocation: '',
          destination: '',
          weight: 0,
          quantity: 0,
          total: 0,
          transportMethod: '',
          pricingId: 1,
          additionalServices: '',
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-96px)]">
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Order
        </motion.h1>
        <motion.button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
          onClick={() => navigate(-1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={tutorialImage}
            alt="Order"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.div
          className="p-6 border-2 border-blue-500 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="block mb-1 text-sm font-medium"
                >
                  Pickup Location
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={order.pickupLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block mb-1 text-sm font-medium"
                >
                  Destination
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.input
                  type="text"
                  id="destination"
                  name="destination"
                  value={order.destination}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="weight"
                  className="block mb-1 text-sm font-medium"
                >
                  Weight (kg)
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.input
                  type="number"
                  id="weight"
                  name="weight"
                  value={order.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-medium"
                >
                  Quantity
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={order.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="transportMethod"
                  className="block mb-1 text-sm font-medium"
                >
                  Transport Method
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.select
                  id="transportMethod"
                  name="transportMethod"
                  value={order.transportMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <option value="">Select a transport method</option>
                  <option value="Air">Air</option>
                  <option value="Sea">Sea</option>
                  <option value="Land">Land</option>
                </motion.select>
              </div>
              <div>
                <label
                  htmlFor="pricingId"
                  className="block mb-1 text-sm font-medium"
                >
                  Pricing Method
                  <FaInfoCircle className="inline ml-1 text-blue-500" />
                </label>
                <motion.select
                  id="pricingId"
                  name="pricingId"
                  value={order.pricingId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <option value="">Select a pricing method</option>
                  {pricingOptions.map((option) => (
                    <option key={option.priceId} value={option.priceId}>
                      {option.transportMethod} -{' '}
                      {option.pricePerKg.toLocaleString('vi-VN')}đ/kg
                    </option>
                  ))}
                </motion.select>
              </div>
            </div>
            <div>
              <label
                htmlFor="additionalServices"
                className="block mb-1 text-sm font-medium"
              >
                Additional Services
                <FaInfoCircle className="inline ml-1 text-blue-500" />
              </label>
              <motion.input
                type="text"
                id="additionalServices"
                name="additionalServices"
                value={order.additionalServices}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium">
                Total Price
                <FaInfoCircle className="inline ml-1 text-blue-500" />
              </label>
              <motion.div
                className="w-full px-3 py-2 text-sm border rounded-md bg-gray-100 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                {order.total.toLocaleString('vi-VN')}đ
              </motion.div>
            </div>
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-green-500 hover:via-blue-600 hover:to-purple-700 transition-colors w-full mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Create Order
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateOrder;
