// gets the id for start button from HTML file and associates it with clicking action to start the game 
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

const highScore = document.getElementById('highScore');
highScore.addEventListener('click', showHighScore);

const h1 = document.getElementById('h1');
const p = document.getElementById('p');

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answerButtons');

const questionContainer = document.getElementById('questionContainer');
const firstPage = document.getElementById('firstPage');
const button = document.getElementsByClassName('button');

const timerCount = document.getElementById('timer');
const timeCounter = document.querySelector('#timeCounter');

const goBackButton = document.getElementById('goBackButton');


let time = 60;
let score = 0;
let remainingTime;

let shuffledQuestions;
let questionNumber = 0;



function timer() {

    if (time <= 0) {
        clearInterval(remainingTime);
    }
    time--;
    timeCounter.textContent = time;

}

function timerStart() {
    remainingTime = setInterval(timer, 1000);
}


function startGame() {
    startButton.classList.add('hide'); //hides the start button
    firstPage.classList.add('hide'); //hides the first page
    questionContainer.classList.remove('hide');
    timerStart();
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); //randomizez the questions
    nextQuestion(); //brings the next question
    
}


function nextQuestion() {
    showQuestion(shuffledQuestions[questionNumber]);
}

function showQuestion(questions) {
    var currentQuestion = questions[questionNumber]
    questionElement.textContent = questions.question; //shows the question

    for (let i = 0; i < questions.answers.length; i++) {
        let choice = questions.answers[i];
        let choiceButtons = document.createElement('button'); // creating button divs forEach choice in the questions array
        choiceButtons.setAttribute('class', 'button'); // adding class to created buttons
        choiceButtons.setAttribute('value', choice); //adding values to created buttons so we can compare the value with the click
        choiceButtons.textContent = questions.answers[i]; // adding text to the buttons
        answerButtons.appendChild(choiceButtons); //attaching created buttons to answerButtons div
    }

}

function selectAnswer(event) {
    const buttonClicked = event.target;
    const correctAnswer = buttonClicked.dataset.answer;
    if (buttonClicked.value === questions[questionNumber].answer) {
        score++;
        console.log(score);
        alert('Correct!');
    } else {
        time = time - 10;
        alert('Incorrect.');
    }
    // choiceButtons.addEventListener('click', choice);
    questionNumber++;
    showQuestion();
}

function showHighScore() {
  
    timerCount.classList.add('hide');
    startButton.classList.add('hide');
    h1.textContent = 'High Scores';
    p.textContent = 'Jason: 30\nSteven: 20';
    goBackButton.classList.remove('hide');
    questionContainer.classList.add('hide');
    firstPage.classList.remove('hide');

}

function scoreBoard() {
    
}

function goBack(){
    window.location.reload();
} 


const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [ '<scripting>', '<js>', '<script>', '<javascript>'],
        answer: '<script>'
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [ 
            'function:myFunction()', 
            'function = myFunction()', 
            'function myFunction()'
        ],
        answer: 'function myFunction()'
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [ 
            '//This is a comment', 
            '/* This is a comment', 
            '<!--This is a comment-->'
        ],
        answer: '//This is a comment'
    }

]