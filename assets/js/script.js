// gets the id for start button from HTML file and associates it with clicking action to start the game 
const startButton = document.getElementById('startButton');

const highScore = document.getElementById('highScore');

const h1 = document.getElementById('h1');
const p = document.getElementById('p');
const initials = document.getElementById('initials');
const textBox = document.getElementById('textBox');

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answerButtons');

const questionContainer = document.getElementById('questionContainer');
const firstPage = document.getElementById('firstPage');
const button = document.getElementsByClassName('button');

const timerCount = document.getElementById('timer');
const timeCounter = document.querySelector('#timeCounter');

const goBackButton = document.getElementById('goBackButton');

const ans = document.getElementById('answer');

const submitButton = document.getElementById('submitButton');

const initialsContainer = document.getElementById('initialsContainer');

const clearHighScores = document.getElementById('clearHighScores');

const line = document.getElementsByClassName('line');
const ol = document.getElementById('ol');


let time = 60;
let score;
let remainingTime;

let shuffledQuestions;
let questionNumber = 0;
let setScoreLocal;

var li;
const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<scripting>', '<js>', '<script>', '<javascript>'],
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
            '/* This is a comment*/',
            '<!--This is a comment-->'
        ],
        answer: '//This is a comment'
    },
    {
        question: 'Which of the following will write the message “Hello World!” in an alert box?',
        answers: [
            'alertBox(“Hello World!”);',
            'alert(Hello World!);',
            'msgAlert(“Hello World!”);',
            'alert(“Hello World!”);'
        ],
        answer: 'alert(“Hello World!”);'
    },
    {
        question: 'What will Boolean(3 < 7) return?',
        answers: [
            'true',
            'false',
            'NaN',
            'SyntaxError'
        ],
        answer: 'true'
    },
    {
        question: 'What is the correct syntax for referring to an external script called "gfg.js"?',
        answers: [
            '<script name="gfg.js">',
            '<script href="gfg.js">',
            '<script src="gfg.js">',
            'None of these'
        ],
        answer: '<script src="gfg.js">'
    }

]

function timer() {

    if (time <= 0) {
        scoreBoard();
    }
    timeCounter.textContent = time;
    time--;

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
    
    if (questions.length === questionNumber) {
        scoreBoard();
        return;
    }

    showQuestion(shuffledQuestions[questionNumber]);

}

function showQuestion(questions) {
    // var currentQuestion = questions[questionNumber];
    console.log(questions)
    questionElement.textContent = questions.question; //shows the question
    let choiceButtons;
    answerButtons.textContent = '';

    for (let i = 0; i < questions.answers.length; i++) {
        let choice = questions.answers[i];
        choiceButtons = document.createElement('button'); // creating button divs forEach choice in the questions array
        choiceButtons.setAttribute('class', 'button'); // adding class to created buttons
        choiceButtons.setAttribute('value', choice); //adding values to created buttons so we can compare the value with the click
        choiceButtons.textContent = questions.answers[i]; // adding text to the buttons
        answerButtons.appendChild(choiceButtons); //attaching created buttons to answerButtons div
        choiceButtons.addEventListener('click', selectAnswer);
        console.log(questionNumber);
    }

}

function selectAnswer(event) {
    const buttonClicked = event.target;
    ans.classList.remove('hide');
    if (buttonClicked.value === questions[questionNumber].answer) {
        ans.textContent = 'Correct!';
    }else if(buttonClicked.value !== questions[questionNumber].answer && time <= 10){
        time = 0;
        ans.textContent = 'Incorrect.';
    }else{
        time = time - 10;
        ans.textContent = 'Incorrect.';
    }
    questionNumber++;
    nextQuestion();
}

function showHighScore() {

    timerCount.classList.add('hide');
    startButton.classList.add('hide');
    h1.textContent = 'High Scores';
    goBackButton.classList.remove('hide');
    clearHighScores.classList.remove('hide');
    questionContainer.classList.add('hide');
    firstPage.classList.remove('hide');
    submitButton.classList.add('hide');
    initials.classList.add('hide');
    textBox.classList.add('hide');
    p.textContent = '';
    initialsContainer.style.display = "block";
    highScore.textContent = '';

    //for loop gets high scores from local and print it to the highscore list
    node = document.createElement("ol");
    node.setAttribute('id', 'ol');

    for (let i = 0; i < localStorage.length; i++) {
        let lines = document.createElement('li');
        node.appendChild(lines);
        node.classList.add('line');
        lines.textContent = localStorage.key(i) + ': ' + JSON.parse(localStorage.getItem(localStorage.key(i)));
        document.getElementById("initialsContainer").appendChild(node);
    }

}

function scoreBoard() {
    clearInterval(remainingTime);
    score = timeCounter.textContent = time;
    firstPage.classList.remove('hide');
    questionContainer.classList.add('hide');
    initials.classList.remove('hide');
    textBox.classList.remove('hide');
    submitButton.classList.remove('hide');
    h1.textContent = 'All done!';
    p.textContent = 'Your final score is ' + score + '.';
    initials.value;
    textBox.value;
}

function submit() {
    setScoreLocal = localStorage.setItem(textBox.value, JSON.stringify(score));
    textBox.value = '';
    showHighScore();
    // p.textContent = 'Submitted! Click "View High Scores" to see the scoreboard.';

}

function goBack() {
    window.location.reload();
}

function clear() {

    let isCleared = window.confirm('Do you want to clear the high scores?');
    if (isCleared) {
        localStorage.clear();
        window.location.reload();
        window.alert('High scores are cleared!');
    }
}

startButton.addEventListener('click', startGame);
highScore.addEventListener('click', showHighScore);
submitButton.addEventListener('click', submit);
clearHighScores.addEventListener('click', clear);