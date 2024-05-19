import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Boards() {
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get('http://localhost:12331/api/boards');
      setBoards(response.data);
    };
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:12312/api/boards', { name: newBoardName }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewBoardName('');
    const response = await axios.get('http://localhost:12331/api/boards');
    setBoards(response.data);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Boards</h2>
      <form onSubmit={handleCreateBoard} className="mb-4">
        <input
          type="text"
          placeholder="New board name"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full transition duration-300 ease-in-out hover:bg-blue-600 dark:hover:bg-blue-700">
          Create Board
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <div key={board._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <h3 className="text-xl font-bold">{board.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;
