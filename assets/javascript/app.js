$(document).ready(function() {
  console.log("ready!");
  $("#questionBox").hide();
});

//Query for API random questions//
$(window).on("load", function() {
  var queryURL =
    "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});

//create questions//
let questions = [];

//variables in quiz//
$("#quizStart").on("click", function() {
  let startButton = $("#quizStart");
  $(startButton).fadeToggle("slow", startQuestion);
});

let startQuestion = () => {
  $("#quizStart").hide();
  $("#imgBox").hide();
  $("#questionBox").show();
  let timer = $("<h2>");
  let question = $("<h2>");

  startQuestion();
};
