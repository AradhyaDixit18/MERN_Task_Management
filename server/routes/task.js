const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, list_id, due_date, status } = req.body;
  try {
    const task = new Task({ name, list_id, due_date, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:listId', async (req, res) => {
  try {
    const tasks = await Task.find({ list_id: req.params.listId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
