import { humanPlayer, playerClick } from "./ui_ player";
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

      // if (cell !== null) {
      //   gridCell.classList.add("test-class");
      // }

      // Add event listener to handle player action
      gridCell.addEventListener("click", playerClick);
    });
  });
}

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

export { renderCompBoard, compPlayer, compAttack };
