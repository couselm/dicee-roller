let result = [];
const rollAnimations = 1;
var rollCounter = rollAnimations;
const heading =  document.querySelector("H1");
const rollButton = document.getElementById("roll-dice");
const die1 = document.getElementById("die1");
const die2 = document.getElementById("die2");
const victorySound = new Audio('./sounds/little_robot_sound_factory_Jingle_Win_Synth_03.mp3');  


function animateDice() {
  for (i=0; i<2; i++) {
    let randomNum = Math.floor((Math.random() * 6) + 1);
    if (randomNum === result[i]) {
      randomNum = Math.floor((Math.random() * 6) + 1);
      result[i] = randomNum;
    }
    else {
      result[i] = randomNum;
    }
  }
const beepSound = new Audio('./sounds/beep-07a.mp3');  
beepSound.play();
const imagePath1 = "images/dice" + result[0] + ".png";
const imagePath2 = "images/dice" + result[1] + ".png";
document.querySelector("img.img1").src = imagePath1;
document.querySelector("img.img2").src = imagePath2;
}

function displayWinner() {
  victorySound.play();
  if (result[0] > result[1]) {
  heading.textContent = "🚩 Player 1 Wins!";
  die1.classList.add('pulsate');
  die2.classList.add('looser');
}
else if (result[0] < result[1]) {
  heading.textContent = "Player 2 Wins! 🚩";
   die2.classList.add('pulsate');
    die1.classList.add('looser');
}
else {
  heading.classList.add('pulsate');
  heading.textContent = "It's a Tie...";
}

}

function rollDice() {        
  setTimeout(function() {  
    animateDice();  
    if (rollCounter === rollAnimations )  {
      die1.classList.remove('pulsate', 'looser');
      die2.classList.remove('pulsate', 'looser');
      heading.classList.remove('pulsate');
      heading.textContent = "Rolling...";
      rollCounter++;
      rollDice(); 
    }            
    else if (rollCounter < 680) {            
      rollCounter = (rollCounter * 1.2 );
      rollDice();    
    }
    else {
      displayWinner();
      rollCounter = rollAnimations;
    }                  
  }, rollCounter)
}

rollButton.addEventListener("click", rollDice);





