import React, { useEffect, useState } from 'react';

const ResultList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Mock result data
                const mockResults = [
                    { _id: '1', test: { title: 'Demo Test 1' }, score: 85 },
                    { _id: '2', test: { title: 'Demo Test 2' }, score: 90 },
                    { _id: '3', test: { title: 'Demo Test 3' }, score: 75 },
                ];

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Set mock data
                setResults(mockResults);
            } catch (err) {
                alert('Error fetching results');
            }
        };
        fetchResults();
    }, []);

    return (
        <div>
            <h2>Your Results</h2>
            <ul>
                {results.map(result => (
                    <li key={result._id}>
                        Test: {result.test.title} - Score: {result.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultList;
