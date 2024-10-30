import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaFish,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../shared/state/atom';
import { jwtDecode } from 'jwt-decode';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/Account/register`,
        { email, password, name, phoneNumber, address },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );
      console.log('Registration successful:', response.data);
      const token = response.data.data.token;
      localStorage.setItem('token', token);

      // Decode the JWT token
      const decodedToken: any = jwtDecode(token);

      // Set user info from the decoded token
      setUserInfo({
        id: decodedToken.id,
        name: decodedToken.unique_name,
        email: decodedToken.email,
        role: decodedToken.role,
        exp: decodedToken.exp,
      });

      toast.success('Registration successful! You are now logged in.');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, delay: 0.4 } },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-12 py-8 mt-4 text-left bg-white shadow-2xl rounded-xl w-full max-w-xl">
        <motion.div
          className="flex justify-center"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
          >
            <FaFish className="w-32 h-32 text-blue-600" />
          </motion.div>
        </motion.div>
        <h3 className="text-4xl font-extrabold text-center mt-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          Join FishMart Today
        </h3>
        <p className="text-center text-gray-600 mt-2">
          Create an account to start your aquatic journey
        </p>
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4">
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-green-500 animate-bounce" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-blue-500 animate-bounce" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  id="email"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-yellow-500 animate-bounce" />
                </div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  id="phoneNumber"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-red-500 animate-bounce" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your address"
                  id="address"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-purple-500 animate-pulse" />
                </div>
                <input
                  type="password"
                  placeholder="Create a password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-pink-500 animate-pulse" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  id="confirmPassword"
                  className="block w-full pl-10 pr-3 py-2 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                type="submit"
              >
                Sign up
              </motion.button>
            </div>
          </div>
        </motion.form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-purple-500 transition-colors duration-300"
          >
            Log in here
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
