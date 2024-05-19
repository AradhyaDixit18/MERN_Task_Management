const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: String,
  user_id: mongoose.Schema.Types.ObjectId,
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
