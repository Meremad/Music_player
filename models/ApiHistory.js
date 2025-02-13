const mongoose = require('mongoose');

const apiHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  endpoint: String,
  query: String,
  result: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiHistory', apiHistorySchema);