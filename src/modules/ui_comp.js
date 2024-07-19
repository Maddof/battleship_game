import { Ship } from "./ships";
import { humanPlayer } from "./ui_ player";
import { resetGame, startGame } from "./game";
import { Player } from "./players";

const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

const carrierShip = new Ship(5);
const battleShip = new Ship(4);
const destroyerShip = new Ship(3);
const submarineShip = new Ship(3);
const patrolboatShip = new Ship(2);

var compPlayer = new Player();

console.log(compPlayer.board);

function placeCompShips() {
  compPlayer.board.placeShip(2, 0, 0, true);
  // compBoard.placeShip(2, 0, 0, true);
  // compBoard.placeShip(battleShip.length, 0, 1, true);
  // compBoard.placeShip(destroyerShip.length, 0, 2, true);
  // compBoard.placeShip(submarineShip.length, 0, 3, true);
  // compBoard.placeShip(patrolboatShip.length, 0, 4, true);
}

function renderCompBoard() {
  placeCompShips();
  // compBoard.board.forEach((row, y) => {
  // compPlayer.board.forEach((row, y) => {
  compPlayer.board.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("comp-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      compBoardWrapper.appendChild(gridCell);

      gridCell.addEventListener("click", handleCellClick);
    });
  });
}

// Function to handle cell click event
const handleCellClick = (event) => {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);
  console.log(x + " " + y);
  const attackResult = compPlayer.board.receiveAttack(x, y);
  if (attackResult) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
  event.target.removeEventListener("click", handleCellClick); // Remove event listener after click to prevent re-click

  if (compPlayer.board.allShipsSunk()) {
    console.log("All comp ships sunk");
    humanPlayer.winner = true;
    setTimeout(() => {
      resetGame();
      startGame();
    }, 1000);
  }
  compAttack();
};

function compAttack() {
  console.log("computer attacks...");
  let compXAttack;
  let compYAttack;
  let attackResult;

  // Ensure unique attacks
  do {
    compXAttack = Math.floor(Math.random() * 10);
    compYAttack = Math.floor(Math.random() * 10);
  } while (humanPlayer.board.isAlreadyAttacked(compXAttack, compYAttack));

  console.log(`Computer attacks (${compXAttack}, ${compYAttack})`);

  attackResult = humanPlayer.board.receiveAttack(compXAttack, compYAttack);

  const attackedCell = playerBoardWrapper.querySelector(
    `[data-x="${compXAttack}"][data-y="${compYAttack}"]`
  );

  if (attackResult) {
    attackedCell.classList.add("hit");
  } else {
    attackedCell.classList.add("miss");
  }

  if (humanPlayer.board.allShipsSunk()) {
    console.log("All player ships have been sunk. Computer wins!");
    compPlayer.winner = true;
    setTimeout(() => {
      resetGame();
      startGame();
    }, 1000);
  }
}

export { renderCompBoard, compPlayer };
