import { Ship } from "./ships";
import { getRandomBoolean } from "./helperfunctions";
import { shipsGlobal } from "./game";

class Gameboard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
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

  createShip(length) {
    const ship = new Ship(length);
    this.ships.push(ship);
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

  randomPlaceAllShips() {
    // Randomly places all 5 types of ships on the board
    let shipLength;
    let x;
    let y;
    let randomOrientation;

    shipsGlobal.forEach((ship) => {
      let placed = false;
      while (!placed) {
        shipLength = ship.length;
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        randomOrientation = getRandomBoolean();
        if (this.canPlaceShip(shipLength, x, y, randomOrientation)) {
          this.placeShip(shipLength, x, y, randomOrientation);
          placed = true;
        } else {
          placed = false;
        }
      }
    });
  }

  receiveAttack(x, y) {
    if (this.board[y][x] instanceof Ship) {
      this.board[y][x].hit();
      this.hitAttacks.push({ x, y }); // Add to hit coordinates
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

  resetBoard() {
    this.ships.length = 0;
    this.missedAttacks.length = 0;
    this.hitAttacks.length = 0;
    this.board = this.createBoard(); // Reset the board
  }

  isAlreadyAttacked(x, y) {
    return (
      this.missedAttacks.some((attack) => attack.x === x && attack.y === y) ||
      this.hitAttacks.some((attack) => attack.x === x && attack.y === y)
    );
  }
}

export { Gameboard };
