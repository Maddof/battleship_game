import { Player } from "./players";

const playerBoardWrapper = document.querySelector(".player_board");

let humanPlayer = new Player();

function placePlayerShips() {
  humanPlayer.board.placeShip(2, 0, 0, true);
  humanPlayer.board.placeShip(3, 0, 1, true);
  humanPlayer.board.placeShip(4, 0, 2, true);
  humanPlayer.board.placeShip(5, 0, 3, true);
  humanPlayer.board.placeShip(6, 0, 4, true);

  // compBoard.placeShip(battleShip.length, 0, 1, true);
  // compBoard.placeShip(destroyerShip.length, 0, 2, true);
  // compBoard.placeShip(submarineShip.length, 0, 3, true);
  // compBoard.placeShip(patrolboatShip.length, 0, 4, true);
}

function renderPlayerBoard() {
  placePlayerShips();
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

export { renderPlayerBoard, humanPlayer };
