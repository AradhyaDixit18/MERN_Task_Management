const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }
});

module.exports = mongoose.model('List', listSchema);
