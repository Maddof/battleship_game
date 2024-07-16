class Ship {
  constructor(length, hits = 0, sunk = false) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
  }
  hit() {
    this.hits += 1;
    if (this.hits >= this.length) {
      this.sunk = true;
    }
  }
  isSunk() {
    if (this.hits >= this.length) return true;
    else return false;
    //return this.sunk;
  }
}

let ship1 = new Ship(3, 0, false);

export { Ship };
