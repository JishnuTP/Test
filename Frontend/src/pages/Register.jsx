import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AnimateName from '../context/animateName';
import { API_BASE_URL } from '../constants/ApiConstants';
import { toast } from 'react-toastify';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { firstName, lastName, email, password, role };
      const { data } = await axios.post(`${API_BASE_URL}auth/register`, userData);
      console.log('Registered user:', data);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setRole('user');

      // Show success toast message
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
      console.log(error);

      // Show error toast message
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/11/d5/95/11d5953e68e6e41f024164d26c319e32.jpg')`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Registration Form Section */}
      <motion.div
        className="relative z-10 w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <p className="text-center text-gray-600 mb-6">Register with your valid Email.</p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-2 border-2 border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
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

export default Register;
