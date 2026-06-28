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

// Quiz data with expanded content
const quizzes = [
  {
    id: 1,
    title: 'DevOps Fundamentals',
    category: 'DevOps',
    icon: '⚙️',
    difficulty: 'Intermediate',
    description: 'Master the core principles and practices of DevOps',
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
    category: 'Programming',
    icon: '💻',
    difficulty: 'Intermediate',
    description: 'Test your understanding of fundamental programming principles',
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
    category: 'Economics',
    icon: '🌍',
    difficulty: 'Beginner',
    description: 'Explore African economic trends, fintech, and development',
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
    category: 'Cloud',
    icon: '☁️',
    difficulty: 'Intermediate',
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
  },
  {
    id: 5,
    title: 'JavaScript Essentials',
    category: 'Programming',
    icon: '🔶',
    difficulty: 'Beginner',
    description: 'Core JavaScript concepts and best practices',
    questions: [
      {
        id: 1,
        question: 'What is the difference between var, let, and const?',
        options: [
          'They are all the same',
          'let and const are block-scoped, var is function-scoped; const cannot be reassigned',
          'var is the newest standard',
          'const is for constants only'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What does the spread operator (...) do in JavaScript?',
        options: [
          'Multiplies numbers',
          'Spreads array elements or object properties',
          'Creates a new function',
          'Deletes array elements'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is a closure in JavaScript?',
        options: [
          'A function that ends the program',
          'A function that has access to variables from its outer scope',
          'A way to close a file',
          'A type of loop'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the difference between == and ===?',
        options: [
          'They are the same',
          '== compares values, === compares values and types',
          '=== is faster',
          'There is no difference in modern JavaScript'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does async/await do?',
        options: [
          'Makes code run faster',
          'Allows you to write asynchronous code in a synchronous style',
          'Replaces promises completely',
          'Stops code execution'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 6,
    title: 'Database & SQL',
    category: 'Databases',
    icon: '🗄️',
    difficulty: 'Intermediate',
    description: 'SQL queries, database design, and optimization',
    questions: [
      {
        id: 1,
        question: 'What does ACID stand for in database transactions?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Authentication, Confidentiality, Integrity, Data',
          'Availability, Consistency, Isolation, Deployment',
          'Automatic, Consistent, Integrated, Distributed'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'What is a primary key in a database?',
        options: [
          'A password for the database',
          'A unique identifier for each record in a table',
          'The first column in a table',
          'A key used for encryption'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is database normalization?',
        options: [
          'Making all data the same format',
          'Organizing data to reduce redundancy and improve data integrity',
          'Backing up the database',
          'Deleting old records'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the difference between INNER JOIN and LEFT JOIN?',
        options: [
          'They are the same',
          'INNER JOIN returns only matching records, LEFT JOIN returns all records from the left table',
          'LEFT JOIN is faster',
          'INNER JOIN is deprecated'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is an index in a database?',
        options: [
          'A list of all tables',
          'A data structure that improves query performance',
          'A backup of the database',
          'A type of table'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 7,
    title: 'Web Security',
    category: 'Security',
    icon: '🔒',
    difficulty: 'Intermediate',
    description: 'Common vulnerabilities, authentication, and secure coding practices',
    questions: [
      {
        id: 1,
        question: 'What is SQL injection?',
        options: [
          'A type of vaccine',
          'An attack where malicious SQL code is inserted into input fields',
          'A database backup method',
          'A programming language'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What does HTTPS provide that HTTP does not?',
        options: [
          'Faster speed',
          'Encryption and secure data transmission',
          'More storage',
          'Better compatibility'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is a Cross-Site Scripting (XSS) attack?',
        options: [
          'A type of database error',
          'An attack where malicious scripts are injected into web pages',
          'A programming technique',
          'A network protocol'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the purpose of a firewall?',
        options: [
          'To make the internet faster',
          'To monitor and control incoming and outgoing network traffic',
          'To store data',
          'To encrypt passwords'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is two-factor authentication (2FA)?',
        options: [
          'Using two passwords',
          'A security method requiring two forms of verification',
          'Two different browsers',
          'Logging in twice'
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 8,
    title: 'System Design & Architecture',
    category: 'Architecture',
    icon: '🏗️',
    difficulty: 'Advanced',
    description: 'Scalability, system design patterns, and architectural decisions',
    questions: [
      {
        id: 1,
        question: 'What is horizontal scaling?',
        options: [
          'Making a server more powerful',
          'Adding more servers to distribute the load',
          'Reducing the number of users',
          'Changing the database'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is a load balancer?',
        options: [
          'A device that balances weight',
          'A system that distributes network traffic across multiple servers',
          'A type of database',
          'A programming language'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is caching and why is it important?',
        options: [
          'A type of virus',
          'Storing frequently accessed data in fast memory to improve performance',
          'A backup method',
          'A security feature'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the CAP theorem?',
        options: [
          'A hat for servers',
          'Consistency, Availability, Partition tolerance - a distributed system can guarantee only two',
          'A type of database',
          'A programming pattern'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is eventual consistency?',
        options: [
          'The database will eventually break',
          'In distributed systems, all nodes will eventually have the same data',
          'Data is always consistent',
          'A type of encryption'
        ],
        correctAnswer: 1
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
    category: quiz.category,
    icon: quiz.icon,
    difficulty: quiz.difficulty,
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
