import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Boards from './pages/Boards';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 bg-blue-500 dark:bg-blue-700 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Task Management App</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/boards" element={<Boards />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
