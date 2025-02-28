const quizData = [
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        correct: 1
    },
    {
        question: "Who discovered gravity?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
        correct: 1
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correct: 1
    },
    {
        question: "What is the smallest planet in our solar system?",
        options: ["Earth", "Mercury", "Mars", "Venus"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "How many bones are in the adult human body?",
        options: ["206", "208", "210", "212"],
        correct: 0
    },
    {
        question: "Which country won the first FIFA World Cup in 1930?",
        options: ["Brazil", "Argentina", "Germany", "Uruguay"],
        correct: 3
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correct: 2
    },
    {
        question: "Who wrote '1984' and 'Animal Farm'?",
        options: ["J.K. Rowling", "George Orwell", "Mark Twain", "Charles Dickens"],
        correct: 1
    },
    {
        question: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correct: 2
    }
];

quizData.sort(() => Math.random() - 0.5);

const quizContainer = document.getElementById("quiz");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");
const highScoreElement = document.getElementById("high-score");

let currentQuestion = 0;
let score = 0;
let timer;

function showQuestion() {
    quizContainer.innerHTML = "";
    
    if (currentQuestion >= quizData.length) {
        return showScore();
    }

    const questionObj = quizData[currentQuestion];

    const questionElem = document.createElement("h3");
    questionElem.innerText = questionObj.question;
    quizContainer.appendChild(questionElem);

    questionObj.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index, button);
        quizContainer.appendChild(button);
    });

    startTimer();
}

function checkAnswer(selectedIndex, button) {
    clearTimeout(timer);

    const correctIndex = quizData[currentQuestion].correct;
    
    if (selectedIndex === correctIndex) {
        button.classList.add("correct");
        document.getElementById("correct-sound").play();
        score++;
    } else {
        button.classList.add("wrong");
        document.getElementById("wrong-sound").play();
    }

    currentQuestion++;
    setTimeout(showQuestion, 1000);
}

function startTimer() {
    let timeLeft = 10;
    document.getElementById("timer-sound").play();
    
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            showQuestion();
        }
    }, 1000);
}

function showScore() {
    quizContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    
    scoreElement.innerText = score;
    totalElement.innerText = quizData.length;

    let highScore = localStorage.getItem("highScore") || 0;
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        highScore = score;
    }

    highScoreElement.innerText = highScore;
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    quizData.sort(() => Math.random() - 0.5);
    quizContainer.classList.remove("hidden");
    scoreContainer.classList.add("hidden");
    showQuestion();
}

showQuestion();
