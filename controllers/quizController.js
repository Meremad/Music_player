// controllers/quizController.js
const Quiz = require('../models/Quiz');

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.render('quiz', { quizzes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.render('quiz', { quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const result = {
      score,
      totalQuestions: quiz.questions.length
    };

    res.render('quiz-result', { result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, timeLimit } = req.body;
    const newQuiz = new Quiz({
      title,
      questions,
      timeLimit
    });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

exports.submitQuiz = async (req, res) => {
    try {
      const { quizId, answers } = req.body;
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
          score++;
        }
      });
  
      const result = new QuizResult({
        user: req.session.user.id,
        quiz: quizId,
        score,
        totalQuestions: quiz.questions.length
      });
  
      await result.save();
  
      res.json({ resultId: result._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit quiz' });
    }
  };
  
  exports.getQuizResult = async (req, res) => {
    try {
      const result = await QuizResult.findById(req.params.id).populate('quiz');
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
      res.render('quiz-result', { result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz result' });
    }
  };