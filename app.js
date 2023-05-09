const data = [
  {
    id: 1,
    question: "Which organ is the hardest working muscle in the body?",
    answers: [
      { answer: "The Heart", isCorrect: true },
      { answer: "The Brain", isCorrect: false },
      { answer: "The Thyroid", isCorrect: false },
      { answer: "The Liver", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "On average, how much do humans shed hair?",
    answers: [
      { answer: "Between 5 and 10 hairs a day", isCorrect: false },
      { answer: "Between 30 and 60 hairs a day", isCorrect: false },
      { answer: "Between 50 and 100 hairs a day", isCorrect: true },
      { answer: "Humans dont shed", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "Which hair color is a recessive gene??",
    answers: [
      { answer: "Black", isCorrect: false },
      { answer: "Red", isCorrect: true },
      { answer: "Brown", isCorrect: false },
      { answer: "Blonde", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "What percent of people are right-handed?",
    answers: [
      { answer: "50%", isCorrect: false },
      { answer: "20-30%", isCorrect: false },
      { answer: "85-90%", isCorrect: true },
      { answer: "10-15%", isCorrect: false },
    ],
  },
];

function fetchdata() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("credit").innerHTML =
    this.responseText;
  }
  xhttp.open('GET', 'final.txt', true);
  xhttp.send();
}
const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;
  showQuestion(qIndex);
};

play.addEventListener("click",()=>{
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
  playAgain()
})

const showResult = () => {
  resultScreen.style.display = "block";
  gameScreen.style.display = "none";

  resultScreen.querySelector(
    ".correct"
  ).textContent = `Correct Answers: ${correctCount}`;

  resultScreen.querySelector(
    ".wrong"
  ).textContent = `Wrong Answers: ${wrongCount}`;

  resultScreen.querySelector(".score").textContent = `Score: ${
    (correctCount - wrongCount) * 10
  }`;
};

const showQuestion = (qNumber) => {
  if (qIndex === data.length) return showResult();
  selectedAnswer = null;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers
    .map(
      (item, index) =>
        `
  <div class="answer">
      <input type="radio" id=${index} name="answer" value=${item.isCorrect} />
      <label for="1">${item.answer}</label>
  </div>
  `
    )
    .join("");

  selectAnswer();
};

const selectAnswer = () => {
  answersContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    });
  });
};

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      qIndex++;
      showQuestion(qIndex);
    } else alert("Select an answer!");
  });
};

showQuestion(qIndex);
submitAnswer();

