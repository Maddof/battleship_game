import { Gameboard } from "./gameboard";

const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

const compBoard = new Gameboard();

// compBoardWrapper.addEventListener("click", (e) => {
//   console.log(e);
// });

(function placeCompShips() {
  const ship1 = compBoard.placeShip(3, 0, 0);
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
  //const result = gameboard.receiveAttack(x, y);
  //   if (result) {
  //     event.target.classList.add("hit");
  //   } else {
  //     event.target.classList.add("miss");
  //   }
  event.target.removeEventListener("click", handleCellClick); // Remove event listener after click
};

// buttons.forEach((button, i) => {
//   button.addEventListener("click", () => {
//     console.log("Helllls");
//     const row = Math.floor(i / 3);
//     const col = i % 3;
//     button.classList.add("center-anime");
//   });
// });

function renderPlayerBoard() {
  const playerBoard = new Gameboard();

  playerBoard.board.forEach((row) => {
    row.forEach((cell) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("player-cell");

      playerBoardWrapper.appendChild(gridCell);
    });
  });
}

export { renderCompBoard, renderPlayerBoard };
