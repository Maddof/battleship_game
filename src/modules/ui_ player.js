import { Player } from "./players";
import { compPlayer, compAttack } from "./ui_comp";

const playerBoardWrapper = document.querySelector(".player_board");

let humanPlayer = new Player();

function renderPlayerBoard() {
  humanPlayer.board.randomPlaceAllShips();
  // placePlayerShips();
  humanPlayer.board.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("player-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      playerBoardWrapper.appendChild(gridCell);

      if (cell !== null) {
        gridCell.classList.add("player-cell-ship");
      }
    });
  });
}

// Function to handle cell click event
const playerClick = (event) => {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);
  const attackResult = compPlayer.board.receiveAttack(x, y);
  if (attackResult) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
  event.target.removeEventListener("click", playerClick); // Remove event listener after click to prevent re-click

  if (compPlayer.board.allShipsSunk()) {
    console.log("All comp ships sunk");
    humanPlayer.winner = true;
    setTimeout(() => {
      resetGame();
      startGame();
    }, 1000);
    // We return early so computer dont get another hit off after loosing
    return;
  }
  // Return attack by computer defined in ui_comp.js
  compAttack();
};

export { renderPlayerBoard, humanPlayer, playerClick };
