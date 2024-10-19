import React from 'react';
import { PricingPackage } from '../PriceManager';

interface PriceModalProps {
  showModal: boolean;
  selectedPackage: PricingPackage | null;
  editPackage: PricingPackage | null;
  setEditPackage: React.Dispatch<React.SetStateAction<PricingPackage | null>>;
  handleUpdate: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceModal: React.FC<PriceModalProps> = ({
  showModal,
  selectedPackage,
  editPackage,
  setEditPackage,
  handleUpdate,
  setShowModal,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Package Details</h2>
        {selectedPackage && (
          <div>
            <p>
              <strong>Transport Method:</strong>{' '}
              {selectedPackage.transportMethod}
            </p>
            <p>
              <strong>Weight Range:</strong> {selectedPackage.weightRange}
            </p>
            <p>
              <strong>Price per Kg:</strong> $
              {selectedPackage.pricePerKg.toFixed(2)}
            </p>
            <p>
              <strong>Additional Service Price:</strong> $
              {selectedPackage.additionalServicePrice.toFixed(2)}
            </p>
          </div>
        )}
        {editPackage && (
          <div>
            <label>
              Transport Method:
              <input
                type="text"
                value={editPackage.transportMethod}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    transportMethod: e.target.value,
                  })
                }
                className="border p-2"
              />
            </label>
            <label>
              Weight Range:
              <input
                type="text"
                value={editPackage.weightRange}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    weightRange: e.target.value,
                  })
                }
                className="border p-2"
              />
            </label>
            <label>
              Price per Kg:
              <input
                type="number"
                value={editPackage.pricePerKg}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    pricePerKg: parseFloat(e.target.value),
                  })
                }
                className="border p-2"
              />
            </label>
            <label>
              Additional Service Price:
              <input
                type="number"
                value={editPackage.additionalServicePrice}
                onChange={(e) =>
                  setEditPackage({
                    ...editPackage,
                    additionalServicePrice: parseFloat(e.target.value),
                  })
                }
                className="border p-2"
              />
            </label>
            <button
              onClick={handleUpdate}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        )}
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PriceModal;
