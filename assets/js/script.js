var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#choices");
var startQuizEl = document.querySelector("#start-quiz");

function startQuiz() {
    console.log("and so it begins.");
    document.querySelector(".content").style.display="none";
    document.querySelector("#start-quiz").style.display="none";
    console.log(typeof questionArr[0].correct);
    // Start timer
    generateQuestion()
}

function generateQuestion() {
    //randomly choose quesiton from questionArr
    var currentProblem = questionArr[0];   //^ that's next
    //remove question from choices
    
    //insert the question into answersEl as an <ol> <li>
    // use a data-is-correct (correct/incorrect) attribute to 
    questionEl.textContent= currentProblem.question;
    
    var choiceListEl = document.createElement("ul");

    for(var i =0; i <currentProblem.choices.length; i++){
        // create the containing list element
        var thisChoiceEl = document.createElement("li"); 
        // check if currently generated answer is the correct one
        if(i+1===currentProblem.correct){
            thisChoiceEl.innerHTML=`<button class="btn correct" type="button">${i+1}. ${currentProblem.choices[i]}</button>`;
        }
        else{
            thisChoiceEl.innerHTML=`<button class="btn incorrect" type="button">${i+1}. ${currentProblem.choices[i]}</button>`;
        }
        
        choiceListEl.appendChild(thisChoiceEl);
    }
    answersEl.appendChild(choiceListEl);
}

function checkAnswerHandler(event) {
    // needs to call to end quiz if questionArr is empty
    var targetEl = event.target;
    if(targetEl.matches(".correct")){
        window.alert("Yes correct good job I'm loud please delete me later");
    }
    else if(targetEl.matches(".incorrect")){
        window.alert("No that's wrong! Also i'm loud please delete me");
    }
}

startQuizEl.addEventListener("click",startQuiz);
answersEl.addEventListener("click",checkAnswerHandler);

//usually i'd have this at the top, but i expect this to be long and it'll get hoisted anyway so, eh
//if there's nothing under this comment i changed how i handled questions and forgot to delete this
var questionArr = [
    {
        question: "I am a question",
        choices: ["answer 1",
        "answer 2",
        "answer 3",
        "answer 4"],
        correct: 3 // IS NOT 0 INDEX! REMEMBER TO USE i+1 TO APPLY CORRECTNESS!!!!
    },
    {
        question: "I am question 2",
        choices: ["answer 1",
        "answer 2",
        "answer 3",
        "answer 4"],
        correct: 2 // IS NOT 0 INDEX! REMEMBER TO USE i+1 TO APPLY CORRECTNESS!!!!
    }
]