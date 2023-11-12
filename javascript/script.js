const questions = [
  {
    pertanyaan: 'Siapa Presiden pertama Indonesia ?',
    jawaban: [
      { teks: 'Ir. Soekarno', benar: true },
      { teks: 'Dn. Aidit', benar: false },
      { teks: 'Soeharto', benar: false },
      { teks: 'Megawati', benar: false }
    ]
  },
  {
    pertanyaan: 'Kenapa Kamu tidak pacaran ?',
    jawaban: [
      { teks: 'Fokus pendidikan😎', benar: false },
      { teks: 'Buang-buang waktu', benar: false },
      { teks: 'Ga punya uang😓', benar: false },
      { teks: 'Dilarang Agama☝️', benar: true }
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.pertanyaan;

  currentQuestion.jawaban.forEach(jawab => {
    const button = document.createElement('button');
    button.innerHTML = jawab.teks;
    button.classList.add('btn');
    answerButtons.appendChild(button);

    if (jawab.benar) {
      button.dataset.correct = jawab.benar;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  showNextButton();
}

function showNextButton() {
  nextButton.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.innerHTML = `Skor Akhir: ${score} dari ${questions.length}`;
  answerButtons.innerHTML = '';
  nextButton.style.display = 'none';
}

// Menambahkan event listener untuk tombol "Next"
nextButton.addEventListener('click', nextQuestion);

startQuiz();
