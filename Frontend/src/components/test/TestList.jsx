import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { USERENDPOINTS } from '../../constants/ApiConstants';
import { mainContext } from '../../context/mainContex';
import moment from 'moment'; // Import moment for date formatting

const TestList = () => {
    const { token } = useContext(mainContext);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };
                const response = await axios.get(USERENDPOINTS.GETTEST, { headers });
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
    }, [token]);

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
        <div className="min-h-screen bg-gray-100">
            {/* Image above the container */}
            <div className="relative">
                <img 
                    src="https://a.storyblok.com/f/120497/2400x1254/bb7255f9dc/testportal.png" // Replace with your image URL
                    alt="Banner"
                    className="w-full h-[30vh] object-cover rounded-b-lg shadow-md"
                />
            </div>

            {/* Test List Container */}
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-8 mt-8 lg:mt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Tests</h2>
                {tests.length > 0 ? (
                    <ul className="space-y-6">
                        {tests.map(test => (
                            <li key={test._id} className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <a 
                                    href={`/test/${test._id}`}
                                    className="block text-lg font-medium text-blue-600 hover:text-blue-800"
                                >
                                    {test.title}
                                </a>
                                <p className="text-gray-600 text-sm">
                                    Created on: {moment(test.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-center">No tests available.</p>
                )}
            </div>
        </div>
    );
};

export default TestList;
