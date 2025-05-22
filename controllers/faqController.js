// controllers/faqController.js
const Faq = require('../models/Faq');

// GET all FAQs
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({ is_deleted: false }).sort({ created_at: -1 });
    res.status(200).json({ data: faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Server error fetching FAQs' });
  }
};

// POST a new FAQ
exports.createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const newFaq = new Faq({ question, answer });
    await newFaq.save();

    res.status(201).json({ message: 'FAQ created successfully', data: newFaq });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Server error creating FAQ' });
  }
};
