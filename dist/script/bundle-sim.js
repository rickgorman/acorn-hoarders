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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_SIZE = exports.BOARD_WIDTH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_WIDTH = exports.BOARD_WIDTH = 800;
var GRID_SIZE = exports.GRID_SIZE = 40;

var Sim = function () {
  function Sim() {
    _classCallCheck(this, Sim);

    // binds
    this.run = this.run.bind(this);
    this.tick = this.tick.bind(this);

    // set up a drawing context
    this.canvas = document.getElementById('canvas');
    this.canvas.width = BOARD_WIDTH;
    this.canvas.height = BOARD_WIDTH;
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
exports.CELL_PADDING = exports.SPRITE_WIDTH = exports.CELL_WIDTH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(2);

var _cell2 = _interopRequireDefault(_cell);

var _sim = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CELL_WIDTH = exports.CELL_WIDTH = 20;
var SPRITE_WIDTH = exports.SPRITE_WIDTH = 18;
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
      // set up an array of Cells
      this.grid = [];
      var row = void 0;
      var col = void 0;
      for (row = 0; row < _sim.GRID_SIZE; row++) {
        this.grid.push([]);

        var yOffset = row * CELL_WIDTH;

        for (col = 0; col < _sim.GRID_SIZE; col++) {
          var xOffset = col * CELL_WIDTH;
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
      for (row = 0; row < _sim.GRID_SIZE; row++) {
        for (col = 0; col < _sim.GRID_SIZE; col++) {
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
      this.ctx.clearRect(0, 0, _sim.BOARD_WIDTH, _sim.BOARD_WIDTH);

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

var _board = __webpack_require__(1);

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
      // console.log('cell render() ' + this.xoffset + '/' + this.yoffset);
      this.ctx.fillStyle = this.occupant.color;

      this.ctx.fillRect(this.xoffset + _board.CELL_PADDING, this.yoffset + _board.CELL_PADDING, _board.SPRITE_WIDTH, _board.SPRITE_WIDTH);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NullOccupant = function NullOccupant(cell) {
  _classCallCheck(this, NullOccupant);

  this.color = "#e0e0e0";
};

exports.default = NullOccupant;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle-sim.js.map