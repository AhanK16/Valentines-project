const questions = [
    {
        q: "1- What was the first thing I bought for you?",
        options: ["Flowers", "A Drink", "A Brownie", "All of the above!"],
        correct: 1 // Index of the correct answer
    },
    {
        q: "2- What is the story we tell our kids on how we got together?",
        options: ["We got freaky in da clurb", "Bollywood love at first sight", "My attractive dance moves", "ArE yOU mUsLIm?"],
        correct: 0
    },
    {
        q: "3- What is our best inside joke?",
        options: ["aChALa", "Shishir & Sanya", "OH OH OH + impersonations", "Abusive GF"],
    },
     {
        q: "4- What is MY favourite day with you?".
        options: ["THAT rainy day chat", "First Bollynights", "JB Show Day", "Everyday!!!"],
        correct: 3
    },
     {
        q: "5- Who is the best boyfriend ever?",
        options: ["Biggie", "Pedro Pascal🤢", "your ex😒", "AHAN"],
        correct: 3 
    },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options-container");

function loadQuestion() {
    const data = questions[currentQuestion];
    questionEl.innerText = data.q;
    optionsEl.innerHTML = ""; // Clear old buttons

    data.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("quiz-btn");
        btn.onclick = () => handleAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function handleAnswer(index) {
    if (index === questions[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionEl.innerText = `You scored ${score} out of ${questions.length}!`;
    optionsEl.innerHTML = `<button onclick="location.href='success.html'">See your surprise ❤️</button>`;
}

// Start the quiz
loadQuestion();
