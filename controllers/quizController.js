const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

// Получение квиза (бонусный квиз)
exports.getQuiz = async (req, res) => {
  try {
    // Сначала пытаемся найти квиз, в заголовке которого содержится "music" (без учета регистра)
    console.log(Quiz.find());
    let quiz = await Quiz.findOne({ title: { $regex: 'music', $options: 'i' } });
    
    // Если не найден, пробуем найти любой квиз в базе
    if (!quiz) {
      quiz = await Quiz.findOne();
    }
    
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    
    // Рендерим шаблон для квиза (если у вас файл называется quiz.ejs, используйте его)
    res.render('quiz', { quiz });
    // Если вы хотите использовать другой шаблон, например bonus.ejs, то:
    // res.render('bonus', { quiz });
  } catch (error) {
    console.error('Error in getQuiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

// Обработка отправки квиза
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === parseInt(answers[index], 10)) {
        score++;
      }
    });

    // Сохраняем результат квиза
    const result = new QuizResult({
      user: req.session.user ? req.session.user.id : null,
      quiz: quizId,
      score,
      totalQuestions: quiz.questions.length
    });
    await result.save();

    // Перенаправляем на страницу результата квиза
    res.redirect(`/quiz/result/${result._id}`);
  } catch (error) {
    console.error('Error in submitQuiz:', error);
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
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error('Error in createQuiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};
