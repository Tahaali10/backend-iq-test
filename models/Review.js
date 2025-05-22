const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerImageUrl: { type: String, required: true },
  englishReview: { type: String, required: true },
  turkishReview: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
