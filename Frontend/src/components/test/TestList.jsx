import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USERENDPOINTS } from '../../constants/ApiConstants';

const TestList = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                // Replace the URL with your actual API endpoint
                const response = await axios.get(USERENDPOINTS.GETTEST);
                console.log(response.data);
                
                setTests(response.data.data);
            } catch (err) {
                setError('Error fetching tests');
                console.error('Error fetching tests:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTests();
    }, []);

    if (loading) 
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-600">Loading tests...</p>
            </div>
        );

    if (error) 
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg mb-8 mt-[20vh] min-h-screen ">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Tests</h2>
            {tests.length > 0 ? (
                <ul className="space-y-4">
                    {tests.map(test => (
                        <li key={test._id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <a 
                                href={`/test/${test._id}`}
                                className="text-lg font-medium text-blue-600 hover:text-blue-800"
                            >
                                {test.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 text-center">No tests available.</p>
            )}
        </div>
    );
};

export default TestList;
