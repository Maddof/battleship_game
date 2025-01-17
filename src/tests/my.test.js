import add from "../index";
import { Gameboard } from "../modules/gameboard";
import { Ship } from "../modules/ships";

describe("index.js", function () {
  test("add two numbers", function () {
    expect(add(1, 2)).toBe(3);
  });
});

describe("Gameboard class", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("should create a 10x10 board", () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  test("should place a ship horizontally", () => {
    const success = gameboard.placeShip(3, 0, 0, true);
    expect(success).toBe(true);
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][1]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][2]).toBeInstanceOf(Ship);
  });

  test("should place a ship vertically", () => {
    const success = gameboard.placeShip(3, 0, 0, false);
    expect(success).toBe(true);
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[1][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[2][0]).toBeInstanceOf(Ship);
  });

  test("should record a hit on a ship", () => {
    gameboard.placeShip(3, 0, 0, true);
    const success = gameboard.receiveAttack(0, 0);
    expect(success).toBe(true);
    expect(gameboard.board[0][0].hits).toBe(1);
  });

  test("should record a miss", () => {
    gameboard.placeShip(3, 0, 0, true);
    const success = gameboard.receiveAttack(1, 1);
    expect(success).toBe(false);
    expect(gameboard.board[1][1]).toBe("miss");
    expect(gameboard.missedAttacks).toContainEqual({ x: 1, y: 1 });
  });

  test("should report true when all ships sunk", () => {
    gameboard.placeShip(1, 0, 0, true);
    gameboard.placeShip(2, 1, 1, false);

    const attack = gameboard.receiveAttack(0, 0);
    const attack2 = gameboard.receiveAttack(1, 1);
    const attack3 = gameboard.receiveAttack(1, 2);

    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("should report false when all ships are NOT sunk", () => {
    gameboard.placeShip(1, 0, 0, true);
    gameboard.placeShip(2, 1, 1, false);

    const attack = gameboard.receiveAttack(0, 0);
    const attack2 = gameboard.receiveAttack(1, 1);

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});

describe("Ship class", () => {
  test("should create a new Ship object", () => {
    const length = 3;
    const hits = 0;
    const sunk = false;
    const ship = new Ship(length, hits, sunk);

    expect(ship).toBeInstanceOf(Ship);
    expect(ship.length).toBe(length);
    expect(ship.hits).toBe(hits);
    expect(ship.sunk).toBe(sunk);
  });

  test("should increment hits when hit() is called", () => {
    const ship = new Ship(3, 0, false);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("should increment hits when hit() is called", () => {
    const ship = new Ship(3, 0, false);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("should return true for isSunk() if hits are greater than or equal to length", () => {
    const ship = new Ship(3, 3, false);
    expect(ship.isSunk()).toBe(true);

    const ship2 = new Ship(3, 2, false);
    ship2.hit();
    expect(ship2.isSunk()).toBe(true);
  });

  test("should return false for isSunk() if hits are less than length", () => {
    const ship = new Ship(3, 1, false);
    expect(ship.isSunk()).toBe(false);
  });
});
