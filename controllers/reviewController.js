const Review = require('../models/Review');

// POST - Add Review
exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add review', error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 });
    res.status(200).json({ reviews }); 
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reviews', error: error.message });
  }
};