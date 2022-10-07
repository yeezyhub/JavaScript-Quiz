// gets the id for start button from HTML file and associates it with clicking action to start the game 
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

const highScore = document.getElementById('highScore');
highScore.addEventListener('click', showHighScore);

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

const correct = document.getElementById('correct');
const incorrect = document.getElementById('incorrect');

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submit);

const initialsContainer = document.getElementById('initialsContainer');

let time = 30;
let score = 0;
let remainingTime;

let shuffledQuestions;
let questionNumber = 0;
let setScoreLocal;

var li;

function timer() {

    if (time <= 0) {
        time = 0;
        clearInterval(remainingTime);
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
    showQuestion(shuffledQuestions[questionNumber]);
}

function showQuestion(questions) {
    // var currentQuestion = questions[questionNumber];
    questionElement.textContent = questions.question; //shows the question
    let choiceButtons;

    for (let i = 0; i < questions.answers.length; i++) {
        let choice = questions.answers[i];
        choiceButtons = document.createElement('button'); // creating button divs forEach choice in the questions array
        choiceButtons.setAttribute('class', 'button'); // adding class to created buttons
        choiceButtons.setAttribute('value', choice); //adding values to created buttons so we can compare the value with the click
        choiceButtons.textContent = questions.answers[i]; // adding text to the buttons
        answerButtons.appendChild(choiceButtons); //attaching created buttons to answerButtons div
    }
    choiceButtons.addEventListener('click', selectAnswer);

}

function selectAnswer(event) {
    const buttonClicked = event.target;
    const correctAnswer = buttonClicked.dataset.answer;
    if (buttonClicked.value === questions[questionNumber].answer) {
        score++;
        console.log(score);
        correct.classList.remove('hide');
    } else {
        time = time - 10;
        incorrect.classList.remove('hide');
    }
    // choiceButtons.addEventListener('click', choice);
    questionNumber++;
    showQuestion();
}

function showHighScore() {
  
    timerCount.classList.add('hide');
    startButton.classList.add('hide');
    h1.textContent = 'High Scores';
    goBackButton.classList.remove('hide');
    questionContainer.classList.add('hide');
    firstPage.classList.remove('hide');
    submitButton.classList.add('hide');
    initials.classList.add('hide');
    textBox.classList.add('hide');
    p.textContent='';
    initialsContainer.style.display = "block";

    //for loop gets high scores from local and print it to the highscore list
    for (let i = 0; i < localStorage.length; i++) {

         node = document.createElement("li");
        node.classList.add('line');
        let textnode = document.createTextNode(localStorage.key(i) + ': ' + JSON.parse(localStorage.getItem(localStorage.key(i))));
        node.appendChild(textnode);
        document.getElementById("initialsContainer").appendChild(node);
    }


}

function scoreBoard() {
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
    p.textContent='Submitted! Click "View High Scores" to see the scoreboard.';
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
    }

]