// Global state
let currentQuiz = null;
let currentAnswers = {};

// DOM Elements
const quizSelectionScreen = document.getElementById('quizSelection');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const quizList = document.getElementById('quizList');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const retakeBtn = document.getElementById('retakeBtn');
const backToListBtn = document.getElementById('backToListBtn');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadQuizzes();
});

// Load all available quizzes
async function loadQuizzes() {
  try {
    const response = await fetch('/api/quizzes');
    const quizzes = await response.json();
    
    quizList.innerHTML = '';
    quizzes.forEach(quiz => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <h3>${quiz.title}</h3>
        <p>${quiz.questionCount} questions</p>
      `;
      card.addEventListener('click', () => startQuiz(quiz.id));
      quizList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading quizzes:', error);
    quizList.innerHTML = '<p>Error loading quizzes. Please refresh the page.</p>';
  }
}

// Start a quiz
async function startQuiz(quizId) {
  try {
    const response = await fetch(`/api/quizzes/${quizId}`);
    currentQuiz = await response.json();
    currentAnswers = {};
    
    // Switch to quiz screen
    showScreen(quizScreen);
    
    // Render questions
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    renderQuestions();
  } catch (error) {
    console.error('Error loading quiz:', error);
    alert('Error loading quiz. Please try again.');
  }
}

// Render quiz questions
function renderQuestions() {
  questionsContainer.innerHTML = '';
  
  currentQuiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-block';
    
    const questionText = document.createElement('h4');
    questionText.textContent = `${index + 1}. ${question.question}`;
    questionDiv.appendChild(questionText);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    
    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'option';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${question.id}`;
      radio.value = optionIndex;
      radio.addEventListener('change', () => {
        currentAnswers[question.id] = optionIndex;
      });
      
      optionLabel.appendChild(radio);
      optionLabel.appendChild(document.createTextNode(option));
      optionsDiv.appendChild(optionLabel);
    });
    
    questionDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(questionDiv);
  });
  
  // Update progress text
  document.getElementById('progressText').textContent = 
    `${currentQuiz.questions.length} questions`;
}

// Submit quiz
async function submitQuiz() {
  // Check if all questions are answered
  if (Object.keys(currentAnswers).length !== currentQuiz.questions.length) {
    alert('Please answer all questions before submitting.');
    return;
  }
  
  try {
    const response = await fetch(`/api/quizzes/${currentQuiz.id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers: currentAnswers })
    });
    
    const results = await response.json();
    showResults(results);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('Error submitting quiz. Please try again.');
  }
}

// Show results
function showResults(results) {
  showScreen(resultsScreen);
  
  // Display score
  document.getElementById('scorePercentage').textContent = `${results.percentage}%`;
  document.getElementById('scoreText').textContent = 
    `You scored ${results.score} out of ${results.totalQuestions}`;
  
  // Display detailed results
  const detailedDiv = document.getElementById('detailedResults');
  detailedDiv.innerHTML = '<div class="detailed-results">';
  
  results.results.forEach((result, index) => {
    const question = currentQuiz.questions[index];
    const resultDiv = document.createElement('div');
    resultDiv.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
    
    resultDiv.innerHTML = `
      <p><span class="label">Question:</span> ${question.question}</p>
      <p><span class="label">Your Answer:</span> ${question.options[result.userAnswer]}</p>
      <p><span class="label">Correct Answer:</span> ${question.options[result.correctAnswer]}</p>
      <p><span class="label">Status:</span> ${result.isCorrect ? '✓ Correct' : '✗ Incorrect'}</p>
    `;
    
    detailedDiv.appendChild(resultDiv);
  });
  
  detailedDiv.innerHTML += '</div>';
}

// Screen navigation
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// Event listeners
submitBtn.addEventListener('click', submitQuiz);
backBtn.addEventListener('click', () => showScreen(quizSelectionScreen));
retakeBtn.addEventListener('click', () => startQuiz(currentQuiz.id));
backToListBtn.addEventListener('click', () => showScreen(quizSelectionScreen));
