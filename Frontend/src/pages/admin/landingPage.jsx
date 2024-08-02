import React, { useEffect, useState } from 'react';

// Mock data
const mockCounts = {
    tests: 10,
    users: 50,
    results: 200
};

const AdminLandingPage = () => {
    const [testCount, setTestCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [resultCount, setResultCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [demoMode, setDemoMode] = useState(true); // Set to true for demo mode

    useEffect(() => {
        const fetchCounts = async () => {
            if (demoMode) {
                // Use mock data for demo mode
                setTestCount(mockCounts.tests);
                setUserCount(mockCounts.users);
                setResultCount(mockCounts.results);
                setLoading(false);
                return;
            }

            try {
                // Replace with real API calls if demoMode is false
                const testResponse = await axios.get('/api/tests/count'); // Replace with actual endpoint
                const userResponse = await axios.get('/api/users/count'); // Replace with actual endpoint
                const resultResponse = await axios.get('/api/results/count'); // Replace with actual endpoint

                setTestCount(testResponse.data.count);
                setUserCount(userResponse.data.count);
                setResultCount(resultResponse.data.count);
            } catch (err) {
                setError('Error fetching dashboard data');
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, [demoMode]);

    if (loading) 
        return (
            <div className="flex justify-center items-center min-h-screen ">
                <p className="text-lg text-gray-600">Loading dashboard...</p>
            </div>
        );

    if (error) 
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen ">
          

            {/* Dashboard Overview */}
            <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Tests</h2>
                    <p className="text-3xl font-semibold text-gray-600 mt-2">{testCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Users</h2>
                    <p className="text-3xl font-semibold text-gray-600 mt-2">{userCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800">Total Results</h2>
                    <p className="text-3xl font-semibold text-gray-600 mt-2">{resultCount}</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h2>
                <div className="flex justify-around">
                    <a 
                        href="/admin/test" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-center"
                    >
                        Manage Tests
                    </a>
                    <a 
                        href="/admin/resultlist" 
                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 text-center"
                    >
                        View Results
                    </a>
                    <a 
                        href="/admin/users" 
                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 text-center"
                    >
                        Manage Users
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLandingPage;
