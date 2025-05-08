const express = require('express');
const router = express.Router();
const questions = require('../data/questions.json');

/**
 * GET /api/quiz?difficulty=easy|hard
 * Returns a list of 5 random questions based on difficulty
 */
router.get('/quiz', (req, res) => {
  const difficulty = req.query.difficulty || 'easy';
  const filtered = questions.filter(q => q.difficulty === difficulty);
  
  const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);

  const cleanQuestions = shuffled.map(({ answer, ...rest }) => rest); // Hide answer
  res.json(cleanQuestions);
});

/**
 * POST /api/submit
 * Accepts quiz submission, scores it, and returns message based on performance
 */
router.post('/submit', (req, res) => {
  const { answers, difficulty } = req.body;
  let score = 0;

  answers.forEach(({ questionId, userAnswer }) => {
    const q = questions.find(q => q.id === questionId);
    if (!q) return;

    const correct = q.type === 'fill-in'
      ? userAnswer.trim().toUpperCase() === q.answer.trim().toUpperCase()
      : userAnswer === q.answer;

    if (correct) score += 1;
  });

  const percentage = (score / answers.length) * 100;
  let message = `Your score is ${percentage}%.`;

  if (percentage >= 80) {
    if (difficulty === 'easy') {
      message += ' Good Work. Want to Try A Harder Set?';
    } else {
      message += ' You\'re 1% Smarter! Want another hard round?';
    }
  } else {
    message += ' Failed Grade but Good Effort. Want to try again?';
  }
  
  res.json({
    score: percentage,
    message
  });
});

module.exports = router;
