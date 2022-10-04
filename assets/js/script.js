// gets the id for start button from HTML file and associates it with clicking action to start the game 
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

const questionContainer = document.getElementById('questionContainer');
const firstPage = document.getElementById('firstPage');
const button = document.getElementsByClassName('button');

let time = 60;
let score = 0;
const timeCounter = document.querySelector('#timeCounter');
let remainingTime;

let shuffledQuestions;
let questionNumber = 0;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answerButtons');


function timer() {

    if (time <= 0) {
        clearInterval(remainingTime);
        score();
    }
    timeCounter.textContent = time;
    time--;

}

function timerStart() {
    remainingTime = setInterval(timer, 1000);
}


function startGame() {
    startButton.classList.add('hide'); //hides the start button
    firstPage.classList.add('hide');
    questionContainer.classList.remove('hide');
    timerStart();
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); //randomizez the questions
    nextQuestion();
}


function nextQuestion() {
    showQuestion(shuffledQuestions[questionNumber]);
}

function showQuestion(questions) {
    var currentQuestion = questions[questionNumber]
    questionElement.textContent = questions.question; //shows the question

    for (let i = 0; i < questions.answers.length; i++) {
        var choice = questions.answers[i];
        var choiceButtons = document.createElement('button'); // creating button divs forEach choice in the questions array
        choiceButtons.setAttribute('class', 'button'); // adding class to created buttons
        choiceButtons.setAttribute('value', choice); //adding values to created buttons so we can compare the value with the click
        choiceButtons.textContent = questions.answers[i]; // adding text to the buttons
        answerButtons.appendChild(choiceButtons); //attaching created buttons to answerButtons div
    }

}

function selectAnswer(event) {
    var buttonClicked = event.target;
    if (buttonClicked.value === questions[questionNumber].answer) {
        score++;
        console.log(score);
    } else {
        time = time - 10;
    }
    // choiceButtons.addEventListener('click', choice);
    questionNumber++;
    showQuestion();
}

function highScore() {
    
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