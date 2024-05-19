const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  list_id: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  due_date: { type: Date, required: false },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
