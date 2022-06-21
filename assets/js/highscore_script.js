var highScoreArr = [];
listEl = document.querySelector("ul");
backButtonEl = document.querySelector("#go-back");
clearButtonEl = document.querySelector("#clear");

function loadHighScores(){
    if(localStorage.getItem("highscores").length===0){
        var listItemEl = document.createElement("li");
        listItemEl.textContent= "No highscores recorded."
        listEl.appendChild(listItemEl);
    }
    else{
        highScoreArr=JSON.parse(localStorage.getItem("highscores"));
        for(var i =0; i<highScoreArr.length; i++){
            listItemEl = document.createElement("li");
            listItemEl.textContent= `${i+1}. ${highScoreArr[i].name} - ${highScoreArr[i].score}`
            listEl.appendChild(listItemEl);
        }
    }
}

//function nukeYourSaves() {}
function deleteHighScores(){
    if(confirm("This action cannot be undone, are you sure you want to get rid of your highscores?")){
        highScoreArr = [];
        localStorage.setItem("highscores",highScoreArr);
        loadHighScores();
    }
}


loadHighScores();
backButtonEl.addEventListener("click",function(){window.open("./index.html","_self")});
clearButtonEl.addEventListener("click",deleteHighScores);