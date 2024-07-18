import { sayGoodBye } from "./modules/saygoodbye";
import { Gameboard } from "./modules/gameboard";
import { Ship } from "./modules/ships";
import { Player } from "./modules/players";
import { renderCompBoard, renderPlayerBoard } from "./modules/ui_";
import "./style.css";

function sayHello() {
  console.log("Hello world");
}

export default function add(a, b) {
  return a + b;
}

sayHello();
sayGoodBye();

renderCompBoard();
renderPlayerBoard();
