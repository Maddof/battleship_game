import { sayGoodBye } from "./modules/saygoodbye";
import { Gameboard } from "./modules/gameboard";
import { Ship } from "./modules/ships";

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
console.log(success); // true if the ship was placed successfully
console.log(gameboard.board); // The board state with the ship placed

const myship = new Ship(2);

console.log(myship.hits);
console.log(myship.isSunk());
console.log(myship.length);

console.log("test");
