import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
  const navigate= useNavigate()

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
      navigate("/login")
      
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
      console.log(error);

      // Show error toast message
      toast.error(error.response?.data?.msg || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Registration Form Section */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-gradient-to-r from-slate-500 to-yellow-700 text-white p-4 md:p-8"
        style={{ flexBasis: '40%' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md bg-black  bg-opacity-30 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center text-white mb-6 font-poppins font-semibold">
            REGISTER
          </h1>
          <p className='text-center p-4 mb-4'>Register with your valid Email.</p>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex space-x-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-4">
              <select
                className="w-full px-4 py-2 border border-gray-300 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-white">Already have an Account? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
             Login
            </Link>
          </div>
        </div>
      
      </motion.div>

      {/* Additional Content Section with Background Image */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        style={{
          flexBasis: '60%',
          backgroundImage: `url('https://i.pinimg.com/736x/11/d5/95/11d5953e68e6e41f024164d26c319e32.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
 <motion.div
      className="w-full max-w-3xl p-8 rounded-lg text-center text-black mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <AnimateName>

     
      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
        Welcome to Your Test Series Portal
      </h2>
      </AnimateName>
      
      <p className="mb-4 text-lg md:text-xl leading-relaxed">
        Prepare for success with our comprehensive test-taking platform. Whether you're preparing for exams or seeking to improve your skills, our portal offers a wide range of tests and practice materials to help you excel.
      </p>
      <p className="mb-4 text-lg md:text-xl leading-relaxed">
        Track your progress with detailed analytics, review your answers, and get personalized recommendations to enhance your learning experience. Our user-friendly interface makes it easy to start, take, and complete your tests.
      </p>
      <p className="mb-4 text-lg md:text-xl leading-relaxed">
        Join a community of learners and professionals committed to achieving their goals. Dive into our test series and discover how our platform can help you reach new heights in your academic or professional journey.
      </p>
    </motion.div>
      </motion.div>
    </div>
  );
}

export default Register;
