import { Gameboard } from "./gameboard";

const playerBoardWrapper = document.querySelector(".player_board");
const playerBoard = new Gameboard();

function renderPlayerBoard() {
  playerBoard.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("player-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      playerBoardWrapper.appendChild(gridCell);
    });
  });
}

// function renderCompBoard() {
//   compBoard.board.forEach((row, y) => {
//     row.forEach((cell, x) => {
//       const gridCell = document.createElement("div");
//       gridCell.classList.add("comp-cell");
//       gridCell.dataset.x = x;
//       gridCell.dataset.y = y;

//       compBoardWrapper.appendChild(gridCell);

//       gridCell.addEventListener("click", handleCellClick);
//     });
//   });
// }

export { renderPlayerBoard };
