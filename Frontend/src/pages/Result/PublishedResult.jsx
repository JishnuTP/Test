import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { USERENDPOINTS } from '../../constants/ApiConstants'; // Adjust the import path as necessary
import { mainContext } from '../../context/mainContex';

const PublishedResultsPage = () => {
    const { user, token } = useContext(mainContext); // Use user context to get user ID
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!user?._id) {
                // If no user ID, handle the error or redirect
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const headers = {
                    'Authorization': `Bearer ${token}`, // Include token or other headers if needed
                    'Content-Type': 'application/json'
                };

                // Fetch results for the logged-in user with headers
                const response = await axios.get(USERENDPOINTS.GETPUBLISHEDRESULTS, {
                    params: { userId: user._id },
                    headers
                });
                console.log(response.data);
                
                setResults(response.data.data);
            } catch (err) {
                setError('Error fetching results');
                console.error('Error fetching results:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [user, token]);

    if (loading) 
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Loading results...</p>
            </div>
        );

    if (error) 
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="relative bg-blue-600 text-white py-8">
                <h1 className="text-4xl font-bold text-center">Published Results</h1>
            </div>

            {/* Results List Container */}
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-8 mt-8 lg:mt-16">
                {results.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Test Title</th>
                                <th className="border-b px-4 py-2 text-left">Score</th>
                                <th className="border-b px-4 py-2 text-left">Status</th> {/* New column for status */}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result._id}>
                                    <td className="border-b px-4 py-2">{result.testName}</td>
                                    <td className="border-b px-4 py-2">{result.score}</td>
                                    <td className="border-b px-4 py-2">
                                        {/* Conditional rendering for status */}
                                        {result.score >= 2 ? (
                                            <span className="text-green-600 font-semibold">Passed</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Failed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600 text-center">No published results available.</p>
                )}
            </div>
        </div>
    );
};

export default PublishedResultsPage;
