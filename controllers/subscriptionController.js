const Subscription = require('../models/Subscription');

// Get all active subscriptions (not deleted)
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ is_deleted: false }).sort({ price: 1 });
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { name, description, slug, price, duration_days, certificate_limit } = req.body;

    // Check if slug already exists
    const exists = await Subscription.findOne({ slug });
    if (exists) {
      return res.status(400).json({ error: 'Subscription with this slug already exists' });
    }

    const newSubscription = new Subscription({
      name,
      description,
      slug,
      price,
      duration_days,
      certificate_limit: certificate_limit || null,
      is_deleted: false
    });

    await newSubscription.save();
    res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};