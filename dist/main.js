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

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetGame: () => (/* binding */ resetGame),
/* harmony export */   shipsGlobal: () => (/* binding */ shipsGlobal),
/* harmony export */   startGame: () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _ui_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui_comp */ "./src/modules/ui_comp.js");
/* harmony import */ var _ui_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui_ player */ "./src/modules/ui_ player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ships */ "./src/modules/ships.js");




const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

const carrierShip = new _ships__WEBPACK_IMPORTED_MODULE_2__.Ship(5);
const battleShip = new _ships__WEBPACK_IMPORTED_MODULE_2__.Ship(4);
const destroyerShip = new _ships__WEBPACK_IMPORTED_MODULE_2__.Ship(3);
const submarineShip = new _ships__WEBPACK_IMPORTED_MODULE_2__.Ship(3);
const patrolboatShip = new _ships__WEBPACK_IMPORTED_MODULE_2__.Ship(2);

const shipsGlobal = [
  carrierShip,
  battleShip,
  destroyerShip,
  submarineShip,
  patrolboatShip,
];

function resetGame() {
  compBoardWrapper.innerHTML = "";
  playerBoardWrapper.innerHTML = "";
  _ui_comp__WEBPACK_IMPORTED_MODULE_0__.compPlayer.winner = false;
  _ui_player__WEBPACK_IMPORTED_MODULE_1__.humanPlayer.winner = false;
  _ui_comp__WEBPACK_IMPORTED_MODULE_0__.compPlayer.board.resetBoard();
  _ui_player__WEBPACK_IMPORTED_MODULE_1__.humanPlayer.board.resetBoard();
}

function startGame() {
  resetGame();
  (0,_ui_comp__WEBPACK_IMPORTED_MODULE_0__.renderCompBoard)();
  (0,_ui_player__WEBPACK_IMPORTED_MODULE_1__.renderPlayerBoard)();
}




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
/* harmony import */ var _helperfunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperfunctions */ "./src/modules/helperfunctions.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");




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
    const ship = new _ships__WEBPACK_IMPORTED_MODULE_0__.Ship(length);
    this.ships.push(ship);
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

  randomPlaceAllShips() {
    // Randomly places all 5 types of ships on the board
    let shipLength;
    let x;
    let y;
    let randomOrientation;

    _game__WEBPACK_IMPORTED_MODULE_2__.shipsGlobal.forEach((ship) => {
      let placed = false;
      while (!placed) {
        shipLength = ship.length;
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        randomOrientation = (0,_helperfunctions__WEBPACK_IMPORTED_MODULE_1__.getRandomBoolean)();
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
    if (this.board[y][x] instanceof _ships__WEBPACK_IMPORTED_MODULE_0__.Ship) {
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




/***/ }),

/***/ "./src/modules/helperfunctions.js":
/*!****************************************!*\
  !*** ./src/modules/helperfunctions.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomBoolean: () => (/* binding */ getRandomBoolean)
/* harmony export */ });
// Returns true or false 50:50 chance

function getRandomBoolean() {
  return Math.random() >= 0.5;
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
    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    this.winner = false;
  }
  // get board() {
  //   return this.board.board;
  // }

  // placeShip(length, x, y, isHorizontal) {
  //   return this.gameboard.placeShip(length, x, y, isHorizontal);
  // }

  // receiveAttack(x, y) {
  //   return this.gameboard.receiveAttack(x, y);
  // }

  // allShipsSunk() {
  //   return this.gameboard.allShipsSunk();
  // }

  // resetBoard() {
  //   this.gameboard.resetBoard();
  // }

  // isAlreadyAttacked(x, y) {
  //   return this.gameboard.isAlreadyAttacked(x, y);
  // }
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
/* harmony export */   handleCellClick: () => (/* binding */ handleCellClick),
/* harmony export */   humanPlayer: () => (/* binding */ humanPlayer),
/* harmony export */   renderPlayerBoard: () => (/* binding */ renderPlayerBoard)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/modules/players.js");
/* harmony import */ var _ui_comp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui_comp */ "./src/modules/ui_comp.js");



const playerBoardWrapper = document.querySelector(".player_board");

let humanPlayer = new _players__WEBPACK_IMPORTED_MODULE_0__.Player();

function renderPlayerBoard() {
  humanPlayer.board.randomPlaceAllShips();
  // placePlayerShips();
  humanPlayer.board.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("player-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      playerBoardWrapper.appendChild(gridCell);

      if (cell !== null) {
        gridCell.classList.add("player-cell-ship");
      }
    });
  });
}

// Function to handle cell click event
const handleCellClick = (event) => {
  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);
  const attackResult = _ui_comp__WEBPACK_IMPORTED_MODULE_1__.compPlayer.board.receiveAttack(x, y);
  if (attackResult) {
    event.target.classList.add("hit");
  } else {
    event.target.classList.add("miss");
  }
  event.target.removeEventListener("click", handleCellClick); // Remove event listener after click to prevent re-click

  if (_ui_comp__WEBPACK_IMPORTED_MODULE_1__.compPlayer.board.allShipsSunk()) {
    console.log("All comp ships sunk");
    humanPlayer.winner = true;
    setTimeout(() => {
      resetGame();
      startGame();
    }, 1000);
    // We return early so computer dont get another hit off after loosing
    return;
  }
  // Return attack by computer defined in ui_comp.js
  (0,_ui_comp__WEBPACK_IMPORTED_MODULE_1__.compAttack)();
};




/***/ }),

/***/ "./src/modules/ui_comp.js":
/*!********************************!*\
  !*** ./src/modules/ui_comp.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compAttack: () => (/* binding */ compAttack),
/* harmony export */   compPlayer: () => (/* binding */ compPlayer),
/* harmony export */   renderCompBoard: () => (/* binding */ renderCompBoard)
/* harmony export */ });
/* harmony import */ var _ui_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui_ player */ "./src/modules/ui_ player.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/modules/game.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./players */ "./src/modules/players.js");




const compBoardWrapper = document.querySelector(".comp_board");
const playerBoardWrapper = document.querySelector(".player_board");

var compPlayer = new _players__WEBPACK_IMPORTED_MODULE_2__.Player();

function renderCompBoard() {
  compPlayer.board.randomPlaceAllShips();

  compPlayer.board.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      const gridCell = document.createElement("div");
      gridCell.classList.add("comp-cell");
      gridCell.dataset.x = x;
      gridCell.dataset.y = y;

      compBoardWrapper.appendChild(gridCell);

      // if (cell !== null) {
      //   gridCell.classList.add("test-class");
      // }

      gridCell.addEventListener("click", _ui_player__WEBPACK_IMPORTED_MODULE_0__.handleCellClick);
    });
  });
}

function compAttack() {
  console.log("computer attacks...");
  let compXAttack;
  let compYAttack;
  let attackResult;

  // Ensure unique attacks
  do {
    compXAttack = Math.floor(Math.random() * 10);
    compYAttack = Math.floor(Math.random() * 10);
  } while (_ui_player__WEBPACK_IMPORTED_MODULE_0__.humanPlayer.board.isAlreadyAttacked(compXAttack, compYAttack));

  console.log(`Computer attacks (${compXAttack}, ${compYAttack})`);

  attackResult = _ui_player__WEBPACK_IMPORTED_MODULE_0__.humanPlayer.board.receiveAttack(compXAttack, compYAttack);

  const attackedCell = playerBoardWrapper.querySelector(
    `[data-x="${compXAttack}"][data-y="${compYAttack}"]`
  );

  if (attackResult) {
    attackedCell.classList.add("hit");
  } else {
    attackedCell.classList.add("miss");
  }

  if (_ui_player__WEBPACK_IMPORTED_MODULE_0__.humanPlayer.board.allShipsSunk()) {
    console.log("All player ships have been sunk. Computer wins!");
    compPlayer.winner = true;
    setTimeout(() => {
      (0,_game__WEBPACK_IMPORTED_MODULE_1__.resetGame)();
      (0,_game__WEBPACK_IMPORTED_MODULE_1__.startGame)();
    }, 1000);
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
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");




const startButton = document.getElementById("startbutton");

startButton.addEventListener("click", () => {
  (0,_modules_game__WEBPACK_IMPORTED_MODULE_0__.startGame)();
  console.log("clicked the start button");
});

(0,_modules_game__WEBPACK_IMPORTED_MODULE_0__.startGame)();

/******/ })()
;
//# sourceMappingURL=main.js.map