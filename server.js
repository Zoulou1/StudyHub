const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample quiz data
const quizzes = [
  {
    id: 1,
    title: 'Basic Math Quiz',
    questions: [
      {
        id: 1,
        question: 'What is 5 + 3?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is 10 * 2?',
        options: ['15', '20', '25', '30'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is 100 / 5?',
        options: ['15', '20', '25', '30'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: 'African Geography Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the capital of Kenya?',
        options: ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which is the largest country in Africa by area?',
        options: ['Nigeria', 'Egypt', 'Algeria', 'South Africa'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the longest river in Africa?',
        options: ['Congo River', 'Nile River', 'Zambezi River', 'Niger River'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: 'Basic Science Quiz',
    questions: [
      {
        id: 1,
        question: 'What planet is closest to the Sun?',
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'What gas do plants absorb from the air?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'How many bones are in the human body?',
        options: ['196', '206', '216', '226'],
        correctAnswer: 1
      }
    ]
  }
];

// Routes

// Get all available quizzes
app.get('/api/quizzes', (req, res) => {
  const quizList = quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    questionCount: quiz.questions.length
  }));
  res.json(quizList);
});

// Get a specific quiz
app.get('/api/quizzes/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  res.json(quiz);
});

// Submit quiz answers and get score
app.post('/api/quizzes/:id/submit', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const { answers } = req.body;
  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid answers format' });
  }

  let score = 0;
  const results = [];

  quiz.questions.forEach(question => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      score++;
    }
    results.push({
      questionId: question.id,
      userAnswer: userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect
    });
  });

  const percentage = Math.round((score / quiz.questions.length) * 100);

  res.json({
    score: score,
    totalQuestions: quiz.questions.length,
    percentage: percentage,
    results: results
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'StudyHub is running!' });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`StudyHub server is running on http://localhost:${PORT}`);
});
