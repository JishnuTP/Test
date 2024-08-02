import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimateName from '../context/animateName';
import { API_BASE_URL } from '../constants/ApiConstants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setToken } = useContext(mainContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
      const { token, user } = response.data;
      
      // Save token and user to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update context with token
      setToken(token);
  
     
        navigate('/'); // Redirect regular users to the home page
   
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
      console.log(error);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Login Form Section */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-gradient-to-r from-slate-500 to-yellow-700 text-white p-4 md:p-8"
        style={{ flexBasis: '40%' }} // Increased width for login section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full  max-w-md bg-black p-4 rounded-lg bg-opacity-30 shadow-lg">
          <h1 className="text-3xl text-center text-white-800 mb-4">LOGIN</h1>
          <p className='text-center p-4 mb-4'>Welcome back..!</p>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email.."
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-white">Don't have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Additional Content Section with Background Image */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        style={{
          flexBasis: '60%', // Adjusted width to match the login section increase
          backgroundImage: `url('https://i.pinimg.com/736x/11/d5/95/11d5953e68e6e41f024164d26c319e32.jpg')`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
       

       
       <motion.div
      className="w-full max-w-3xl p-8 bg-transparent-to-r from-gray-800 to-black rounded-lg text-center  mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
       <AnimateName>
      <h2 className="text-4xl md:text-5xl font-extrabold  text-balck mb-6 leading-tight tracking-tight">
        Welcome
      </h2>
      </AnimateName>
      <p className="mb-4 text-lg md:text-xl leading-relaxed">
        Prepare for success with our comprehensive test-taking platform. Whether you're preparing for exams or seeking to improve your skills, our portal offers a wide range of tests and practice materials to help you excel.
      </p>
      <p className="mb-4 text-lg text-balck md:text-xl leading-relaxed">
        Join For Test
      </p>
      <p className="mb-4 text-lg text-balck md:text-xl leading-relaxed">
      Join.!   </p>
    </motion.div>
    
      </motion.div>
    </div>
  );
}
