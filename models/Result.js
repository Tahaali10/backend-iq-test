const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  affiliate_name: { type: String, default: '' },
  group_name: { type: String, required: true },
  category: { type: String, required: true },
  percentage: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);