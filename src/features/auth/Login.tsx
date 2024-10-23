import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaFish, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { accessTokenState, userInfoState } from '../../shared/state/atom';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Account/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        }
      );
      console.log('Login successful:', response.data);
      const token = response.data.token;
      setAccessToken(token);
      localStorage.setItem('token', token);

      // Decode the JWT token
      const decodedToken: any = jwtDecode(token);

      // Save user info in local state and local storage
      const userInfo = {
        id: decodedToken.nameid,
        email: decodedToken.email,
        name: decodedToken.unique_name,
        role: decodedToken.role,
        exp: decodedToken.exp,
      };
      setUserInfo(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials and try again.');
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
          Welcome Back to FishMart
        </h3>
        <p className="text-center text-gray-600 mt-2">
          Login to access your aquatic paradise
        </p>
        <motion.form
          onSubmit={handleSubmit}
          className="mt-8"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-6">
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
                  className="block w-full pl-10 pr-3 py-3 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter your password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-3 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                type="submit"
              >
                Sign in
              </motion.button>
            </div>
          </div>
        </motion.form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Not a member?{' '}
          <Link
            to="/auth/register"
            className="font-medium text-blue-600 hover:text-purple-500 transition-colors duration-300"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
