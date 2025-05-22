const Result = require('../models/Result');

// @desc    Save test result
// @route   POST /api/results
// @access  Public
exports.saveResult = async (req, res) => {
  try {
    const { name, email, password, affiliate_name, group_name, category, percentage, answers } = req.body;

    // Calculate totals
    const totalCorrect = answers.filter(a => a.isCorrect).length;
    const totalWrong = answers.length - totalCorrect;
    const totalQuestions = answers.length;

    const result = new Result({
      name,
      email,
      password, // Note: Should be hashed in production
      affiliate_name,
      group_name,
      category,
      percentage,
      answers,
      totalCorrect,
      totalWrong,
      totalQuestions
    });

    const savedResult = await result.save();
    
    res.status(201).json({
      success: true,
      data: savedResult,
      id: savedResult._id
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get result by ID
// @route   GET /api/results/:id
// @access  Public
exports.getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('answers.questionId', 'question options points');
      
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};