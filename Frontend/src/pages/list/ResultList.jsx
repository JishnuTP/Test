import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ADMINENDPOINTS } from '../../constants/ApiConstants'; // Adjust the import path as necessary
import { mainContext } from '../../context/mainContex';

const ResultList = () => {
    const { token } = useContext(mainContext);
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        testName: '',
        status: ''
    });

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`, // Include token or other headers if needed
                    'Content-Type': 'application/json'
                };

                const response = await axios.get(ADMINENDPOINTS.GETRESULTS, { headers });
                console.log(response.data);

                // Ensure 'data' property contains the results
                setResults(response.data.data);
                setFilteredResults(response.data.data);
            } catch (err) {
                setError('Error fetching results');
                console.error('Error fetching results:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [token]);

    useEffect(() => {
        // Apply filter based on test name and result status
        let tempResults = results;

        if (filter.testName) {
            tempResults = tempResults.filter(result =>
                result.testName.toLowerCase().includes(filter.testName.toLowerCase())
            );
        }

        if (filter.status) {
            tempResults = tempResults.filter(result => {
                const passed = result.score >= 2;
                return filter.status === 'Passed' ? passed : !passed;
            });
        }

        setFilteredResults(tempResults);
    }, [filter, results]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    const handlePublishAll = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // Publish all filtered results
            const publishRequests = filteredResults.map(result =>
                axios.patch(`${ADMINENDPOINTS.UPDATESTATUS}/${result._id}`, { status: 'published' }, { headers })
            );

            await Promise.all(publishRequests);

            // Fetch the updated results
            const response = await axios.get(ADMINENDPOINTS.GETRESULTS, { headers });
            setResults(response.data.data);
            setFilteredResults(response.data.data);
            alert('All results have been published');
        } catch (err) {
            alert('Error publishing all results');
            console.error('Error publishing all results:', err);
        }
    };

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
        <div className="min-h-screen max-w-auto bg-gray-100 p-6">
            {/* Filter Section */}
            <div className="max-w-auto mx-auto bg-white rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Results</h2>
                
                <div className="p-6 flex flex-col lg:flex-row lg:justify-between bg-gray-50 rounded-t-lg">
                    <div className="flex items-center mb-4 lg:mb-0">
                        <label htmlFor="testName" className="mr-2 text-lg">Filter by Test Name:</label>
                        <input
                            type="text"
                            id="testName"
                            name="testName"
                            value={filter.testName}
                            onChange={handleFilterChange}
                            className="border px-4 py-2 rounded-lg text-sm lg:text-base w-full lg:w-1/3"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="status" className="mr-2 text-lg">Filter by Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={filter.status}
                            onChange={handleFilterChange}
                            className="border px-4 py-2 rounded-lg text-sm lg:text-base w-full lg:w-1/3"
                        >
                            <option value="">All</option>
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>
                </div>

                {/* Publish All Button */}
                <div className="text-center mb-4">
                    <button
                        onClick={handlePublishAll}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Publish All
                    </button>
                </div>
                
                {/* Results Table */}
                {filteredResults.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg mt-6">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border-b px-4 py-2 text-left">Test Title</th>
                                    <th className="border-b px-4 py-2 text-left">User ID</th>
                                    <th className="border-b px-4 py-2 text-left">Score</th>
                                    <th className="border-b px-4 py-2 text-left">Status</th>
                                    <th className="border-b px-4 py-2 text-left">Publish/Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((result) => (
                                    <tr key={result._id} className={result.score < 2 ? 'bg-red-100' : ''}>
                                        <td className="border-b px-4 py-2">{result.testName}</td>
                                        <td className="border-b px-4 py-2">{result.userId}</td>
                                        <td className="border-b px-4 py-2">{result.score}</td>
                                        <td className="border-b px-4 py-2">
                                            {result.score >= 2 ? 'Passed' : <span className="text-red-600">Failed</span>}
                                        </td>
                                        <td className="border-b px-4 py-2">{result.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-6">No results available.</p>
                )}
            </div>
        </div>
    );
};

export default ResultList;
