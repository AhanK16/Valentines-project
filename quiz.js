const questions = [
    {
        q: "1- What was the first thing I bought for you?",
        options: ["Flowers", "A Drink", "A Brownie", "All of the above!"],
        correct: 1 
    },
    {
        q: "2- What is the story we tell our kids on how we got together?",
        options: ["We got freaky in da clurb", "Bollywood love at first sight", "My attractive dance moves", "ArE yOU mUsLIm?"],
        correct: 0
    },
    {
        q: "3- What is our best inside joke?",
        options: ["doi doi", "Shishir & Sanya", "OH OH OH + impersonations", "Abusive GF"],
        correct: 0 
    },
    {
        q: "4- What is MY favourite day with you?",
        options: ["THAT rainy day chat", "First Bollynights", "JB Show Day", "Everyday!!!"],
        correct: 3
    },
    {
        q: "5- Who is the best boyfriend ever?",
        options: ["Biggie", "Pedro Pascal🤢", "your ex😒", "AHAN"],
        correct: 3 
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionEl = document.getElementById("question-text");
    const optionsEl = document.getElementById("options-container");

    if (!questionEl || !optionsEl) return;

    const data = questions[currentQuestion];
    questionEl.innerText = data.q;
    optionsEl.innerHTML = ""; 

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
    const questionEl = document.getElementById("question-text");
    const optionsEl = document.getElementById("options-container");
    
    questionEl.innerText = `You scored ${score} out of ${questions.length}!`;
    
    // REDIRECT UPDATE: Now points to the Puzzle stage
    optionsEl.innerHTML = `
        <button class="quiz-btn" onclick="location.href='puzzle.html'">
            Final Challenge: The Memory Puzzle 🧩
        </button>
    `;
}

// Start the quiz
loadQuestion();
