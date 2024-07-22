import { startGame } from "./modules/game";

import "./style.css";

const startButton = document.getElementById("startbutton");

startButton.addEventListener("click", (e) => {
  e.preventDefault();
  startGame();
  console.log("clicked the start button");
});

startGame();
