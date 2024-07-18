import { Gameboard } from "./gameboard";
import { Ship } from "./ships";

const compBoardWrapper = document.querySelector(".comp_board");

const compBoard = new Gameboard();

const carrierShip = new Ship(5);
const battleShip = new Ship(4);
const destroyerShip = new Ship(3);
const submarineShip = new Ship(3);
const patrolboatShip = new Ship(2);

(function placeCompShips() {
  compBoard.placeShip(carrierShip.length, 0, 0, true);
  compBoard.placeShip(battleShip.length, 0, 1, true);
})();

function renderCompBoard() {
  compBoard.board.forEach((row, y) => {
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
  const attackResult = compBoard.receiveAttack(x, y);
  if (attackResult) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
  event.target.removeEventListener("click", handleCellClick); // Remove event listener after click to prevent re-click
};

export { renderCompBoard };
