import { renderCompBoard, compPlayer } from "./ui_comp";
import { renderPlayerBoard, humanPlayer } from "./ui_ player";
import { Ship } from "./ships";

const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

const carrierShip = new Ship(5);
const battleShip = new Ship(4);
const destroyerShip = new Ship(3);
const submarineShip = new Ship(3);
const patrolboatShip = new Ship(2);

const shipsGlobal = [
  carrierShip,
  battleShip,
  destroyerShip,
  submarineShip,
  patrolboatShip,
];

function resetGame() {
  compBoardWrapper.innerHTML = "";
  playerBoardWrapper.innerHTML = "";
  compPlayer.winner = false;
  humanPlayer.winner = false;
  compPlayer.board.resetBoard();
  humanPlayer.board.resetBoard();
}

function startGame() {
  resetGame();
  renderCompBoard();
  renderPlayerBoard();
}

export { resetGame, startGame, shipsGlobal };
