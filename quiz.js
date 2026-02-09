const questions = [
    {
        q: "What is my favorite thing about you?",
        options: ["Your smile", "Your kindness", "Your laugh", "All of the above!"],
        correct: 3 // Index of the correct answer
    },
    {
        q: "Where was our first date?",
        options: ["The Park", "The Movies", "That cute Cafe", "The Beach"],
        correct: 2
    },
    // ... Add 3 more questions here following the same format
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
