import { sayGoodBye } from "./modules/saygoodbye";
import { Gameboard } from "./modules/gameboard";
import { Ship } from "./modules/ships";
import { Player } from "./modules/players";

function sayHello() {
  console.log("Hello world");
}

export default function add(a, b) {
  return a + b;
}

sayHello();
sayGoodBye();

// example

const gameboard = new Gameboard();
const success = gameboard.placeShip(3, 0, 0, true); // Place a horizontal ship of length 3 at (0, 0)
const success2 = gameboard.placeShip(2, 2, 1, false); // Place a vertical ship of length 2 at (2, 1)

console.log(success); // true if the ship was placed successfully
console.log(gameboard.board); // The board state with the ship placed

console.log(gameboard.ships);

const attackResult1 = gameboard.receiveAttack(0, 0); // Should be a hit
const attackResult2 = gameboard.receiveAttack(1, 1); // Should be a miss
console.log(attackResult1); // true
console.log(attackResult2); // false
console.log(gameboard.board); // The board state with hits and misses

console.log(gameboard.missedAttacks);

console.log(gameboard.ships);

console.log(gameboard.allShipsSunk());

const newPlayer = new Player();

console.log(newPlayer.winner);

console.log(newPlayer.playerBoard);

console.log("test");
