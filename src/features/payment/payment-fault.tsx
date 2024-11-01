import { useNavigate } from 'react-router-dom';

const PaymentFault = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-gray-50">
      <div className="flex flex-col items-center max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 mb-8 text-red-500">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Payment Failed
        </h1>

        <p className="mb-8 text-gray-600">
          We're sorry, but there was an error processing your payment. Please
          try again or contact support if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate('/order')}
            className="px-6 py-3 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Return to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFault;
