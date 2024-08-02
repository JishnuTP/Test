import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ADMINENDPOINTS, USERENDPOINTS } from '../../constants/ApiConstants';
import { mainContext } from '../../context/mainContex';

const AdminAddTest = () => {
    const { token } = useContext(mainContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], answer: '' }]);
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

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = event.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], answer: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            await axios.post(ADMINENDPOINTS.ADDTEST, { title, description, questions }, { headers });
            alert('Test added successfully');
            setTitle('');
            setDescription('');
            setQuestions([{ questionText: '', options: ['', '', '', ''], answer: '' }]);
            // Fetch the updated list of tests
            const response = await axios.get(USERENDPOINTS.GETTEST, { headers });
            setTests(response.data.data);
        } catch (err) {
            alert('Error adding test');
        }
    };

    const handleDelete = async (id) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            await axios.delete(`${ADMINENDPOINTS.DELETETEST}/${id}`, { headers });
            alert('Test deleted successfully');
            // Fetch the updated list of tests
            const response = await axios.get(USERENDPOINTS.GETTEST, { headers });
            setTests(response.data.data);
        } catch (err) {
            alert('Error deleting test');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Test</h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Test Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="2"
                    />
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-4 border border-gray-300 p-4 rounded-md shadow-sm">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Question {qIndex + 1}:</label>
                            <input
                                type="text"
                                name="questionText"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <label className="text-xs text-gray-600">Option {oIndex + 1}</label>
                            </div>
                        ))}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Answer:</label>
                            <input
                                type="text"
                                value={question.answer}
                                onChange={(e) => handleAnswerChange(qIndex, e)}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                ))}
                <div className="flex space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit Test
                    </button>
                </div>
            </form>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-center text-gray-800">Existing Tests</h2>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : tests.length > 0 ? (
                <ul className="space-y-4">
                    {tests.map(test => (
                        <li key={test._id} className="flex justify-between items-center bg-white border border-gray-300 p-4 rounded-md shadow-sm">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">{test.title}</h3>
                                <p className="text-sm text-gray-600">{test.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(test._id)}
                                className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-gray-500">No tests available</div>
            )}
        </div>
    );
};

export default AdminAddTest;
