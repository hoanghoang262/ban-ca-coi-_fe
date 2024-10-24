import React from 'react';
import { PricingPackage } from '../PriceManager';
import { FaTimes } from 'react-icons/fa';

interface PriceModalProps {
  showModal: boolean;
  selectedPackage: PricingPackage | null;
  editPackage: PricingPackage | null;
  setEditPackage: React.Dispatch<React.SetStateAction<PricingPackage | null>>;
  handleUpdate: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  transportMethods: string[]; // Add transportMethods prop
}

const PriceModal: React.FC<PriceModalProps> = ({
  showModal,
  selectedPackage,
  editPackage,
  setEditPackage,
  handleUpdate,
  setShowModal,
  transportMethods, // Destructure transportMethods
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-lg">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
        {selectedPackage && (
          <div className="mb-4">
            <p className="mb-2">
              <strong>Transport Method:</strong>{' '}
              {selectedPackage.transportMethod}
            </p>
            <p className="mb-2">
              <strong>Weight Range:</strong> {selectedPackage.weightRange}
            </p>
            <p className="mb-2">
              <strong>Price per Kg:</strong> $
              {selectedPackage.pricePerKg.toFixed(2)}
            </p>
            <p className="mb-2">
              <strong>Additional Service Price:</strong> $
              {selectedPackage.additionalServicePrice.toFixed(2)}
            </p>
          </div>
        )}
        {editPackage && (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Transport Method:</span>
              <select
                value={editPackage.transportMethod}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    transportMethod: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              >
                {transportMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Weight Range:</span>
              <input
                type="text"
                value={editPackage.weightRange}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    weightRange: e.target.value,
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Price per Kg:</span>
              <input
                type="number"
                value={editPackage.pricePerKg}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    pricePerKg: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Additional Service Price:</span>
              <input
                type="number"
                value={editPackage.additionalServicePrice}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    additionalServicePrice: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </label>
            <button
              onClick={handleUpdate}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        )}
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PriceModal;
