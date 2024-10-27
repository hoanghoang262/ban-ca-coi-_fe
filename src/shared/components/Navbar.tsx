import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaFish,
  FaInfoCircle,
  FaUserPlus,
  FaSignInAlt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaNewspaper,
  FaUser,
  FaFileAlt,
  FaTruck, // Import the shopping cart icon
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState, isLoggedInState } from '../state/atom';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: '/', icon: FaHome, text: 'Home', color: 'text-yellow-400' },
    {
      to: '/pricing',
      icon: FaFish,
      text: 'Pricing',
      color: 'text-green-400',
    },
    {
      to: '/order',
      icon: FaShoppingCart, // Use the shopping cart icon for the order
      text: 'Order',
      color: 'text-orange-400',
    },
    {
      to: '/blog',
      icon: FaNewspaper,
      text: 'Blog',
      color: 'text-purple-400',
    },
    {
      to: '/about',
      icon: FaInfoCircle,
      text: 'About',
      color: 'text-purple-400',
    },
  ];

  if (userInfo?.role === 'Admin') {
    navItems.push({
      to: '/admin',
      icon: FaCog,
      text: 'Admin',
      color: 'text-red-400',
    });
  }

  if (userInfo?.role === 'Sales Staff') {
    navItems.push({
      to: '/staff/sales',
      icon: FaUser,
      text: 'Sales',
      color: 'text-blue-400',
    });
  }

  if (userInfo?.role === 'Delivering Staff') {
    navItems.push({
      to: '/staff/delivering',
      icon: FaTruck,
      text: 'Delivering',
      color: 'text-green-400',
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-24 z-50 shadow-lg"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-300"
            onClick={handleNavItemClick}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <FaFish className="text-4xl text-yellow-300" />
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
              FishMart
            </span>
          </Link>
          <ul className="flex space-x-12">
            {navItems.map((item) => (
              <motion.li
                key={item.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={`flex items-center space-x-3 hover:${item.color} transition-colors duration-300`}
                  onMouseEnter={() => setIsHovered(item.to)}
                  onMouseLeave={() => setIsHovered('')}
                  onClick={handleNavItemClick}
                >
                  <item.icon className={`text-2xl ${item.color}`} />
                  <motion.span
                    className={`text-lg font-semibold ${item.color}`}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: isHovered === item.to ? 'auto' : 0,
                      opacity: isHovered === item.to ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.text}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="flex space-x-6">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-colors duration-300 text-lg font-semibold cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaUserCircle className="text-xl" />
                  <span>{userInfo?.name}</span>
                </motion.div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    >
                      <Link
                        to="/settings"
                        className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleNavItemClick}
                      >
                        <FaCog className="mr-2" /> Settings
                      </Link>
                      <Link
                        to="/profile"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleNavItemClick}
                      >
                        <FaUser className="mr-2" /> Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          handleNavItemClick();
                        }}
                        className=" w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth/login"
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-colors duration-300 text-lg font-semibold"
                    onClick={handleNavItemClick}
                  >
                    <FaSignInAlt className="text-xl" />
                    <span>Login</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/auth/register"
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-blue-600 transition-colors duration-300 text-lg font-semibold"
                    onClick={handleNavItemClick}
                  >
                    <FaUserPlus className="text-xl" />
                    <span>Register</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.nav>
      <div className="h-24"></div>{' '}
      {/* Spacer div to prevent content from being hidden under the navbar */}
    </>
  );
};

export default Navbar;
