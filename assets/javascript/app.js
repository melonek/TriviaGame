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
let timeLeft = 20;
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
let muzyka = new Audio("./assets/music/music.mp3");
let yes = new Audio("./assets/music/yes.wav");
let no = new Audio("./assets/music/no.wav");
let haha = new Audio("./assets/music/haha.mp3");
let playMusic = $("#quizStart").on("click", () => {
  muzyka.play();
  muzyka.volume = 0.4;
});

//--Setting up our timer for each question here:--//

let qtimer = $("#timer");
if (timeLeft - timer < 10) {
  qtimer.html("00:0" + (timeLeft - timer));
} else {
  qtimer.html("00:" + (timeLeft - timer));
}
function timeIt() {
  timer++;
  if (timeLeft - timer < 10) {
    qtimer.html("00:0" + (timeLeft - timer));
    let redTimer = $("#timer");
    $(redTimer).css("background", "#330000");
    $(redTimer).css("border", "3px solid #C00000");
    $(redTimer).css("color", "white");
  } else {
    qtimer.html("00:" + (timeLeft - timer));
  }

  if (timeLeft - timer === 0) {
    unanswered();
  }
}

function convertSeconds(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return min + "0:" + sec;
}
//--Timer function finishes here--//

function loadPage() {
  intervalId = setInterval(timeIt, 1000);
  $("#quizStart").hide();
  $("#imgBox").hide();
  $("#questionBox").show();
  loadNextQuestion();
}

var timeOut = function() {
  $("#correct-answer").empty();
  loadNextQuestion();
};

function gotItRight() {
  yes.play();
  yes.volume = 0.2;

  let right = $("#correct-answer");
  rightDiv = $("<div>");
  rightDiv.html("<h3>Correct Answer!</h3>");
  rightDiv.appendTo(right);

  let righto = $("#righto");
  $(righto).attr("disabled", true);
  $(righto).css("background", "#003300");
  $(righto).css("border", "3px solid #00C000");
  $(righto).css("cursour", "default");
  $(righto).css("color", "white");
  $(righto).attr("onclick", ";");

  let wrongo1 = $(".wrongo");
  $(wrongo1).attr("disabled", true);
  $(wrongo1).css("background", "#330000");
  $(wrongo1).css("border", "3px solid #C00000");
  $(wrongo1).css("cursour", "default");
  $(wrongo1).css("color", "white");
  $(wrongo1).attr("onclick", ";");

  wins++;
  timer = -1;
  setTimeout(timeOut, 1500);
}

function gotItWrong() {
  no.play();
  no.volume = 0.3;
  let wrong = $("#correct-answer");
  wrongDiv = $("<div>");
  wrongDiv.html("<h3>Wrong Answer!</h3>");
  wrongDiv.appendTo(wrong);

  let wrongo = $(".wrongo");
  $(wrongo).attr("disabled", true);
  $(wrongo).css("background", "#330000");
  $(wrongo).css("border", "3px solid #C00000");
  $(wrongo).css("cursour", "default");
  $(wrongo).css("color", "white");
  $(wrongo).attr("onclick", ";");

  let righto1 = $("#righto");
  $(righto1).attr("disabled", true);
  $(righto1).css("background", "#003300");
  $(righto1).css("border", "3px solid #00C000");
  $(righto1).css("cursour", "default");
  $(righto1).css("color", "white");
  $(righto1).attr("onclick", ";");

  losses++;
  timer = -1;
  setTimeout(timeOut, 2500);
}

function unanswered() {
  skips++;
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
  if (wins + losses + skips === apiQuestions.length) {
    $("#timer").hide();
    $("#question").hide();
    $("#answer-buttons").hide();
    $("#progress-bar").hide();
    clearInterval(intervalId);

    let score = $("#results");
    scoreDiv = $("<div>");
    scoreDiv.html(
      "<h3>Well done!<br> You have got</h3>" +
        wins +
        "<h3>correct answers<br></h3>" +
        losses +
        "<h3>wrong answers, and</h3> " +
        skips +
        "<h3>incorrect answers</h3> <br> <h3>Wanna try again?!</h3>"
    );
    scoreDiv.appendTo(score);
    $("#reset")
      .show()
      .on("click", function() {
        location.reload();
      });
  }
}

function loadNextQuestion() {
  $("#question").html(apiQuestions[counter]);
  let myButtonsDiv = $("#answer-buttons");
  myButtonsDiv.html("");

  let allMyButtons = [];

  allMyButtons.push(
    $("<button>")
      .attr("id", "righto")
      .html(correctAnswer[counter])
      .click(gotItRight)
  );
  allMyButtons.push(
    $("<button>")
      .addClass("wrongo")
      .html(optionB[counter])
      .click(gotItWrong)
  );
  allMyButtons.push(
    $("<button>")
      .addClass("wrongo")
      .html(optionC[counter])
      .click(gotItWrong)
  );
  allMyButtons.push(
    $("<button>")
      .addClass("wrongo")
      .html(optionD[counter])
      .click(gotItWrong)
  );

  shuffle(allMyButtons);

  for (let i = 0; i < allMyButtons.length; i++) {
    allMyButtons[i].appendTo(myButtonsDiv);
  }

  let normalTimer = $("#timer");
  $(normalTimer).css("background", "gray");
  $(normalTimer).css("border", "2px solid black");
  $(normalTimer).css("color", "white");

  counter++;
  gameFinished();
  changeImg();
}

function changeImg() {
  let image = "./assets/images/b" + counter + ".png";
  $("#progress-bar").html('<img src="' + image + '" alt=""/>');
}

$("#quizStart").on("click", function() {
  loadPage();
  setInterval(intervalId);
});
