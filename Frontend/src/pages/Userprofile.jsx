// components/UserProfile.js
import React, { useContext, useState } from 'react';

import { mainContext } from '../context/mainContex';

const Userprofile = () => {
  const { user } = useContext(mainContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 min-h-full">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Userprofile;
