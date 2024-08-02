import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../constants/ApiConstants';
import { mainContext } from "../../context/mainContex";

const TestDetail = () => {
    const { id } = useParams();
    const { user,token } = useContext(mainContext);
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [alreadyCompleted, setAlreadyCompleted] = useState(false);
    const navigate = useNavigate();

   
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`, // Include token or other headers if needed
                    'Content-Type': 'application/json'
                };
                const response = await axios.get("https://test-api-sable-two.vercel.app/api/user/getTestDetail/ ",{
            headers,
            params: {
                id: id // Send `id` as a query parameter
            }
        });
                setTest(response.data);
            } catch (err) {
                alert('Error fetching test details');
                console.error('Error fetching test details:', err);
            }

        };

        const checkTestCompletion = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${token}`, // Include token or other headers if needed
                    'Content-Type': 'application/json'
                };
                const response = await axios.get(USERENDPOINTS.CHECKTESTCOMPLETION, {
                    params: { userId: user._id, testId: id },headers
                });
                if (response.data.completed) {
                    setAlreadyCompleted(true);
                } else {
                    fetchTest();
                }
            } catch (err) {
                alert('Error checking test completion');
                console.error('Error checking test completion:', err);
            }
        };

        if (user._id) {
            checkTestCompletion();
        } else {
            navigate("/login");
        }
    }, [id, user._id, navigate]);

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user._id) {
            alert('User not logged in');
            navigate("/login");
            return;
        }

        let score = 0;
        test.questions.forEach((q, index) => {
            if (answers[`question_${index}`] === q.answer) {
                score += 1;
            }
        });

        try {
          

            await axios.post(USERENDPOINTS.SUBMITANSWERS, {
                userId: user._id,
                testId: id,
                testName: test.title,
                score
            },);
            alert('Test submitted successfully.');
            navigate("/"); // Redirect to home after submission
        } catch (err) {
            alert('Error submitting test');
            console.error('Error submitting test:', err);
        }
    };

    if (alreadyCompleted) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <p className="text-lg text-gray-600">You have already completed this test.</p>
            </div>
        );
    }

    if (!test) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-100"><p className="text-lg text-gray-600">Loading...</p></div>;
    }

    return (
        <div>
            <div className="relative mb-8">
                <img 
                    src="https://a.storyblok.com/f/120497/2400x1254/bb7255f9dc/testportal.png"
                    alt="Test Banner"
                    className="w-full h-[30vh] object-cover rounded-b-lg shadow-md"
                />
            </div>
            <div className="p-6 max-w-4xl mx-auto bg-gray-100 mb-8 mt-[10vh] rounded-lg shadow-lg min-h-screen">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{test.title}</h2>
                <p className='text-center'>{test.description}</p>
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
        </div>
    );
};

export default TestDetail;
