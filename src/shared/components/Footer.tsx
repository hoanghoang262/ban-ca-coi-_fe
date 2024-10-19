import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-2xl font-semibold mb-4">Koi Fish Store</h4>
            <p>
              Specializing in high-quality Koi fish and dedicated care services.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-200 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-200 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-200 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-blue-700 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>&copy; 2024 Koi Fish Store. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
