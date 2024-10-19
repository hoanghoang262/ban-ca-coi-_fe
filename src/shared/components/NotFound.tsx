import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCompass } from 'react-icons/fa';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <FaCompass className="text-8xl text-white mb-8" />
        <h1 className="text-6xl font-bold mb-4 text-white">Oops!</h1>
        <h2 className="text-3xl font-semibold mb-8 text-white">
          We couldn't find that page
        </h2>
        <p className="text-xl mb-8 text-white max-w-lg">
          The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track!
        </p>
        <Link
          to="/"
          className="bg-white text-blue-500 px-8 py-3 rounded-md text-xl font-semibold hover:bg-blue-100 transition-colors"
        >
          Take Me Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
