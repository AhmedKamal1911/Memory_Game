// Get Start Button
let startBtn = document.querySelector(".control-buttons span");
// Show Card Face
let allCards = Array.from(
  document.querySelectorAll(".memory-game-container .game-block")
);
// Random Number TO add to order
// Create Random Order to Cards
allCards.forEach((card) => {
  let randomNumber = Math.floor(Math.random() * allCards.length);
  card.style.order = randomNumber;
});
//
let gameTime = 70;
let gameTimerInterval;
const mediaQuery = window.matchMedia("(max-width: 767px)");
if (mediaQuery.matches) {
  gameTime = 150;
}
//
let memoryGameContainer = document.querySelector(".memory-game-container");
startBtn.addEventListener("click", (e) => {
  // Create Prompt to Get Username

  let userName = prompt("Enter Your Name");

  //  Remove OverLay and Start Btn

  let controlBtns = document.querySelector(".control-buttons");

  controlBtns.remove();

  // Check if prompt Value is null or not
  let nameToShow = document.querySelector(".info-container .name span");

  if (userName == null || userName == "") {
    nameToShow.innerHTML = "Unknown";
  } else {
    nameToShow.innerHTML = userName;
  }
  // Handle Initial Swap Function
  handleInitialSwap();
});
async function handleInitialSwap() {
  await wait(100);
  allCards.forEach((card) => {
    card.classList.add("flipped");
  });
  await wait(2500);
  allCards.forEach((card) => {
    card.classList.remove("flipped");
  });
  startGameTimer(gameTime);
}
// Start Game Timer Function
let timeElement = document.querySelector(".time span");
function startGameTimer(time) {
  timeElement.textContent = time;
  gameTimerInterval = setInterval(() => {
    timeElement.textContent -= 1;
    if (timeElement.textContent == 0) {
      handleGameOver();
      return;
    }
    handleGameWin();
  }, 1000);
}
function handleGameOver() {
  let gameOverSound = document.getElementById("gameover");

  if (
    document.querySelectorAll(".game-block.match").length !== allCards.length
  ) {
    // Stop Time
    clearInterval(gameTimerInterval);
    // Stop Interaction
    toggleInteraction(false);
    // Show Lose Modal / Play lose sound
    let gameOverdiv = document.createElement("div");
    gameOverdiv.classList.add("game-over");
    gameOverdiv.innerHTML = "شكلك حمار ولا ليك في البطيخ حتي ";
    document.body.appendChild(gameOverdiv);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.append(overlay);
    gameOverSound.play();
    // alert("game over loser bitch");
  }
}
function handleGameWin() {
  let winSound = document.getElementById("win");
  if (
    document.querySelectorAll(".game-block.match").length === allCards.length
  ) {
    // Stop Time
    clearInterval(gameTimerInterval);
    // Create Win Div
    let winDiv = document.createElement("div");
    winDiv.classList.add("game-win");
    winDiv.innerHTML = "يبن اللعيبة";
    document.body.appendChild(winDiv);

    // Create Overlay
    let winOverlay = document.createElement("div");
    winOverlay.classList.add("win-overlay");
    document.body.appendChild(winOverlay);
    // Show Win Modal / Play win sound
    winSound.play();
  }
}
function wait(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

let flippedCards = [];
// On Card Click Flip
allCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Flip The Clicked Card
    card.classList.add("flipped");
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      toggleInteraction(false);
      checkIdenticalCards(flippedCards[0], flippedCards[1]);
      flippedCards = [];
    }
  });
});
let wrongTriesElement = document.querySelector(".tries span");
let matchSound = document.getElementById("success");
let notMatchedSound = document.getElementById("failure");
// checkIdenticalCards Function
function checkIdenticalCards(card1, card2) {
  if (card1.dataset.tech !== card2.dataset.tech) {
    // Not Identical
    wrongTriesElement.textContent = +wrongTriesElement.textContent + 1;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      notMatchedSound.play();
      toggleInteraction(true);
    }, 1000);
  } else {
    // Identical
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.classList.add("match");
    card2.classList.add("match");
    toggleInteraction(true);
    // memoryGameContainer.style.pointerEvents = "auto";
    matchSound.play();
  }
}
function toggleInteraction(interact) {
  memoryGameContainer.classList.toggle("no-click", !interact);
}
