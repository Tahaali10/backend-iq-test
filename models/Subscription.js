const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // Allow HTML
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  duration_days: { type: Number, required: true },
  certificate_limit: { type: Number, default: null },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);