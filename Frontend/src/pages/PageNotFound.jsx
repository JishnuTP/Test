import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6">
          <TriangleAlertIcon className="mx-auto h-20 w-20 text-red-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          We can’t seem to find the page you’re looking for. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-teal-500 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86l-7.07 12.4a1 1 0 0 0 .87 1.53h14.14a1 1 0 0 0 .87-1.53l-7.07-12.4a1 1 0 0 0-1.74 0zM12 9v4m0 4h.01" />
    </svg>
  );
}

export default NotFound;
