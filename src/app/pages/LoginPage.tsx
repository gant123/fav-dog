// src/pages/LoginPage.tsx

import React, { useState } from 'react';

import { login } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, email);
      toast.success('Login successful!');
      navigate('/search');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Hero Section */}
      <div className="absolute inset-0 z-0">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      </div>

      {/* Hero Text */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-lg">
          Welcome to the Dog Adoption Project
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl drop-shadow-md">
          Find your new best friend among thousands of adoptable shelter dogs.
          Join our community of dog lovers and discover your perfect pup!
        </p>
      </div>

      {/* Login Card */}
      <div className="relative z-20 flex items-center justify-center px-4 mb-12">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Login
          </h2>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <p className="text-center text-gray-600 text-sm mt-4">
              Log in to access your personalized dog search and adoption
              matching service.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
