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
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/11/d5/95/11d5953e68e6e41f024164d26c319e32.jpg')`
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please log in to your account.</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
        </div>
      </motion.div>

      {/* Additional Content Section (Optional) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 text-center p-8 bg-black bg-opacity-60 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimateName>
          <h2 className="text-4xl font-extrabold mb-2 leading-tight">Welcome</h2>
        </AnimateName>
        <p className="text-sm mb-4">Prepare for success with our comprehensive test-taking platform. Whether you're preparing for exams or seeking to improve your skills, our portal offers a wide range of tests and practice materials to help you excel.</p>
        <p className="text-sm">Join us for a test-taking experience like no other.</p>
      </motion.div>
    </div>
  );
}
