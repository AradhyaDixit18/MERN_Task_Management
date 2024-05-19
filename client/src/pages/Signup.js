import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://mern-task-management-eight.vercel.app//signup', { username, email, password });
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 mt-10 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
