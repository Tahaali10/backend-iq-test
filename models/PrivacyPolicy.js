const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
