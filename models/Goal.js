const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
