import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Package,
  Info,
  DollarSign,
  X,
  Star,
  Gift,
  Heart,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';

interface PricingData {
  priceId: number;
  transportMethod: string;
  weightRange: string;
  pricePerKg: number;
  additionalServicePrice: number;
}

const ElegantPricingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [pricingData, setPricingData] = useState<PricingData[]>([]);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/Price/get-prices`
        );
        setPricingData(response.data.data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };

    fetchPricingData();
  }, []);

  const pricingPackages = pricingData.map((data) => ({
    name: `${data.transportMethod} Package`,
    description: `Ideal for shipments in the ${data.weightRange} range.`,
    basePrice: data.pricePerKg,
    shippingMethods: [data.transportMethod.toLowerCase()],
    features: [
      `Price per kg: $${data.pricePerKg}`,
      `Additional service price: $${data.additionalServicePrice}`,
    ],
  }));

  const shippingMethods: Record<
    string,
    { name: string; price: number; icon: React.ElementType }
  > = {
    air: { name: 'Air Shipping', price: 0, icon: Package },
    ground: { name: 'Ground Shipping', price: 0, icon: Truck },
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gradient-to-br from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-blue-900 text-center mb-12 tracking-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Choose Your Koi Package
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              }}
              className="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-bold text-blue-900">
                    {pkg.name}
                  </h3>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="ml-2"
                  >
                    <Star className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                </div>
                <p className="text-lg text-gray-600 mb-6">{pkg.description}</p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                      Base Price:
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ${pkg.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Package Includes:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 ml-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-blue-500" />
                      Shipping Methods:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 ml-6">
                      {pkg.shippingMethods.map((method) => (
                        <li key={method}>{shippingMethods[method]?.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      setSelectedPackage(
                        selectedPackage === index ? null : index
                      )
                    }
                    className="text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center"
                  >
                    <Info className="h-5 w-5 mr-1" />
                    More Info
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 flex items-center text-lg font-semibold"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Select Package
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPackage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedPackage(null)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
                <h3 className="text-3xl font-bold text-blue-900 mb-6">
                  {pricingPackages[selectedPackage]?.name}
                </h3>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600">
                    {pricingPackages[selectedPackage]?.description}
                  </p>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-4 flex items-center text-xl">
                      <DollarSign className="h-6 w-6 mr-2 text-blue-500" />
                      Price Breakdown:
                    </h4>
                    <p className="text-gray-700 text-lg">
                      Base Price: $
                      {pricingPackages[selectedPackage]?.basePrice.toFixed(2)}
                    </p>
                    <p className="text-gray-700 mt-4 text-lg">
                      Available Shipping Methods:
                    </p>
                    <ul className="list-disc list-inside ml-6 text-gray-700 mt-2">
                      {pricingPackages[selectedPackage]?.shippingMethods.map(
                        (method) => (
                          <li key={method} className="text-lg">
                            {shippingMethods[method]?.name}: $
                            {shippingMethods[method]?.price.toFixed(2)}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-4 flex items-center text-xl">
                      <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                      Package Includes:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 ml-6">
                      {pricingPackages[selectedPackage]?.features.map(
                        (feature, idx) => (
                          <li key={idx} className="text-lg">
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ElegantPricingPage;
