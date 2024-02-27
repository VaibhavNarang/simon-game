var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var flag = false;

// audio variables
var blue = new Audio("sounds/blue.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var green = new Audio("sounds/green.mp3");
var wrong = new Audio("sounds/wrong.mp3");

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // should give a value b/w 0 and 3
  var randomChosenColor = buttonColors[randomNumber];
  //console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

$(document).on("keypress", function () {
  if (started === false) {
    started = true;
    nextSequence();
  } else {
    console.log("game started");
  }
});

$(".btn").on("click", function (event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  for (let index = 1; index < level + 1; index++) {
    checkAnswer(index);
  }
  if (userClickedPattern.length === level) {
    if (flag === true) {
      while (userClickedPattern.length) {
        userClickedPattern.pop();
      }
      nextSequence();
    } else {
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      $(document).on("keypress", function () {
        history.go(0);
      });
    }
  }
});

function playSound(name) {
  switch (name) {
    case "blue":
      blue.play();
      break;
    case "red":
      red.play();
      break;
    case "green":
      green.play();
      break;
    case "yellow":
      yellow.play();
      break;
    default:
      console.log(name);
      break;
  }
}

function animatePress(currentColor) {
  // $("#" + currentColor)
  //   .fadeOut(50)
  //   .fadeIn(50);
  var animatedButton = $("#" + currentColor);
  animatedButton.addClass("pressed");
  setTimeout(function () {
    animatedButton.removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  for (let index = 0; index < currentLevel; index++) {
    if (userClickedPattern[index] === gamePattern[index]) {
      flag = true;
    } else {
      flag = false;
    }
  }
}
