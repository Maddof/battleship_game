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

export { renderPlayerBoard, playerBoard };
