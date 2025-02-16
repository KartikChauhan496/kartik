const puzzleArea = document.getElementById('puzzle-area');
const feedback = document.getElementById('feedback');
const puzzleBox = document.getElementById('puzzle-box');

const puzzles = {
    beginner: [
        { question: "What is 25 + 17?", answer: "42", draggable: ["42", "35", "50"] },
        { question: "What is the capital of India?", answer: "new delhi", draggable: ["new delhi", "mumbai", "kolkata"] },
        { question: "What is 12 × 5?", answer: "60", draggable: ["60", "50", "70"] },
        { question: "Which planet is known as the Red Planet?", answer: "mars", draggable: ["mars", "venus", "jupiter"] },
        { question: "What is the largest mammal in the world?", answer: "blue whale", draggable: ["blue whale", "elephant", "shark"] }
    ],
    medium: [
        { question: "What is 144 ÷ 12?", answer: "12", draggable: ["12", "10", "14"] },
        { question: "Who wrote the play 'Romeo and Juliet'?", answer: "william shakespeare", draggable: ["william shakespeare", "charles dickens", "mark twain"] },
        { question: "What is the square root of 64?", answer: "8", draggable: ["8", "6", "10"] },
        { question: "Which gas do plants absorb from the air?", answer: "carbon dioxide", draggable: ["carbon dioxide", "oxygen", "nitrogen"] },
        { question: "What is the smallest prime number?", answer: "2", draggable: ["2", "1", "3"] }
    ],
    hard: [
        { question: "What is 15% of 200?", answer: "30", draggable: ["30", "25", "35"] },
        { question: "Which is the longest river in the world?", answer: "nile", draggable: ["nile", "amazon", "yangtze"] },
        { question: "What is the chemical formula for water?", answer: "h2o", draggable: ["h2o", "co2", "o2"] },
        { question: "What is the value of π (pi) rounded to two decimal places?", answer: "3.14", draggable: ["3.14", "3.16", "3.12"] },
        { question: "Which country is known as the Land of the Rising Sun?", answer: "japan", draggable: ["japan", "china", "india"] }
    ]
};

let currentLevel = null;
let currentQuestionIndex = 0;

function startGame(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    const puzzle = puzzles[currentLevel][currentQuestionIndex];
    puzzleArea.innerHTML = `<p>${puzzle.question}</p>`;
    puzzle.draggable.forEach(word => {
        const draggableElement = document.createElement('div');
        draggableElement.classList.add('draggable');
        draggableElement.textContent = word;
        draggableElement.draggable = true;
        draggableElement.addEventListener('dragstart', dragStart);
        puzzleArea.appendChild(draggableElement);
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your answer here...';
    input.addEventListener('input', checkAnswer);
    puzzleArea.appendChild(input);

    // Remove existing star border
    const existingStarBorder = puzzleBox.querySelector('.star-border');
    if (existingStarBorder) {
        existingStarBorder.remove();
    }
    feedback.textContent = '';
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
}

function checkAnswer(event) {
    const userAnswer = event.target.value.toLowerCase();
    const puzzle = puzzles[currentLevel][currentQuestionIndex];
    if (userAnswer === puzzle.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        addStarBorder();
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < puzzles[currentLevel].length) {
                loadQuestion();
            } else {
                feedback.textContent = "You have completed all questions!";
                feedback.style.color = "blue";
            }
        }, 1000); // Move to the next question after 1 second
    } else {
        feedback.textContent = "Incorrect!";
        feedback.style.color = "red";
    }
}

function addStarBorder() {
    const starBorder = document.createElement('div');
    starBorder.classList.add('star-border');
    puzzleBox.appendChild(starBorder);
}

document.addEventListener('dragover', event => {
    event.preventDefault();
});

document.addEventListener('drop', event => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const input = puzzleArea.querySelector('input');
    input.value = data;
    checkAnswer({ target: input });
});
