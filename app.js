// Game State
const gameState = {
  colorSequence: [],
  colorIndex: 0,
  highScore: 0,
  buttonsActive: false,
};

// DOM

const colorBox = document.getElementById("color-box");
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");

// Audio

const gameOver = new Audio("./assets/gameover.wav");
const cNote = new Audio("./assets/piano-c_C_major.wav");
const dNote = new Audio("./assets/piano-d_D_major.wav");
const eNote = new Audio("./assets/piano-e_E_major.wav");
const gNote = new Audio("./assets/piano-g_G_major.wav");

// Event Handlers

colorBox.addEventListener("click", (e) => {
  if (gameState.buttonsActive) {
    if (e.target.id === gameState.colorSequence[gameState.colorIndex]) {
      if (e.target.id === "green") {
        let cClone = cNote.cloneNode();
        cClone.volume = 0.2;
        cClone.play();
      } else if (e.target.id === "red") {
        let dClone = dNote.cloneNode();
        dClone.volume = 0.2;
        dClone.play();
      } else if (e.target.id === "yellow") {
        let eClone = eNote.cloneNode();
        eClone.volume = 0.2;
        eClone.play();
      } else {
        let gClone = gNote.cloneNode();
        gClone.volume = 0.2;
        gClone.play();
      }

      gameState.colorIndex++;
      if (gameState.colorIndex === gameState.colorSequence.length) {
        score.innerText = `Score: ${gameState.colorSequence.length}`;
        if (gameState.highScore < gameState.colorSequence.length) {
          gameState.highScore = gameState.colorSequence.length;
          highScore.innerText = `High Score: ${gameState.highScore}`;
          localStorage.setItem("simonhighscore", gameState.highScore);
        }

        runSequence();
      }
    } else {
      let gameOverClone = gameOver.cloneNode();
      gameOverClone.volume = 0.3;
      gameOverClone.play();
      if (gameState.highScore < gameState.colorSequence.length) {
        gameState.highScore = gameState.colorSequence.length - 1;
        highScore.innerText = `High Score: ${gameState.highScore}`;
      }
      gameState.colorSequence = [];
      score.innerText = `Score: ${gameState.colorSequence.length}`;
      runSequence();
    }
  }
});

const runSequence = () => {
  green.style.pointerEvents = "none";
  red.style.pointerEvents = "none";
  yellow.style.pointerEvents = "none";
  blue.style.pointerEvents = "none";
  gameState.buttonsActive = false;
  gameState.colorIndex = 0;
  const randomColor = Math.floor(Math.random() * 4);

  if (randomColor === 0) {
    gameState.colorSequence.push("green");
  } else if (randomColor === 1) {
    gameState.colorSequence.push("red");
  } else if (randomColor === 2) {
    gameState.colorSequence.push("yellow");
  } else {
    gameState.colorSequence.push("blue");
  }

  for (let i = 0; i < gameState.colorSequence.length; i++) {
    const color = gameState.colorSequence[i];

    setTimeout(() => {
      if (color === "green") {
        green.style.backgroundColor = "lightgreen";
        let cClone = cNote.cloneNode();
        cClone.volume = 0.2;
        cClone.play();
      }

      if (color === "red") {
        red.style.backgroundColor = "pink";
        let dClone = dNote.cloneNode();
        dClone.volume = 0.2;
        dClone.play();
      }

      if (color === "yellow") {
        yellow.style.backgroundColor = "lightyellow";
        let eClone = eNote.cloneNode();
        eClone.volume = 0.2;
        eClone.play();
      }

      if (color === "blue") {
        blue.style.backgroundColor = "lightblue";
        let gClone = gNote.cloneNode();
        gClone.volume = 0.2;
        gClone.play();
      }
    }, (i + 0.5) * 1000);

    setTimeout(() => {
      green.style.backgroundColor = "green";
      red.style.backgroundColor = "red";
      yellow.style.backgroundColor = "yellow";
      blue.style.backgroundColor = "blue";
    }, (i + 1) * 1000);
  }

  setTimeout(() => {
    gameState.buttonsActive = true;
    green.style.backgroundColor = "green";
    red.style.backgroundColor = "red";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "blue";
    green.style.pointerEvents = "auto";
    red.style.pointerEvents = "auto";
    yellow.style.pointerEvents = "auto";
    blue.style.pointerEvents = "auto";
  }, gameState.colorSequence.length * 1000);
};

if (localStorage.getItem("simonhighscore")) {
  gameState.highScore = localStorage.getItem("simonhighscore");
  highScore.innerText = `High Score: ${gameState.highScore}`;
}
runSequence();
