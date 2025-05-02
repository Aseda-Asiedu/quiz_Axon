const express = require('express');
const router = express.Router();
const fs = require('fs');

// Load questions from the JSON file
const questions = JSON.parse(fs.readFileSync('./data/questions.json', 'utf8'));

/**
 * GET /api/quiz
 * Returns a random quiz question 
 */
router.get('/quiz', (req, res) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  const { answer, ...questionWithoutAnswer } = randomQuestion;

  res.json(questionWithoutAnswer);
});

module.exports = router;
