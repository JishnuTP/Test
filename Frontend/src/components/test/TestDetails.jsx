import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../constants/ApiConstants';
import { mainContext } from "../../context/mainContex";


const TestDetail = () => {
    const { id } = useParams();
    const { user } = useContext(mainContext); // Assuming you have a UserContext
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get(`${USERENDPOINTS.GETTEST}/${id}`);
                setTest(response.data);
            } catch (err) {
                alert('Error fetching test details');
                console.error('Error fetching test details:', err);
            }
        };
        fetchTest();
    }, [id]);

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            alert('User not logged in');
            return;
        }

        // Calculate the score
        let score = 0;
        test.questions.forEach((q, index) => {
            if (answers[`question_${index}`] === q.answer) {
                score += 1;
            }
        });

        try {
            await axios.post(`${USERENDPOINTS.SUBMITANSWERS}`, {
                userId: user._id,
                testId: id,
                testName: test.title,
                score
            });
            alert(`Test submitted successfully. Your score is ${score}`);
        } catch (err) {
            alert('Error submitting test');
            console.error('Error submitting test:', err);
        }
    };

    if (!test) return <div className="flex justify-center items-center min-h-screen"><p className="text-lg text-gray-600">Loading...</p></div>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-100  mb-8 mt-[20vh] rounded-lg shadow-lg min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{test.title}</h2>
            <form onSubmit={handleSubmit}>
                {test.questions.map((q, index) => (
                    <div key={index} className="mb-6">
                        <p className="text-lg font-semibold text-gray-700 mb-2">{q.questionText}</p>
                        <div className="space-y-2">
                            {q.options.map((option, i) => (
                                <label key={i} className="block">
                                    <input
                                        type="radio"
                                        name={`question_${index}`}
                                        value={option}
                                        onChange={handleChange}
                                        checked={answers[`question_${index}`] === option}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex justify-center">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">Submit Test</button>
                </div>
            </form>
        </div>
    );
};

export default TestDetail;