import { Gameboard } from "./gameboard";

class Player {
  constructor() {
    this.board = new Gameboard();
    this.winner = false;
  }
  // get board() {
  //   return this.board.board;
  // }

  // placeShip(length, x, y, isHorizontal) {
  //   return this.gameboard.placeShip(length, x, y, isHorizontal);
  // }

  // receiveAttack(x, y) {
  //   return this.gameboard.receiveAttack(x, y);
  // }

  // allShipsSunk() {
  //   return this.gameboard.allShipsSunk();
  // }

  // resetBoard() {
  //   this.gameboard.resetBoard();
  // }

  // isAlreadyAttacked(x, y) {
  //   return this.gameboard.isAlreadyAttacked(x, y);
  // }
}

export { Player };
