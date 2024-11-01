import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gray-50">
      <div className="flex flex-col items-center max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mb-8 text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>

        <p className="mb-8 text-gray-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
