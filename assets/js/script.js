// gets the ids and classes from HTML file and associates it with JavaScript files to use them in JavaScript
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

//Global Variables
let time = 60;
let score;
let remainingTime;

let shuffledQuestions;
let questionNumber = 0;
let setScoreLocal;

var li;

// Questions and Answers
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

// Timer
function timer() {

    if (time <= 0) {
        scoreBoard();
    }
    timeCounter.textContent = time;
    time--;

}

//Starting function of timer
function timerStart() {
    remainingTime = setInterval(timer, 1000);
}

//Start Game
function startGame() {
    startButton.classList.add('hide'); //hides the start button
    firstPage.classList.add('hide'); //hides the first page
    questionContainer.classList.remove('hide');
    timerStart();
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); //randomizez the questions
    nextQuestion(); //brings the next question

}

//Next Question - checks if it runs out of questions, if so finishes the game
function nextQuestion() {
    
    if (questions.length === questionNumber) {
        scoreBoard();
        return;
    }

    showQuestion(shuffledQuestions[questionNumber]);

}

//Showing questions to the screen
function showQuestion(questions) {
    // var currentQuestion = questions[questionNumber];
    questionElement.textContent = questions.question; //shows the question
    let choiceButtons;
    answerButtons.textContent = '';

    //creates the buttons for multiple choices
    for (let i = 0; i < questions.answers.length; i++) {
        let choice = questions.answers[i];
        choiceButtons = document.createElement('button'); // creating button divs forEach choice in the questions array
        choiceButtons.setAttribute('class', 'button'); // adding class to created buttons
        choiceButtons.setAttribute('value', choice); //adding values to created buttons so we can compare the value with the click
        choiceButtons.textContent = questions.answers[i]; // adding text to the buttons
        answerButtons.appendChild(choiceButtons); //attaching created buttons to answerButtons div
        choiceButtons.addEventListener('click', selectAnswer);
    }

}

//Checks the answer is correct of not, updates timer and pulls next question
function selectAnswer(event) {
    const buttonClicked = event.target;
    ans.classList.remove('hide');
    if (buttonClicked.value === questions[questionNumber].answer) {
        ans.textContent = 'Correct!';
    }else if(buttonClicked.value !== questions[questionNumber].answer && time <= 10){ //this part does not allow the page to go beyond zero to negative values
        time = 0;
        ans.textContent = 'Incorrect.';
    }else{
        time = time - 10;
        ans.textContent = 'Incorrect.';
    }
    questionNumber++;
    nextQuestion();
}

//Shows high scores, and gets local storage data
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

    node = document.createElement("ol");
    node.setAttribute('id', 'ol');

    //Sorting arrays from highest to lowest
    let initialsList = Object.keys(localStorage);
    let highestToLowest = initialsList.sort(function(a, b) {
      return localStorage[b] - localStorage[a];
    }) 

    let scoreList = Object.values(localStorage);
    let highestToLowestNumbers = scoreList.sort((a, b) => b - a);

    //for loop gets high scores from local and print it to the highscore list
    for (let i = 0; i < localStorage.length; i++) {
        let lines = document.createElement('li');
        node.appendChild(lines);
        node.classList.add('line');
        lines.textContent = highestToLowest[i] + ': ' + JSON.parse(highestToLowestNumbers[i]);
        document.getElementById("initialsContainer").appendChild(node);
    }

    

}

//Post-quiz page to prompt user to get initials
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

//sets score to localstorage
function submit() {
    setScoreLocal = localStorage.setItem(textBox.value, JSON.stringify(score));
    textBox.value = '';
    showHighScore();
    // p.textContent = 'Submitted! Click "View High Scores" to see the scoreboard.';

}

//Go back button to go to first page
function goBack() {
    window.location.reload();
}

//Clear function to clear high scores in localstorage
function clear() {

    let isCleared = window.confirm('Do you want to clear the high scores?');
    if (isCleared) {
        localStorage.clear();
        window.location.reload();
        window.alert('High scores are cleared!');
    }
}

//Click events
startButton.addEventListener('click', startGame);
highScore.addEventListener('click', showHighScore);
submitButton.addEventListener('click', submit);
clearHighScores.addEventListener('click', clear);