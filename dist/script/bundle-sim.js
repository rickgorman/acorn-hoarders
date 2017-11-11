/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sim = function () {
  function Sim() {
    _classCallCheck(this, Sim);

    // binds
    this.run = this.run.bind(this);
    this.tick = this.tick.bind(this);

    // set up a drawing context
    this.canvas = document.getElementById('canvas');
    this.canvas.width = _board.BOARD_WIDTH;
    this.canvas.height = _board.BOARD_WIDTH;
    this.ctx = this.canvas.getContext('2d');

    this.board = new _board2.default(this.ctx);
  }

  _createClass(Sim, [{
    key: 'run',
    value: function run() {
      // just tick once for now
      this.tick();
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.board.tick();
      this.board.render();
    }
  }]);

  return Sim;
}();

// entry


var sim = new Sim();
sim.run();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CELL_PADDING = exports.SPRITE_WIDTH = exports.CELL_WIDTH = exports.BOARD_WIDTH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_WIDTH = exports.BOARD_WIDTH = 800;
var CELL_WIDTH = exports.CELL_WIDTH = 20;
var SPRITE_WIDTH = exports.SPRITE_WIDTH = 14;
var CELL_PADDING = exports.CELL_PADDING = (CELL_WIDTH - SPRITE_WIDTH) / 2;

var Board = function () {
  function Board(ctx) {
    _classCallCheck(this, Board);

    // binds
    this.setup = this.setup.bind(this);
    this.forEach = this.forEach.bind(this);
    this.tick = this.tick.bind(this);
    this.render = this.render.bind(this);

    // store drawing context
    this.ctx = ctx;

    this.setup();
  }

  _createClass(Board, [{
    key: 'setup',
    value: function setup() {
      // set up a 40x40 array of Cells
      this.grid = [];
      this.width = CELL_WIDTH;
      var row = void 0;
      var col = void 0;
      for (row = 0; row < this.width; row++) {
        this.grid.push([]);
        for (col = 0; col < this.width; col++) {
          var xOffset = col * this.width;
          var yOffset = row * this.width;
          var cell = new _cell2.default(this.ctx, xOffset, yOffset);
          this.grid[row].push(cell);
        }
      }
    }
  }, {
    key: 'forEach',
    value: function forEach(callback) {
      console.log('foreach');
      var row = void 0,
          col = void 0;
      for (row = 0; row < this.width; row++) {
        for (col = 0; col < this.width; col++) {
          callback(this.grid[row][col]);
        }
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      console.log('board tick()');
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('board render()');
      // clear entire board
      this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_WIDTH);

      // tick each cell

      // render each cell
      this.forEach(function (e) {
        return e.render();
      });
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _null_occupant = __webpack_require__(3);

var _null_occupant2 = _interopRequireDefault(_null_occupant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(ctx, xoffset, yoffset) {
    _classCallCheck(this, Cell);

    // cell is always constructed empty
    this.occupant = new _null_occupant2.default(this);

    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.ctx = ctx;
  }

  _createClass(Cell, [{
    key: 'tick',
    value: function tick() {}
  }, {
    key: 'render',
    value: function render() {
      console.log('cell render()');
      this.occupant.render();
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NullOccupant = function () {
  function NullOccupant(cell) {
    _classCallCheck(this, NullOccupant);

    this.render = this.render.bind(this);

    this.cell = cell;
  }

  _createClass(NullOccupant, [{
    key: 'render',
    value: function render() {
      console.log('null occupant render()');
      this.cell.ctx.fillStyle = "#ff3333";
      this.cell.ctx.fillRect(this.cell.xoffset + _board.CELL_PADDING, this.cell.yoffset + _board.CELL_PADDING, this.cell.xoffset + _board.CELL_PADDING + _board.SPRITE_WIDTH, this.cell.yoffset + _board.CELL_PADDING + _board.SPRITE_WIDTH);
    }
  }]);

  return NullOccupant;
}();

exports.default = NullOccupant;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle-sim.js.map