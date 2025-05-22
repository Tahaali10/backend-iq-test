const Question = require('../models/Question');

exports.getRandomQuestions = async (req, res) => {
  try {
    const { lang = 'en', limit = 10, category, group } = req.query;

    const matchQuery = { 
      lang, 
      active: true,
      ...(category && { category_id: category }),
      ...(group && { group_id: group })
    };

    const questions = await Question.aggregate([
      { $match: matchQuery },
      { $sample: { size: parseInt(limit) } },
      {
        $project: {
          _id: 1,
          id: 1,
          question: 1,
          answer: 1,
          options: 1,
          points: 1,
          group_id: 1,
          question_type: 1
        }
      }
    ]);

    // Transform the data to match frontend expectations
    const transformedQuestions = questions.map(q => ({
      ...q,
      question: {
        text: q.question.text || '',
        image: q.question.image || ''
      },
      options: {
        a: q.options.a || { text: '', image: '' },
        b: q.options.b || { text: '', image: '' },
        c: q.options.c || { text: '', image: '' },
        d: q.options.d || { text: '', image: '' },
        e: q.options.e || { text: '', image: '' },
        f: q.options.f || { text: '', image: '' }
      }
    }));

    res.json(transformedQuestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
   const {
  id,
  lang,
  question_type,
  question,
  answer,
  options,
  group_id,
  category_id,
  points
} = req.body;

const newQuestion = new Question({
  id,
  lang,
  question_type,
  question,
  answer,
  options,
  group_id,
  category_id,
  points
});
    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
