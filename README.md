# StudyHub 📚

## Project Overview

**StudyHub** is an interactive quiz platform designed to help African students test and improve their knowledge across various subjects. The platform provides a simple, intuitive interface for students to take quizzes on topics ranging from basic math to African geography.

### Project Tagline
*"Learn. Test. Improve. Your Knowledge, Your Pace."*

## Problem Statement

Many African students lack access to affordable, user-friendly tools to practice and assess their learning. StudyHub addresses this by providing a free, accessible quiz platform that works on basic internet connections and can be deployed locally or in the cloud.

## Target Users

- **Primary:** High school and university students in Africa
- **Secondary:** Teachers and educators looking for assessment tools
- **Tertiary:** Online learning platforms and educational institutions

## Core Features

1. **Quiz Selection** - Browse and select from multiple available quizzes
2. **Interactive Quiz Taking** - Answer multiple-choice questions with instant feedback
3. **Score Calculation** - Automatic scoring and percentage calculation
4. **Detailed Results** - View correct/incorrect answers with explanations
5. **Quiz Retake** - Retake quizzes to improve scores

## Technology Stack

- **Backend:** Node.js with Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** In-memory (can be extended to MongoDB/PostgreSQL)
- **Deployment:** Docker-ready, can be deployed to any cloud platform

## Project Structure

```
StudyHub/
├── server.js              # Main Express server
├── package.json           # Node.js dependencies
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── public/
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styling
│   └── app.js             # Frontend JavaScript
└── LICENSE                # MIT License
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/StudyHub.git
   cd StudyHub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

3. **You should see the StudyHub home page with available quizzes.**

### Development Mode (with auto-reload)

If you want to use nodemon for automatic server restart on file changes:

```bash
npm run dev
```

## How to Use

1. **Select a Quiz:** Click on any available quiz from the home screen
2. **Answer Questions:** Select your answer for each multiple-choice question
3. **Submit:** Click "Submit Quiz" after answering all questions
4. **View Results:** See your score, percentage, and detailed feedback
5. **Retake or Go Back:** Choose to retake the quiz or return to the quiz list

## API Endpoints

### Get All Quizzes
```
GET /api/quizzes
Response: Array of quiz objects with id, title, and questionCount
```

### Get Specific Quiz
```
GET /api/quizzes/:id
Response: Quiz object with all questions and options
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
Response: { "status": "StudyHub is running!" }
```

## Adding New Quizzes

To add new quizzes, edit the `quizzes` array in `server.js`:

```javascript
{
  id: 3,
  title: 'Your Quiz Title',
  questions: [
    {
      id: 1,
      question: 'Your question here?',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 0  // Index of correct option (0-based)
    }
  ]
}
```

## Future Enhancements

- User authentication and profiles
- Database integration for persistent quiz storage
- User progress tracking
- Quiz creation interface
- Mobile app version
- Offline support
- Multi-language support

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## Team Members

| Name | GitHub | Role |
|------|--------|------|
| Ewing Singasara | [@Zoulou1](https://github.com/Zoulou1) | Backend & Frontend setup |
| Tonny Lee Muvunyi | [@TonnyleeM](https://github.com/TonnyleeM) | Quiz content & Documentation |

---

**Happy Learning! 🎓**
