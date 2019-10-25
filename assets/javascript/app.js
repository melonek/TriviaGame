//--Setting global variables for the Quiz--//
let queryURL = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

let apiQuestions = [];
let correctAnswer = [];
let optionB = [];
let optionC = [];
let optionD = [];
let counter = 0;

let wins = 0;
let losses = 0;
let skips = 0;
let timer = 0;
let timeLeft = 15;
let intervalId;

$(document).ready(function() {
  //--This function will send a query to API Database for random quiz question--//
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response); //--Ensures our object contains all API--//

    for (let i = 0; i < response.results.length; i++) {
      apiQuestions.push(response.results[i].question);
      correctAnswer.push(response.results[i].correct_answer);
      optionB.push(response.results[i].incorrect_answers[0]);
      optionC.push(response.results[i].incorrect_answers[1]);
      optionD.push(response.results[i].incorrect_answers[2]);
    }
  });
});

$("#questionBox").hide();
$("#reset").hide();
let muzyka = new Audio("./assets/music/dynamic.mp3");
let playMusic = $("#quizStart").on("click", () => {
  muzyka.play();
  intervalId = setInterval(timeIt, 1000);
});

//--Setting up our timer for each question here:--//

let qtimer = $("#timer");
qtimer.html(convertSeconds(timeLeft - timer));

function timeIt() {
  timer++;
  qtimer.html(convertSeconds(timeLeft - timer));
  if (timeLeft - timer === 0) {
    unanswered();
  }
}

function convertSeconds(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + ":" + sec;
}
//--Timer function finishes here--//
function loadPage() {
  $("#quizStart").hide();
  $("#imgBox").hide();
  $("#questionBox").show();
  loadNextQuestion();
}

function gotItRight() {
  console.log("You got it right!");
  wins++;
  timer = -1;
  loadNextQuestion();
}

function unanswered() {
  console.log("You didn't try to answer");
  skips++;
  timer = -1;
  loadNextQuestion();
}

function gotItWrong() {
  console.log("You got it wrong!"); //make it display <h3> instead in #answer-status div!
  //display the correct message in #correct-answer div!
  losses++;
  timer = -1;
  loadNextQuestion();
}
//--This function will shuffle our buttons so optionA(correct ans.) will always change its place//
function shuffle(allMyButtons) {
  for (i = allMyButtons.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = allMyButtons[i];
    allMyButtons[i] = allMyButtons[j];
    allMyButtons[j] = x;
  }
}
function gameFinished() {
  if (wins + losses + skips === counter) {
    alert("gówno");
    $("#timer").hide();
    clearInterval(intervalId);
  }
}

function loadNextQuestion() {
  $("#question").html(apiQuestions[counter]);
  let myButtonsDiv = $("#answer-buttons");
  myButtonsDiv.html("");

  let allMyButtons = [];

  allMyButtons.push(
    $("<button>")
      .html(correctAnswer[counter])
      .click(gotItRight)
  );
  allMyButtons.push(
    $("<button>")
      .html(optionB[counter])
      .click(gotItWrong)
  );
  allMyButtons.push(
    $("<button>")
      .html(optionC[counter])
      .click(gotItWrong)
  );
  allMyButtons.push(
    $("<button>")
      .html(optionD[counter])
      .click(gotItWrong)
  );

  shuffle(allMyButtons);

  for (let i = 0; i < allMyButtons.length; i++) {
    allMyButtons[i].appendTo(myButtonsDiv);
  }

  counter++;
}

$("#quizStart").on("click", function() {
  loadPage();
});
