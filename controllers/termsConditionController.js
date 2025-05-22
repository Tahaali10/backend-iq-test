const TermsConditions = require('../models/TermsConditions');

// Create new Terms & Conditions
exports.createTerms = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newTerms = new TermsConditions({ title, content });
    const savedTerms = await newTerms.save();
    res.status(201).json({ success: true, data: savedTerms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get the most recent active (non-deleted) Terms & Conditions
exports.getLatestTerms = async (req, res) => {
  try {
    const latestTerms = await TermsConditions.findOne({ is_deleted: false }).sort({ created_at: -1 });

    if (!latestTerms) {
      return res.status(404).json({ success: false, message: 'No active Terms & Conditions found.' });
    }

    res.status(200).json({ success: true, data: latestTerms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
