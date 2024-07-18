import { Gameboard } from "./gameboard";

class Player {
  constructor() {
    this.playerBoard = new Gameboard();
    this.winner = false;
  }
}

export { Player };
