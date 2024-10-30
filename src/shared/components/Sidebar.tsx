import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaChartPie,
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaFileInvoice,
  FaTruck,
  FaMoneyBill,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    path: '/admin/pricing',
    icon: <FaMoneyBill className="mr-4 text-2xl" />,
    label: 'Pricing',
  },
  {
    path: '/admin/blog',
    icon: <FaFileInvoice className="mr-4 text-2xl" />,
    label: 'Blog',
  },
];

const Sidebar: React.FC = () => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 shadow-lg min-h-screen"
    >
      <Link to="/admin" className="flex items-center mb-8">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <FaChartPie className="mr-2 text-4xl text-blue-400" />
        </motion.div>
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          FishMart
        </h2>
      </Link>
      <nav>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className="flex items-center text-lg hover:text-blue-400 transition-colors duration-300"
              >
                {item.icon}
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
