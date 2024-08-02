import React, { useState } from 'react';
import axios from 'axios';
import { ADMINENDPOINTS } from '../../constants/ApiConstants';

const AdminAddTest = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], answer: '' }]);

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
        console.log(title, description, questions );
        
        event.preventDefault();
        try {
            await axios.post(ADMINENDPOINTS.ADDTEST, { title, description, questions });
            alert('Test added successfully');
        } catch (err) {
            alert('Error adding test');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add New Test</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-700">Test Title:</label>
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
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-4 border border-gray-300 p-4 rounded-lg">
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Question {qIndex + 1}:</label>
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
                            <div key={oIndex} className="space-y-2">
                                <label className="block text-lg font-medium text-gray-700">Option {oIndex + 1}:</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        ))}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">Answer:</label>
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
                <div className="space-x-4">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit Test
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddTest;
