import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlane, FaTruck } from 'react-icons/fa';
import { PricingPackage } from '../PriceManager';

interface PriceTableProps {
  currentItems: PricingPackage[];
  handleEdit: (packageId: number) => void;
  handleDelete: (packageId: number) => void;
  handleRowClick: (pkg: PricingPackage) => void;
}

const PriceTable: React.FC<PriceTableProps> = ({
  currentItems,
  handleEdit,
  handleDelete,
  handleRowClick,
}) => {
  return (
    <motion.table
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full border-collapse border border-gray-300"
    >
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-300">Transport Method</th>
          <th className="px-4 py-2 border border-gray-300">Weight Range</th>
          <th className="px-4 py-2 border border-gray-300">Price per Kg</th>
          <th className="px-4 py-2 border border-gray-300">
            Additional Service Price
          </th>
          <th className="px-4 py-2 border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((pkg) => (
          <motion.tr
            key={pkg.priceId}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleRowClick(pkg)}
            className="cursor-pointer"
          >
            <td className="border px-4 py-2 flex items-center">
              {pkg.transportMethod === 'Air' ? (
                <FaPlane className="text-blue-500 mr-2" />
              ) : (
                <FaTruck className="text-green-500 mr-2" />
              )}
              {pkg.transportMethod}
            </td>
            <td className="border px-4 py-2">{pkg.weightRange}</td>
            <td className="border px-4 py-2">${pkg.pricePerKg.toFixed(2)}</td>
            <td className="border px-4 py-2">
              ${pkg.additionalServicePrice.toFixed(2)}
            </td>
            <td className="border px-4 py-2">
              <motion.button
                onClick={() => handleEdit(pkg.priceId)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                <FaEdit />
              </motion.button>
              <motion.button
                onClick={() => handleDelete(pkg.priceId)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </motion.button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
};

export default PriceTable;
