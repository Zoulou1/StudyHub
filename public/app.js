let currentQuiz = null;
let currentAnswers = {};

const quizSelectionScreen = document.getElementById('quizSelection');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const quizList = document.getElementById('quizList');
const questionsContainer = document.getElementById('questionsContainer');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const retakeBtn = document.getElementById('retakeBtn');
const backToListBtn = document.getElementById('backToListBtn');

document.addEventListener('DOMContentLoaded', () => {
  loadQuizzes();
});

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
        <p>${quiz.description}</p>
        <p style="color: #999; font-size: 0.9em; margin-top: 8px;">${quiz.questionCount} questions</p>
      `;
      card.addEventListener('click', () => startQuiz(quiz.id));
      quizList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading quizzes:', error);
    quizList.innerHTML = '<p style="color: #d32f2f;">Error loading quizzes. Please refresh the page.</p>';
  }
}

async function startQuiz(quizId) {
  try {
    const response = await fetch(`/api/quizzes/${quizId}`);
    currentQuiz = await response.json();
    currentAnswers = {};
    
    showScreen(quizScreen);
    
    document.getElementById('quizTitle').textContent = currentQuiz.title;
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
    `Progress: ${answered} of ${total} questions answered`;
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
  
  document.getElementById('scorePercentage').textContent = `${results.percentage}%`;
  document.getElementById('scoreText').textContent = 
    `You scored ${results.score} out of ${results.totalQuestions} (${results.percentage}%)`;
  
  const detailedDiv = document.getElementById('detailedResults');
  detailedDiv.innerHTML = '<div class="detailed-results">';
  
  results.results.forEach((result, index) => {
    const question = currentQuiz.questions[index];
    const resultDiv = document.createElement('div');
    resultDiv.className = `result-item ${result.isCorrect ? 'correct' : 'incorrect'}`;
    
    const statusClass = result.isCorrect ? 'correct-status' : 'incorrect-status';
    const statusText = result.isCorrect ? '✓ Correct' : '✗ Incorrect';
    
    resultDiv.innerHTML = `
      <p><span class="label">Q:</span> ${question.question}</p>
      <p><span class="label">Your answer:</span> ${question.options[result.userAnswer]}</p>
      ${!result.isCorrect ? `<p><span class="label">Correct answer:</span> ${question.options[result.correctAnswer]}</p>` : ''}
      <p class="status ${statusClass}">${statusText}</p>
    `;
    
    detailedDiv.appendChild(resultDiv);
  });
  
  detailedDiv.innerHTML += '</div>';
}

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

submitBtn.addEventListener('click', submitQuiz);
backBtn.addEventListener('click', () => showScreen(quizSelectionScreen));
retakeBtn.addEventListener('click', () => startQuiz(currentQuiz.id));
backToListBtn.addEventListener('click', () => showScreen(quizSelectionScreen));
