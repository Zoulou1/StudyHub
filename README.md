# StudyHub

A learning platform designed for African students to test and improve their knowledge across DevOps, programming, and development topics.

## Project Overview

StudyHub is an interactive quiz application that helps students assess their understanding of key concepts in software development, DevOps practices, and African economic development. The platform provides immediate feedback and detailed results to help learners identify areas for improvement.

### Problem Statement

Many African students struggle to find accessible, relevant learning resources that cover both technical skills and local context. StudyHub addresses this by providing a free, deployable platform that can work on basic internet connections and be hosted locally or in the cloud.

### Target Users

- University and college students studying software engineering and DevOps
- Self-taught developers looking to validate their knowledge
- Educators seeking assessment tools for their courses
- Tech professionals preparing for interviews or certifications

## Core Features

1. **Multiple Quiz Topics** - DevOps fundamentals, programming concepts, cloud deployment, and African development
2. **Interactive Quiz Interface** - Clean, responsive UI for taking quizzes
3. **Real-time Scoring** - Instant calculation and display of scores
4. **Detailed Feedback** - View correct/incorrect answers with explanations
5. **Progress Tracking** - Visual progress bar while taking quizzes
6. **Quiz Retake** - Attempt quizzes multiple times to improve scores

## Technology Stack

- **Backend:** Node.js with Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **API:** RESTful API design
- **Deployment:** Docker-ready, cloud-agnostic

## Project Structure

```
StudyHub/
├── server.js              # Express server and API endpoints
├── package.json           # Node.js dependencies
├── .gitignore             # Git ignore configuration
├── README.md              # This file
├── LICENSE                # MIT License
└── public/
    ├── index.html         # Main HTML file
    ├── style.css          # Styling and responsive design
    └── app.js             # Frontend logic and API calls
```

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm (comes with Node.js)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/StudyHub.git
cd StudyHub
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Development Mode

For development with automatic server restart on file changes:
```bash
npm run dev
```

(Requires nodemon to be installed)

## How to Use

1. **Browse Quizzes** - The home screen displays all available quizzes with descriptions
2. **Select a Quiz** - Click on any quiz to start
3. **Answer Questions** - Select your answer for each multiple-choice question
4. **Track Progress** - Use the progress bar to see how many questions you've answered
5. **Submit** - Click "Submit Quiz" after answering all questions
6. **View Results** - See your score, percentage, and detailed feedback
7. **Retake** - Retake the quiz to improve your score

## API Endpoints

### Get All Quizzes
```
GET /api/quizzes
Response: Array of quiz objects
```

Example response:
```json
[
  {
    "id": 1,
    "title": "DevOps Fundamentals",
    "description": "Test your knowledge on core DevOps principles",
    "questionCount": 5
  }
]
```

### Get Specific Quiz
```
GET /api/quizzes/:id
Response: Quiz object with all questions
```

### Submit Quiz Answers
```
POST /api/quizzes/:id/submit
Body: { "answers": { "questionId": optionIndex, ... } }
Response: Score, percentage, and detailed results
```

### Health Check
```
GET /api/health
Response: { "status": "ok", "message": "StudyHub is running" }
```

## Adding New Quizzes

To add new quizzes, edit the `quizzes` array in `server.js`:

```javascript
{
  id: 5,
  title: 'Your Quiz Title',
  description: 'Brief description of the quiz',
  questions: [
    {
      id: 1,
      question: 'Your question here?',
      options: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4'
      ],
      correctAnswer: 0  // Index of correct option (0-based)
    }
  ]
}
```

## Future Enhancements

- User authentication and profiles
- Database integration for persistent storage
- User progress tracking and statistics
- Quiz creation interface for instructors
- Leaderboards and achievements
- Mobile app version
- Multi-language support
- Offline mode

## Development Notes

- The application uses vanilla JavaScript with no frontend frameworks for simplicity and performance
- API responses are JSON formatted for easy integration
- The frontend is fully responsive and works on mobile devices
- Quiz questions are stored in-memory (can be extended to use a database)

## Testing

To test the application:

1. Start the server: `npm start`
2. Open browser to `http://localhost:3000`
3. Select a quiz and answer all questions
4. Submit and verify the scoring is correct
5. Retake the quiz to ensure state is reset properly

## Troubleshooting

**Port already in use:**
```bash
PORT=3001 npm start
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**API not responding:**
- Check that the server is running
- Verify the API endpoint URL in `app.js`
- Check browser console for errors

## Contributing

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request with a clear description


## Author

Ewing SINGA

## Support

For issues or questions, please open an issue on GitHub.

---

**Happy Learning!**
