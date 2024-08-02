import { Link } from "react-router-dom";

const PageInProgress = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md text-center bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-spin mx-auto mb-4 h-16 w-16 text-blue-500">
          {/* Loader Circle Icon */}
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m0 14v1m7-7h1M3 12h1m10-7l.707-.707M5.707 5.707L6.414 6.414M18.364 18.364l.707.707M5.707 18.364L6.414 19.07"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-4">
          Page in Progress
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you the latest updates. Please check back
          soon.
        </p>
        <div>
          {/* Go to Homepage Link */}
          <Link
            to="/admin"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageInProgress;
