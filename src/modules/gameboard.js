import { Ship } from "./ships";

class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
    this.missedAttacks = [];
  }
  createBoard() {
    const rows = 10;
    const columns = 10;
    const cellContent = null; // Using null to represent an empty cell
    const board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = cellContent;
      }
    }
    return board;
  }

  // Places and checks if it can place a ship
  // Returns true if placed
  placeShip(length, startX, startY, isHorizontal) {
    const ship = new Ship(length);
    if (this.canPlaceShip(length, startX, startY, isHorizontal)) {
      for (let i = 0; i < length; i++) {
        if (isHorizontal) {
          this.board[startY][startX + i] = ship;
        } else {
          this.board[startY + i][startX] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    } else {
      return false;
    }
  }

  canPlaceShip(length, startX, startY, isHorizontal) {
    if (isHorizontal) {
      // If it exceeds the gameboard return false
      if (startX + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[startY][startX + i] !== null) return false;
      }
    } else {
      if (startY + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[startY + i][startX] !== null) return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (this.board[y][x] instanceof Ship) {
      this.board[y][x].hit();
      return true;
    } else {
      this.board[y][x] = "miss";
      this.missedAttacks.push({ x, y });
      return false;
    }
  }

  allShipsSunk() {
    if (this.ships.every((ship) => ship.sunk) == false) {
      return false;
    } else return true;
  }
}

export { Gameboard };
