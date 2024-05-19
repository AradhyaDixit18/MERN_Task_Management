const express = require('express');
const List = require('../models/List');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, board_id } = req.body;
  try {
    const list = new List({ name, board_id });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:boardId', async (req, res) => {
  try {
    const lists = await List.find({ board_id: req.params.boardId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
