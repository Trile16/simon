// Game State

const gameState = {
  colorSequence: ["red", "yellow", "green", "green", "blue"],
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

// Event Handlers

colorBox.addEventListener("click", (e) => {
  if (gameState.buttonsActive) {
    console.log(e.target.id);
    if (e.target.id === gameState.colorSequence[gameState.colorIndex]) {
      gameState.colorIndex++;
      console.log(gameState.colorIndex);
    }
  }
});

const runSequence = () => {
  gameState.buttonsActive = false;
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
        console.log("green");
        green.style.backgroundColor = "lightgreen";
      }

      if (color === "red") {
        console.log("red");
        red.style.backgroundColor = "pink";
      }

      if (color === "yellow") {
        console.log("yellow");
        yellow.style.backgroundColor = "lightyellow";
      }

      if (color === "blue") {
        console.log("blue");
        blue.style.backgroundColor = "lightblue";
      }
    }, i * 1000);

    setTimeout(() => {
      green.style.backgroundColor = "green";
      red.style.backgroundColor = "red";
      yellow.style.backgroundColor = "yellow";
      blue.style.backgroundColor = "blue";
      console.log("time out?");
    }, (i + 0.5) * 1000);
  }

  setTimeout(() => {
    console.log("end");
    gameState.buttonsActive = true;
  }, gameState.colorSequence.length * 1000);
};

runSequence();
