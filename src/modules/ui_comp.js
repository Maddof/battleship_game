import { humanPlayer } from "./ui_ player";
import { resetGame, startGame } from "./game";
import { Player } from "./players";

const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

var compPlayer = new Player();

function renderCompBoard() {
  compPlayer.board.randomPlaceAllShips();

  compPlayer.board.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("comp-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      compBoardWrapper.appendChild(gridCell);

      if (cell !== null) {
        gridCell.classList.add("test-class");
      }

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
