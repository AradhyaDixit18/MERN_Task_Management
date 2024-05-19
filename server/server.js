const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Board = require('./models/Board');
const List = require('./models/List');
const Task = require('./models/Task');



const app = express();
const port = process.env.PORT; // Change the port here

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));






// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Authentication Routes
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, email });
  await newUser.save();
  res.status(201).send('User created');
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid username or password');
  }
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
  res.json({ token });
});

// Task Management Routes
app.get('/api/boards', async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

app.post('/api/boards', async (req, res) => {
  const { name, userId } = req.body;
  const newBoard = new Board({ name, userId });
  await newBoard.save();
  res.status(201).json(newBoard);
});

app.get('/api/lists/:boardId', async (req, res) => {
  const lists = await List.find({ boardId: req.params.boardId });
  res.json(lists);
});

app.post('/api/lists', async (req, res) => {
  const { name, boardId } = req.body;
  const newList = new List({ name, boardId });
  await newList.save();
  res.status(201).json(newList);
});

app.get('/api/tasks/:listId', async (req, res) => {
  const tasks = await Task.find({ listId: req.params.listId });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { name, listId, dueDate, status } = req.body;
  const newTask = new Task({ name, listId, dueDate, status });
  await newTask.save();
  res.status(201).json(newTask);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

