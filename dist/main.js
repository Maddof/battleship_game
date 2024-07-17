/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/modules/ships.js");


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
    const ship = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(length);
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
    if (this.board[y][x] instanceof _ships__WEBPACK_IMPORTED_MODULE_0__.Ship) {
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




/***/ }),

/***/ "./src/modules/saygoodbye.js":
/*!***********************************!*\
  !*** ./src/modules/saygoodbye.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sayGoodBye: () => (/* binding */ sayGoodBye)
/* harmony export */ });
function sayGoodBye() {
  console.log("Goodbye!");
}




/***/ }),

/***/ "./src/modules/ships.js":
/*!******************************!*\
  !*** ./src/modules/ships.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ add)
/* harmony export */ });
/* harmony import */ var _modules_saygoodbye__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/saygoodbye */ "./src/modules/saygoodbye.js");
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _modules_ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ships */ "./src/modules/ships.js");




function sayHello() {
  console.log("Hello world");
}

function add(a, b) {
  return a + b;
}

sayHello();
(0,_modules_saygoodbye__WEBPACK_IMPORTED_MODULE_0__.sayGoodBye)();

// example

const gameboard = new _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
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

console.log("test");

/******/ })()
;
//# sourceMappingURL=main.js.map