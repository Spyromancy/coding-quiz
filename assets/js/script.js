var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#choices");
var startQuizEl = document.querySelector("#start-quiz");
var timerEl = document.querySelector(".time-left");
var currentProblem;
var timer = 0;
var myInterval;
var highScoreArr = [];
var highScore;

function startQuiz() {
    document.querySelector(".content").style.display = "none";
    document.querySelector("#start-quiz").style.display = "none";
    // Start timer
    timer=75;
    points = 0;
    timerEl.textContent= timer;
    myInterval= setInterval(quizTimer,1000);
    generateQuestion()
};

function quizTimer() {
    timer-=1;
    timerEl.textContent=timer;
    if(timer<=0){
        timer=0;
        endQuiz();
    }
};

function generateQuestion() {
    var n = Math.floor(Math.random() * questionArr.length);
    currentProblem = questionArr[n];
    questionArr.splice(n, 1);


    questionEl.textContent = currentProblem.question;
    //insert the question into answersEl as an <ul> <li>
    var choiceListEl = document.createElement("ul");
    for (var i = 0; i < currentProblem.choices.length; i++) {
        // create the containing list element
        var thisChoiceEl = document.createElement("li");
        thisChoiceEl.setAttribute("id", `option${i + 1}`)
        // add a button to the <li> element with an id of 'i'
        thisChoiceEl.innerHTML = `<button class="btn" id="${i + 1}" type="button">${i + 1}. ${currentProblem.choices[i]}</button>`;

        choiceListEl.appendChild(thisChoiceEl);
    }
    answersEl.appendChild(choiceListEl);
};

function checkAnswerHandler(event) {
    // needs to call to end quiz if questionArr is empty
    var targetEl = event.target;
    var background = document.querySelector(`#option${targetEl.id}`);

    if (targetEl.id === `${currentProblem.correct}`) {
        points++;
        background.style.background = "#095";
    }
    else if (targetEl.matches(".btn")) { // each question is marked with a different id BUT they all share a class, since the 'if' will catch the correct answer already, this should work as intended.
        background.style.background = "#d00";
        timer-=10;
        if(timer<=0){
            timer=0;
            timerEl.textContent=timer;
            endQuiz();
        }
        timerEl.textContent=timer;
    }

    if (questionArr.length > 0) {
        setTimeout(function () {
            background.style.background = "#fff";
            document.querySelector("ul").remove();
            generateQuestion();
        }, 100)
    }
    else {
        setTimeout(function () {
            background.style.background = "#fff";
            endQuiz();
        }, 100)
    }

};

function endQuiz() {

    clearInterval(myInterval);
    questionEl.textContent= "Quiz Over!";
    if(timer>0){
        document.querySelector(".score").textContent= timer;
    }
    else{
        document.querySelector(".score").textContent= "⭐ You Tried."; // DNF's earn you no points. Try harder.
    }

    document.querySelector(".input-hs").style.display = "flex";
    document.querySelector("ul").remove();
};

function saveHighScore(event){
    event.preventDefault();
    highScore = {
        name: document.querySelector("input[name='initials']").value,
        score: timer
    };
    if(!highScore.name){
        alert("Please input your initials") // or anything really the code doesn't care too much, but we're not about to let the user know that.
        return false;
    }
    highScoreArr.push(highScore);
    localStorage.setItem("highscores",JSON.stringify(highScoreArr));
    window.open("./highscores.html","_self");
};

function loadHighScores(){
    if(localStorage.getItem("highscores")){
        highScoreArr= JSON.parse(localStorage.getItem("highscores"));
    }
}

loadHighScores();
startQuizEl.addEventListener("click", startQuiz);
answersEl.addEventListener("click", checkAnswerHandler);
document.querySelector(".input-hs").addEventListener("submit", saveHighScore);

var questionArr = [
    {
        question: "How do you call a function when a certain element is clicked?",
        choices: ["element.onClick(func)",
            "if(element.clicked) { func(); }",
            "element.addEventListender('click', func)",
            "You can't."],
        correct: 3
    },
    {
        question: "What is the proper syntax for JavaScript array comprehension?",
        choices: ["for(const item inside array)",
            "for(const item of array)",
            "for(const item on array",
            "for(const item in array"],
        correct: 2 // 4. 
    },
    {
        question: "What can you use to get a text-based input from the user in JavaScript?",
        choices: ["input()",
            "prompt()",
            "alert()",
            "confrim()"],
        correct: 2
    },
    {
        question: "Which of these is a programming language?",
        choices: ["C#",
            "JavaChip",
            "SQRL",
            "Cobra"],
        correct: 1
    },
    {
        question: "How do you initialize a file as a local git repository?",
        choices: ["git __init__(self)",
            "it's git innit",
            "git repo",
            "git init"],
        correct: 4
    },
    {
        question: "Which of the following will create a new function in JavaScript?",
        choices: ["def myFunc()",
            "new myFunc()",
            "function myFunc()",
            "create myFunc()"],
        correct: 3
    },
    {
        question: "What is the difference between a While loop and a Do-While loop?",
        choices: ["A Do-While will run at least once.",
            "About 3 letters",
            "A While-loop checks the condition at the end of the loop",
            "There is no difference"],
        correct: 1
    },
    {
        question: "In JavaScript, how do you create a function that will accept any number of parameters?",
        choices: ["funciton sum([args])",
            "def sum(*args)",
            "function sum(--args)",
            "function sum(...args)"],
        correct: 4
    },
    {
        question: "In JavaScript, how do you add variable elements into a string without concatination?",
        choices: ["'Hi my name is {}'.format(name)",
            "`Hi my name is ${name}!`",
            "f'Hi my name is {name}'",
            "You can't."],
        correct: 2
    },
    {
        question: "How do you call a function after 5 seconds have passed?",
        choices: ["setTimeout(myFunc, 5)",
            "setTimer(myFunc, 5000)",
            "setTimeout(myFunc, 5000)",
            "waitFor(myFunc, '5 seconds')"],
        correct: 3
    }
];
var quizLen = questionArr.length;