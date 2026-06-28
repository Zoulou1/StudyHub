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

// Quiz data with university-level content
const quizzes = [
  {
    id: 1,
    title: 'DevOps Fundamentals',
    description: 'Test your knowledge on core DevOps principles and practices',
    questions: [
      {
        id: 1,
        question: 'What is the primary goal of DevOps?',
        options: [
          'To eliminate the need for operations teams',
          'To bridge the gap between development and operations for faster, more reliable deployments',
          'To replace all manual processes with automation',
          'To reduce the number of developers needed'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which of the following is NOT a pillar of DevOps culture?',
        options: [
          'Collaboration',
          'Automation',
          'Siloed teams',
          'Continuous improvement'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What does CI/CD stand for?',
        options: [
          'Continuous Integration / Continuous Deployment',
          'Code Integration / Code Development',
          'Continuous Improvement / Continuous Delivery',
          'Configuration Integration / Configuration Deployment'
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'Which tool is commonly used for Infrastructure as Code (IaC)?',
        options: [
          'Terraform',
          'Slack',
          'Jira',
          'Figma'
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'What is the benefit of containerization in DevOps?',
        options: [
          'It makes applications run slower',
          'It ensures consistency across different environments and simplifies deployment',
          'It eliminates the need for version control',
          'It increases security vulnerabilities'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: 'Programming Concepts',
    description: 'Assess your understanding of fundamental programming principles',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of binary search?',
        options: [
          'O(n)',
          'O(log n)',
          'O(n²)',
          'O(1)'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which data structure uses LIFO (Last In First Out) principle?',
        options: [
          'Queue',
          'Stack',
          'Array',
          'Linked List'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the main advantage of using microservices architecture?',
        options: [
          'Reduced complexity',
          'Easier to deploy monolithic applications',
          'Independent scalability and deployment of services',
          'Better performance than monolithic apps'
        ],
        correctAnswer: 2
      },
      {
        id: 4,
        question: 'In REST API design, what does the GET method do?',
        options: [
          'Creates a new resource',
          'Retrieves data from a server',
          'Updates an existing resource',
          'Deletes a resource'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the purpose of version control systems like Git?',
        options: [
          'To make code run faster',
          'To track changes, enable collaboration, and maintain code history',
          'To replace the need for testing',
          'To automatically fix bugs'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: 'African Economics & Development',
    description: 'Questions about African economic trends, fintech, and development',
    questions: [
      {
        id: 1,
        question: 'Which African country has the largest economy by GDP?',
        options: [
          'South Africa',
          'Nigeria',
          'Egypt',
          'Kenya'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is M-Pesa primarily used for?',
        options: [
          'Social media',
          'Mobile money transfer and payments',
          'Cryptocurrency trading',
          'Ride-sharing services'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Which African country leads in mobile money adoption?',
        options: [
          'South Africa',
          'Kenya',
          'Nigeria',
          'Ghana'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is a major challenge for tech startups in Africa?',
        options: [
          'Too much venture capital funding',
          'Lack of internet infrastructure and limited access to funding',
          'Too many skilled developers',
          'Oversaturation of the market'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'Which African fintech company is valued at over $1 billion (unicorn)?',
        options: [
          'Flutterwave',
          'Paystack',
          'Interswitch',
          'All of the above'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 4,
    title: 'Cloud & Deployment',
    description: 'Understanding cloud platforms, deployment strategies, and scaling',
    questions: [
      {
        id: 1,
        question: 'What does SaaS stand for?',
        options: [
          'Software as a Service',
          'System as a Service',
          'Server as a Service',
          'Storage as a Service'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which cloud model gives you the most control over infrastructure?',
        options: [
          'SaaS',
          'PaaS',
          'IaaS',
          'FaaS'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the main benefit of using Docker containers?',
        options: [
          'They make code run in the browser',
          'They ensure consistency between development, testing, and production environments',
          'They eliminate the need for databases',
          'They automatically optimize code performance'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Which of these is a container orchestration platform?',
        options: [
          'Docker',
          'Kubernetes',
          'Jenkins',
          'Git'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is blue-green deployment?',
        options: [
          'A deployment strategy using two identical production environments',
          'A color scheme for UI design',
          'A testing methodology',
          'A database backup strategy'
        ],
        correctAnswer: 0
      }
    ]
  }
];

// Routes

// Get all quizzes
app.get('/api/quizzes', (req, res) => {
  const quizList = quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questionCount: quiz.questions.length
  }));
  res.json(quizList);
});

// Get specific quiz
app.get('/api/quizzes/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  res.json(quiz);
});

// Submit quiz answers
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
  res.json({ status: 'ok', message: 'StudyHub is running' });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`StudyHub server running on http://localhost:${PORT}`);
});

module.exports = app;
