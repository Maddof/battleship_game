import { renderCompBoard, compPlayer } from "./ui_comp";
import { renderPlayerBoard, humanPlayer } from "./ui_ player";

const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

function resetGame() {
  compBoardWrapper.innerHTML = "";
  playerBoardWrapper.innerHTML = "";
  compPlayer.winner = false;
  humanPlayer.winner = false;
  compPlayer.board.resetBoard();
  humanPlayer.board.resetBoard();
}

function startGame() {
  renderCompBoard();
  renderPlayerBoard();
}

export { resetGame, startGame };
