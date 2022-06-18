var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#choices");
var startQuizEl = document.querySelector("#start-quiz");
var currentProblem;

function startQuiz() {
    document.querySelector(".content").style.display="none";
    document.querySelector("#start-quiz").style.display="none";

    // Start timer
    generateQuestion()
};

function quizTimer(){};

function generateQuestion() {
    //randomly choose quesiton from questionArr
    var n = Math.floor(Math.random()*questionArr.length);
    currentProblem = questionArr[n]; 
    //remove question from choices
    questionArr.splice(n,1);
    

    questionEl.textContent= currentProblem.question;
    //insert the question into answersEl as an <ul> <li>
    var choiceListEl = document.createElement("ul");
    for(var i =0; i <currentProblem.choices.length; i++){
        // create the containing list element
        var thisChoiceEl = document.createElement("li"); 
        thisChoiceEl.setAttribute("id",`option${i+1}`)
        // add a button to the <li> element with an id of 'i'
        thisChoiceEl.innerHTML=`<button class="btn" id="${i+1}" type="button">${i+1}. ${currentProblem.choices[i]}</button>`;
        
        choiceListEl.appendChild(thisChoiceEl);
    }
    answersEl.appendChild(choiceListEl);
};


//Okay so i don't forget by tommorow plan is:
/*
    1. Give each list item a unique id for ... well identification purposes
    2. when an answer is clicked we WANT the background of the list element to briefly flash red or green, then fade back to normal
    3. start with blinking, see if fading is too fancy-shmancy
*/
function checkAnswerHandler(event) {
    // needs to call to end quiz if questionArr is empty
    var targetEl = event.target;
    var background = document.querySelector(`#option${targetEl.id}`);

    if(targetEl.id === `${currentProblem.correct}`){ // if it's dumb and it works it's not dumb.
        
        background.style.background="#095";

        //alert("Yes correct good job I'm loud please delete me later");
    }
    else if(targetEl.matches(".btn")){ // each question is marked with a different id BUT they all share a class, since the 'if' will catch the correct answer already, this should work as intended.
        background.style.background="#d00";
        //alert("No that's wrong! Also i'm loud please delete me");
    }

    if(questionArr.length>0){
        setTimeout(function(){
            background.style.background="#fff";
            document.querySelector("ul").remove();
            generateQuestion();
        },100)
    }
    else{
        setTimeout(function(){
            background.style.background="#fff";
            document.querySelector("ul").remove();
            alert("Hey the quiz is over, you should add the highscore screen and delete me");
        },100)
    }
    
};

startQuizEl.addEventListener("click",startQuiz);
answersEl.addEventListener("click",checkAnswerHandler);

//usually i'd have this at the top, but i expect this to be long and it'll get hoisted anyway so, eh
//if there's nothing under this comment i changed how i handled questions and forgot to delete this
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