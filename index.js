// Global Vars
var diceValue = [1, 2];
var previousRoll = [1, 2];
var playerScore = [0, 0];
var rollAnimationTime = 1;
let rolling;
const diceClasses = [
  "fa-dice-one",
  "fa-dice-two",
  "fa-dice-three",
  "fa-dice-four",
  "fa-dice-five",
  "fa-dice-six",
];

// Dom Elements
const heading = document.querySelector("H1");
const rollButton = document.getElementById("roll-dice");
const resetButton = document.getElementById("reset");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Score = document.getElementById("p1-score");
const player2Score = document.getElementById("p2-score");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const dice = document.getElementById("dice");

// Sound Effects
const beepSound = new Audio("./sounds/beep-07a.mp3");
const victorySound = new Audio(
  "./sounds/little_robot_sound_factory_Jingle_Win_Synth_03.mp3"
);

function animateDice() {
  beepSound.currentTime = 0;
  for (i = 0; i < 2; i++) {
    previousRoll[i] = diceValue[i];
    let randomNum = Math.floor(Math.random() * 6 + 1);
    if (randomNum === diceValue[i]) {
      randomNum = Math.floor(Math.random() * 6 + 1);
      diceValue[i] = randomNum;
    } else {
      diceValue[i] = randomNum;
    }
  }
  console.log(rollAnimationTime);
  die1.classList.replace(
    diceClasses[previousRoll[0] - 1],
    diceClasses[diceValue[0] - 1]
  );
  die2.classList.replace(
    diceClasses[previousRoll[1] - 1],
    diceClasses[diceValue[1] - 1]
  );
}

function displayWinner() {
    if (diceValue[0] > diceValue[1]) {
      playerScore[0]++;
      heading.textContent = "🚩 Player 1 Wins!";
      player1Score.textContent = `Score: ${playerScore[0]}`;
      player1.classList.add("pulsate");
      player2.classList.add("looser");
      
    } else if (diceValue[0] < diceValue[1]) {
      playerScore[1]++;
      heading.textContent = "Player 2 Wins! 🚩";
      player2Score.textContent = `Score: ${playerScore[1]}`;
      player2.classList.add("pulsate");
      player1.classList.add("looser");
    } else {
      heading.classList.add("pulsate");
      heading.textContent = "It's a Tie...";
    }
    victorySound.play();
    rollButton.disabled = false;  
}

function rollDice() {
    setTimeout(function () {
    animateDice();
    if (rollAnimationTime === 1) {
      resetClasses();
      heading.textContent = "Rolling...";
      rolling = true;
      rollAnimationTime++;
      rollButton.disabled = true;
      rollDice();
    } 
    else if (rollAnimationTime < 470 && rolling ) {
      rollAnimationTime = rollAnimationTime * 1.2;
      beepSound.play();
      rollDice();
    } 
    else if (rollAnimationTime > 470 && rolling) {
      beepSound.play();
      setTimeout(function () {
      displayWinner(); }, rollAnimationTime);
      rollAnimationTime = 1;
      rolling = fasle;
    }
    else {
      rollAnimationTime = 1;
      rollButton.disabled = false;
      rolling = false;
    }
  }, rollAnimationTime);
}

function quickRoll() {
  rolling = false;
  victorySound.currentTime = 0;
  resetClasses();
  animateDice();
  setTimeout(function () {
  displayWinner() }, rollAnimationTime );
}

function resetGame() {
rolling = false;
playerScore = [0, 0];
resetClasses();
heading.textContent = "Roll The Dice!";
setTimeout(function () {
die1.classList.replace(diceClasses[diceValue[0] - 1], diceClasses[0]);
die2.classList.replace(diceClasses[diceValue[1] - 1], diceClasses[1]);
player1Score.textContent = `Score: ${playerScore[0]}`;
player2Score.textContent = `Score: ${playerScore[1]}`;
diceValue = [1, 2];
}, rollAnimationTime);
}

function resetClasses() {
  player1.classList.remove("pulsate", "looser");
  player2.classList.remove("pulsate", "looser");
  heading.classList.remove("pulsate");
}

rollButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);
dice.addEventListener("click", quickRoll);
