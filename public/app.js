let currentQuiz = null;
let currentAnswers = {};
let allQuizzes = [];

const dashboardScreen = document.getElementById('dashboardScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const quizzesGrid = document.getElementById('quizzesGrid');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const backFromQuiz = document.getElementById('backFromQuiz');
const backFromResults = document.getElementById('backFromResults');
const retakeBtn = document.getElementById('retakeBtn');
const backToListBtn = document.getElementById('backToListBtn');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadQuizzes();
  setupEventListeners();
});

function setupEventListeners() {
  searchInput.addEventListener('input', filterQuizzes);
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      filterQuizzes();
    });
  });
}

async function loadQuizzes() {
  try {
    const response = await fetch('/api/quizzes');
    allQuizzes = await response.json();
    renderQuizzes(allQuizzes);
  } catch (error) {
    console.error('Error loading quizzes:', error);
    quizzesGrid.innerHTML = '<p style="color: #d32f2f;">Error loading quizzes. Please refresh the page.</p>';
  }
}

function renderQuizzes(quizzes) {
  quizzesGrid.innerHTML = '';
  
  if (quizzes.length === 0) {
    quizzesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No quizzes found.</p>';
    return;
  }

  quizzes.forEach(quiz => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-card-header">
        <span class="quiz-icon">${quiz.icon}</span>
        <span class="difficulty-badge ${quiz.difficulty}">${quiz.difficulty}</span>
      </div>
      <h3>${quiz.title}</h3>
      <p>${quiz.description}</p>
      <div class="quiz-card-footer">
        <span class="quiz-category">${quiz.category}</span>
        <span class="quiz-questions">${quiz.questionCount} questions</span>
      </div>
    `;
    card.addEventListener('click', () => startQuiz(quiz.id));
    quizzesGrid.appendChild(card);
  });
}

function filterQuizzes() {
  const searchTerm = searchInput.value.toLowerCase();
  
  let filtered = allQuizzes;
  
  if (currentFilter !== 'all') {
    filtered = filtered.filter(q => q.category === currentFilter);
  }
  
  if (searchTerm) {
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(searchTerm) ||
      q.description.toLowerCase().includes(searchTerm) ||
      q.category.toLowerCase().includes(searchTerm)
    );
  }
  
  renderQuizzes(filtered);
}

async function startQuiz(quizId) {
  try {
    const response = await fetch(`/api/quizzes/${quizId}`);
    currentQuiz = await response.json();
    currentAnswers = {};
    
    showScreen(quizScreen);
    
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    document.getElementById('quizDifficulty').textContent = currentQuiz.difficulty;
    document.getElementById('quizDifficulty').className = `difficulty-badge ${currentQuiz.difficulty}`;
    
    renderQuestions();
  } catch (error) {
    console.error('Error loading quiz:', error);
    alert('Error loading quiz. Please try again.');
  }
}

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
      const optionDiv = document.createElement('div');
      optionDiv.className = 'option';
      
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${question.id}`;
      radio.value = optionIndex;
      radio.id = `option-${question.id}-${optionIndex}`;
      radio.addEventListener('change', () => {
        currentAnswers[question.id] = optionIndex;
        updateProgress();
      });
      
      const label = document.createElement('label');
      label.htmlFor = `option-${question.id}-${optionIndex}`;
      label.textContent = option;
      
      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      optionsDiv.appendChild(optionDiv);
    });
    
    questionDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(questionDiv);
  });
  
  updateProgress();
}

function updateProgress() {
  const answered = Object.keys(currentAnswers).length;
  const total = currentQuiz.questions.length;
  const percentage = (answered / total) * 100;
  
  document.getElementById('progressText').textContent = 
    `Question ${answered} of ${total}`;
  document.getElementById('progressFill').style.width = percentage + '%';
}

async function submitQuiz() {
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

function showResults(results) {
  showScreen(resultsScreen);
  
  const incorrect = results.totalQuestions - results.score;
  
  document.getElementById('quizResultTitle').textContent = currentQuiz.title;
  document.getElementById('scorePercentage').textContent = `${results.percentage}%`;
  document.getElementById('scoreText').textContent = 
    `Great job! You scored ${results.score} out of ${results.totalQuestions}`;
  document.getElementById('correctCount').textContent = results.score;
  document.getElementById('incorrectCount').textContent = incorrect;
  
  const detailedDiv = document.getElementById('detailedResults');
  detailedDiv.innerHTML = '';
  
  results.results.forEach((result, index) => {
    const question = currentQuiz.questions[index];
    const resultDiv = document.createElement('div');
    resultDiv.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
    
    const statusClass = result.isCorrect ? 'correct-status' : 'incorrect-status';
    const statusText = result.isCorrect ? '✓ Correct' : '✗ Incorrect';
    
    let resultHTML = `
      <p><span class="label">Question:</span> ${question.question}</p>
      <p><span class="label">Your answer:</span> ${question.options[result.userAnswer]}</p>
    `;
    
    if (!result.isCorrect) {
      resultHTML += `<p><span class="label">Correct answer:</span> ${question.options[result.correctAnswer]}</p>`;
    }
    
    resultHTML += `<p class="status ${statusClass}">${statusText}</p>`;
    
    resultDiv.innerHTML = resultHTML;
    detailedDiv.appendChild(resultDiv);
  });
}

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
  window.scrollTo(0, 0);
}

// Event listeners
submitBtn.addEventListener('click', submitQuiz);
backBtn.addEventListener('click', () => showScreen(dashboardScreen));
backFromQuiz.addEventListener('click', () => showScreen(dashboardScreen));
backFromResults.addEventListener('click', () => showScreen(dashboardScreen));
retakeBtn.addEventListener('click', () => startQuiz(currentQuiz.id));
backToListBtn.addEventListener('click', () => showScreen(dashboardScreen));
