const PrivacyPolicy = require('../models/PrivacyPolicy');

// Create new Privacy Policy
exports.createPrivacyPolicy = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPolicy = new PrivacyPolicy({
      title,
      content,
      is_deleted: false
    });

    const savedPolicy = await newPolicy.save();
    res.status(201).json(savedPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActivePrivacyPolicy = async (req, res) => {
  try {
    const activePolicy = await PrivacyPolicy.findOne({ is_deleted: false }).sort({ created_at: -1 });
    if (!activePolicy) {
      return res.status(404).json({ message: 'No active privacy policy found' });
    }
    res.status(200).json(activePolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
