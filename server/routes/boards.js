const express = require('express');
const Board = require('../models/Board');
const { checkAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  const boards = await Board.find({ user_id: req.user.userId });
  res.json(boards);
});

router.post('/', checkAuth, async (req, res) => {
  const { name } = req.body;
  const newBoard = new Board({ name, user_id: req.user.userId });
  await newBoard.save();
  res.json(newBoard);
});

module.exports = router;
