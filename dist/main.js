/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

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

  resetBoard() {
    this.ships.length = 0;
    this.missedAttacks.length = 0;
    this.board = this.createBoard(); // Reset the board
  }

  isAlreadyAttacked(x, y) {
    return this.missedAttacks.some(
      (attack) => attack.x === x && attack.y === y
    );
  }
}




/***/ }),

/***/ "./src/modules/players.js":
/*!********************************!*\
  !*** ./src/modules/players.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");


class Player {
  constructor() {
    this.playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    this.winner = false;
  }
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




/***/ }),

/***/ "./src/modules/ui_ player.js":
/*!***********************************!*\
  !*** ./src/modules/ui_ player.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playerBoard: () => (/* binding */ playerBoard),
/* harmony export */   renderPlayerBoard: () => (/* binding */ renderPlayerBoard)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");


const playerBoardWrapper = document.querySelector(".player_board");

const playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();

function renderPlayerBoard() {
  playerBoard.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("player-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      playerBoardWrapper.appendChild(gridCell);
    });
  });
}




/***/ }),

/***/ "./src/modules/ui_comp.js":
/*!********************************!*\
  !*** ./src/modules/ui_comp.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCompBoard: () => (/* binding */ renderCompBoard)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ "./src/modules/ships.js");
/* harmony import */ var _ui_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui_ player */ "./src/modules/ui_ player.js");




const compBoardWrapper = document.querySelector(".comp_board");

const carrierShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(5);
const battleShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(4);
const destroyerShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(3);
const submarineShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(3);
const patrolboatShip = new _ships__WEBPACK_IMPORTED_MODULE_1__.Ship(2);

var compBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();

function placeCompShips() {
  console.log(compBoard.ships);

  compBoard.resetBoard();
  console.log(compBoard.ships);

  compBoard.placeShip(2, 0, 0, true);
  // compBoard.placeShip(battleShip.length, 0, 1, true);
  // compBoard.placeShip(destroyerShip.length, 0, 2, true);
  // compBoard.placeShip(submarineShip.length, 0, 3, true);
  // compBoard.placeShip(patrolboatShip.length, 0, 4, true);
}

function renderCompBoard() {
  placeCompShips();
  compBoardWrapper.innerHTML = "";
  compBoard.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("comp-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      compBoardWrapper.appendChild(gridCell);

      gridCell.addEventListener("click", handleCellClick);
    });
  });
}

// Function to handle cell click event
const handleCellClick = (event) => {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);
  console.log(x + " " + y);
  const attackResult = compBoard.receiveAttack(x, y);
  if (attackResult) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
  event.target.removeEventListener("click", handleCellClick); // Remove event listener after click to prevent re-click

  if (compBoard.allShipsSunk()) {
    console.log("All ships sunk");
    setTimeout(() => {
      renderCompBoard();
    }, 1000);
  }
  compAttack();
};

function compAttack() {
  console.log("computer attacks...");
  let compXAttack;
  let compYAttack;
  let attackResult;

  const playerBoardWrapper = document.querySelector(".player_board");

  let compAttack = { x: compXAttack, y: compYAttack };

  // Ensure unique attacks
  do {
    compXAttack = Math.floor(Math.random() * 10);
    compYAttack = Math.floor(Math.random() * 10);
  } while (_ui_player__WEBPACK_IMPORTED_MODULE_2__.playerBoard.isAlreadyAttacked(compXAttack, compYAttack));

  console.log(`Computer attacks (${compXAttack}, ${compYAttack})`);

  attackResult = _ui_player__WEBPACK_IMPORTED_MODULE_2__.playerBoard.receiveAttack(compXAttack, compYAttack);

  const attackedCell = playerBoardWrapper.querySelector(
    `[data-x="${compXAttack}"][data-y="${compYAttack}"]`
  );

  if (attackResult) {
    attackedCell.classList.add("hit");
  } else {
    attackedCell.classList.add("miss");
  }

  if (_ui_player__WEBPACK_IMPORTED_MODULE_2__.playerBoard.allShipsSunk()) {
    console.log("All player ships have been sunk. Computer wins!");
    // setTimeout(() => {
    //   renderPlayerBoard(); // Reset and re-render the player board after a short delay
    // }, 1000);
  }
}




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
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _modules_ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ships */ "./src/modules/ships.js");
/* harmony import */ var _modules_players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/players */ "./src/modules/players.js");
/* harmony import */ var _modules_ui_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/ui_comp */ "./src/modules/ui_comp.js");
/* harmony import */ var _modules_ui_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/ui_ player */ "./src/modules/ui_ player.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/style.css");







(0,_modules_ui_comp__WEBPACK_IMPORTED_MODULE_3__.renderCompBoard)();
(0,_modules_ui_player__WEBPACK_IMPORTED_MODULE_4__.renderPlayerBoard)();

/******/ })()
;
//# sourceMappingURL=main.js.map