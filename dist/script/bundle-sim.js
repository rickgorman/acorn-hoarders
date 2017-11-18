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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_MAX = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _null_occupant = __webpack_require__(4);

var _null_occupant2 = _interopRequireDefault(_null_occupant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// number of different types of occupants
var OCCUPANT_TYPE_MAX = exports.OCCUPANT_TYPE_MAX = 5;

var Occupant = function () {
  function Occupant(cell) {
    _classCallCheck(this, Occupant);

    this.color = "#cc0000";
    this.cell = cell;
    this.renderText = "";
  }

  _createClass(Occupant, [{
    key: "tick",
    value: function tick() {}
  }, {
    key: "changeCell",
    value: function changeCell(newCell) {
      // leave old cell
      this.cell.occupant = new _null_occupant2.default(this.cell);

      // enter new cell
      newCell.occupant = this;
      this.cell = newCell;
    }
  }, {
    key: "receiveVisitor",
    value: function receiveVisitor() {
      // intentionally left blank
    }
  }, {
    key: "getType",
    value: function getType() {
      alert('getType not implemented in child');
    }
  }]);

  return Occupant;
}();

exports.default = Occupant;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POPULATION_SIZE = exports.BOARD_WIDTH = exports.GRID_SIZE = exports.MAX_GENERATIONS = exports.FRAME_RATE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generation_runner = __webpack_require__(3);

var _generation_runner2 = _interopRequireDefault(_generation_runner);

var _board = __webpack_require__(2);

var _board2 = __webpack_require__(2);

var _board3 = _interopRequireDefault(_board2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neat = neataptic.Neat;
var Methods = neataptic.methods;
var Architect = neataptic.architect;

// speed constants
var FRAME_RATE = exports.FRAME_RATE = 30;

// sim constants
var MAX_GENERATIONS = exports.MAX_GENERATIONS = 100000;

// board constants
var GRID_SIZE = exports.GRID_SIZE = 20;
var BOARD_WIDTH = exports.BOARD_WIDTH = GRID_SIZE * _board.CELL_WIDTH;

// neat constants
var POPULATION_SIZE = exports.POPULATION_SIZE = 15;
var MUTATION_RATE = 0.25;
var ELITISM_PERCENT = 0.1;
var INPUT_NEURON_COUNT = 11; // hard-coded from squirrel.js
var OUTPUT_NEURON_COUNT = 2; // ditto

var Sim = function () {
  function Sim(canvas) {
    _classCallCheck(this, Sim);

    // set up a drawing context
    this.ctx = canvas.getContext('2d');

    this.generation = 0;

    // Neat options
    this.inputNeuronCount = INPUT_NEURON_COUNT;
    this.outputNeuronCount = OUTPUT_NEURON_COUNT;
    this.populationSize = POPULATION_SIZE;
    this.mutationRate = MUTATION_RATE;
    this.elitism = Math.min(2, Math.round(ELITISM_PERCENT * POPULATION_SIZE));
  }

  _createClass(Sim, [{
    key: 'createNeat',
    value: function createNeat() {
      var options = {
        mutation: [Methods.mutation.ADD_NODE, Methods.mutation.SUB_NODE, Methods.mutation.ADD_CONN, Methods.mutation.SUB_CONN, Methods.mutation.MOD_WEIGHT, Methods.mutation.MOD_BIAS, Methods.mutation.MOD_ACTIVATION, Methods.mutation.ADD_GATE, Methods.mutation.SUB_GATE, Methods.mutation.ADD_SELF_CONN, Methods.mutation.SUB_SELF_CONN, Methods.mutation.ADD_BACK_CONN, Methods.mutation.SUB_BACK_CONN],
        popsize: this.populationSize,
        mutationRate: this.mutationRate,
        elitism: this.elitism
      };

      // create Neat
      return new Neat(this.inputNeuronCount, this.outputNeuronCount, null, options);
    }
  }, {
    key: 'run',
    value: function run() {
      this.neat = this.createNeat();

      // run many generations
      var gr = new _generation_runner2.default(this.ctx, this.neat);
      gr.runGeneration();
    }
  }]);

  return Sim;
}();

// entry


var canvas = document.getElementById('canvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_WIDTH;

window.sim = new Sim(canvas);
window.sim.run();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_OUT_OF_BOUNDS = exports.CELL_PADDING = exports.SPRITE_WIDTH = exports.CELL_WIDTH = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cell = __webpack_require__(6);

var _cell2 = _interopRequireDefault(_cell);

var _squirrel = __webpack_require__(5);

var _squirrel2 = _interopRequireDefault(_squirrel);

var _acorn_pile = __webpack_require__(8);

var _acorn_pile2 = _interopRequireDefault(_acorn_pile);

var _grassy_patch = __webpack_require__(9);

var _grassy_patch2 = _interopRequireDefault(_grassy_patch);

var _sim = __webpack_require__(1);

var _squirrel3 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CELL_WIDTH = exports.CELL_WIDTH = 30;
var SPRITE_WIDTH = exports.SPRITE_WIDTH = CELL_WIDTH - 2;
var CELL_PADDING = exports.CELL_PADDING = (CELL_WIDTH - SPRITE_WIDTH) / 2;

// occupant type
var OCCUPANT_TYPE_OUT_OF_BOUNDS = exports.OCCUPANT_TYPE_OUT_OF_BOUNDS = 0;

var Board = function () {
  function Board(generationRunner, squirrelBrains) {
    _classCallCheck(this, Board);

    this.generationRunner = generationRunner;

    // store drawing context
    this.ctx = generationRunner.ctx;

    this.squirrelBrains = squirrelBrains;

    this.setupBoard();
  }

  _createClass(Board, [{
    key: 'setupBoard',
    value: function setupBoard() {
      this.spawnEmptyCells();
      this.spawnAcornPiles(4);
      this.spawnGrassyPatches(4);
      this.spawnSquirrels();
    }
  }, {
    key: 'spawnEmptyCells',
    value: function spawnEmptyCells() {
      this.grid = [];
      var row = void 0;
      var col = void 0;
      for (row = 0; row < _sim.GRID_SIZE; row++) {
        this.grid.push([]);

        for (col = 0; col < _sim.GRID_SIZE; col++) {
          var cell = new _cell2.default(this, this.ctx, col, row);
          this.grid[row].push(cell);
        }
      }
    }
  }, {
    key: 'forEach',
    value: function forEach(callback) {
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
      // tick each cell
      this.forEach(function (e) {
        return e.tick();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // clear entire board
      this.ctx.clearRect(0, 0, _sim.BOARD_WIDTH, _sim.BOARD_WIDTH);

      // render each cell
      this.forEach(function (e) {
        return e.render();
      });
    }
  }, {
    key: 'randomEmptyLocationNearBottom',
    value: function randomEmptyLocationNearBottom() {
      var x = 0,
          y = _sim.GRID_SIZE - 1;

      while (!this.grid[y][x].isEmpty()) {
        x = Math.floor(Math.random() * _sim.GRID_SIZE);
        y = _sim.GRID_SIZE - 5 + Math.floor(Math.random() * 5);
      }
      return [x, y];
    }
  }, {
    key: 'randomEmptyLocationNearTop',
    value: function randomEmptyLocationNearTop() {
      var x = 0,
          y = 0;

      while (!this.grid[y][x].isEmpty()) {
        x = Math.floor(Math.random() * _sim.GRID_SIZE);
        y = Math.floor(Math.random() * 5);
      }
      return [x, y];
    }
  }, {
    key: '_spawnOccupant',
    value: function _spawnOccupant(klass, xyCoords) {
      var _xyCoords = _slicedToArray(xyCoords, 2),
          x = _xyCoords[0],
          y = _xyCoords[1];

      for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var instance = new (Function.prototype.bind.apply(klass, [null].concat([this.grid[x][y]], rest)))();
      this.grid[y][x].receiveVisitor(instance);

      return instance;
    }
  }, {
    key: 'spawnSquirrel',
    value: function spawnSquirrel(xyCoords, brain) {
      return this._spawnOccupant(_squirrel2.default, xyCoords, brain);
    }
  }, {
    key: 'spawnAcornPile',
    value: function spawnAcornPile(xyCoords) {
      return this._spawnOccupant(_acorn_pile2.default, xyCoords);
    }
  }, {
    key: 'spawnGrassyPatch',
    value: function spawnGrassyPatch(xyCoords) {
      return this._spawnOccupant(_grassy_patch2.default, xyCoords);
    }
  }, {
    key: 'spawnSquirrels',
    value: function spawnSquirrels() {
      for (var i = 0; i < this.squirrelBrains.length; i++) {
        this.spawnSquirrel(this.randomEmptyLocationNearBottom(), this.squirrelBrains[i]);
      }
    }
  }, {
    key: 'spawnAcornPiles',
    value: function spawnAcornPiles(quantity) {
      var x = void 0,
          y = void 0;
      for (var i = 0; i < quantity; i++) {
        var xyCoords = this.randomEmptyLocationNearTop();
        this.spawnAcornPile(xyCoords);
      }
    }
  }, {
    key: 'spawnGrassyPatches',
    value: function spawnGrassyPatches(quantity) {
      for (var i = 0; i < quantity / 2; i++) {
        var xyCoords = this.randomEmptyLocationNearTop();
        this.spawnGrassyPatch(xyCoords);
        xyCoords = this.randomEmptyLocationNearBottom();
        this.spawnGrassyPatch(xyCoords);
      }
    }
  }, {
    key: 'isOutOfBounds',
    value: function isOutOfBounds(xyPos) {
      var _xyPos = _slicedToArray(xyPos, 2),
          x = _xyPos[0],
          y = _xyPos[1];

      if (x < 0 || y < 0 || x >= _sim.GRID_SIZE || y >= _sim.GRID_SIZE) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'moveOccupant',
    value: function moveOccupant(cell, xyDelta) {
      var _xyDelta = _slicedToArray(xyDelta, 2),
          x = _xyDelta[0],
          y = _xyDelta[1];

      var destX = cell.x + x,
          destY = cell.y + y;

      // check for out-of-bounds

      if (this.isOutOfBounds([destX, destY])) {
        return false;
      }

      // allow the destination cell to receive this cell's occupant
      return this.grid[destY][destX].receiveVisitor(cell.occupant);
    }
  }, {
    key: 'peekAtNeighboringCell',
    value: function peekAtNeighboringCell(cell, xyDelta) {
      var _xyDelta2 = _slicedToArray(xyDelta, 2),
          x = _xyDelta2[0],
          y = _xyDelta2[1];

      var xyPos = [cell.x + x, cell.y + y];

      return this.getOccupantType(xyPos);
    }
  }, {
    key: 'getOccupantType',
    value: function getOccupantType(xyPos) {
      if (this.isOutOfBounds(xyPos)) {
        return OCCUPANT_TYPE_OUT_OF_BOUNDS;
      } else {
        var _xyPos2 = _slicedToArray(xyPos, 2),
            x = _xyPos2[0],
            y = _xyPos2[1];

        return this.grid[y][x].occupant.getType();
      }
    }
  }, {
    key: 'getSquirrels',
    value: function getSquirrels() {
      var squirrels = [];
      this.forEach(function (cell) {
        if (cell.occupant.getType() === _squirrel3.OCCUPANT_TYPE_SQUIRREL) {
          squirrels.push(cell.occupant);
        }
      });

      return squirrels;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FRAMES_PER_GENERATION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _sim = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Methods = neataptic.methods;

var FRAMES_PER_GENERATION = exports.FRAMES_PER_GENERATION = 30 * 3;

var GenerationRunner = function () {
  function GenerationRunner(ctx, neat) {
    _classCallCheck(this, GenerationRunner);

    // binds
    this.tick = this.tick.bind(this);

    this.ctx = ctx;
    this.neat = neat;

    // track generations
    this.currentGeneration = 0;

    // toggle for rendering (vs running silently/faster)
    this.showRendering = true;
    this.frameRate = _sim.FRAME_RATE;

    this.setHotKeys();
  }

  _createClass(GenerationRunner, [{
    key: 'resetGeneration',
    value: function resetGeneration() {
      this.framesElapsed = 0;
      this.tickHandle = null;
    }
  }, {
    key: 'runGeneration',
    value: function runGeneration() {
      var brains = [];
      for (var i = 0; i < this.neat.population.length; i++) {
        brains.push(this.neat.population[i]);
      }

      this.board = new _board2.default(this, brains);

      this.resetGeneration();
      this.tick();
    }
  }, {
    key: 'endGeneration',
    value: function endGeneration() {
      var newBrains = [];

      var eliteBrains = [];
      // save the best specimens
      this.neat.sort();
      for (var i = 0; i < this.neat.elitism; i++) {
        eliteBrains.push(this.neat.population[i]);
      }

      // log some output
      var sumScores = 0;
      for (var _i = 0; _i < this.neat.population.length; _i++) {
        sumScores += this.neat.population[_i].score;
      }
      var avgScore = Math.round(sumScores / this.neat.population.length);
      console.log('Gen: ' + this.currentGeneration + ' Best: ' + this.neat.population[0].score.toFixed(2) + ' Average: ' + avgScore);
      var memories = this.board.getSquirrels().map(function (squirrel) {
        return squirrel.memory;
      });
      // console.log(memories);


      // breed new specimens
      for (var _i2 = 0; _i2 < this.neat.popsize - this.neat.elitism; _i2++) {
        newBrains.push(this.neat.getOffspring());
      }

      // replace the old population with the new
      this.neat.population = newBrains;
      this.neat.mutate();

      // restore the best specimens
      var finalPopulation = newBrains.concat(eliteBrains);
      this.neat.population = finalPopulation;

      // zero out scores
      for (var _i3 = 0; _i3 < this.neat.popsize; _i3++) {
        this.neat.population[_i3].score = 0;
      }

      // run until we hit MAX_GENERATIONS
      this.currentGeneration += 1;
      if (this.currentGeneration < _sim.MAX_GENERATIONS) {
        this.runGeneration();
      } else {
        return true;
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      // advance board state
      this.board.tick();
      if (this.showRendering) {
        this.board.render();
      }

      // end after set number of frames
      this.framesElapsed += 1;
      if (this.framesElapsed >= FRAMES_PER_GENERATION) {
        this.endGeneration();
      } else {
        if (this.showRendering) {
          // this.tickHandle = requestAnimationFrame(this.tick);
          this.tickHandle = setTimeout(this.tick, 1000 / this.frameRate);
        } else {
          this.tickHandle = setTimeout(this.tick, 0);
        }
      }
    }
  }, {
    key: 'setHotKeys',
    value: function setHotKeys() {
      document.addEventListener('keydown', function (event) {
        var keyName = event.key;
        switch (keyName) {
          // toggle rendering
          case "ArrowUp":
            event.preventDefault();
            this.toggleRendering();
            break;

          // save state
          case "ArrowLeft":
            event.preventDefault();
            this.exportState();
            break;

          // load state
          case "ArrowRight":
            event.preventDefault();
            this.importState();
            break;

          // open debugger
          case "ArrowDown":
            event.preventDefault();
            debugger;
          default:

        }
      }.bind(this));
    }
  }, {
    key: 'toggleRendering',
    value: function toggleRendering() {
      if (this.showRendering) {
        this.showRendering = false;
        console.log('rendering disabled');
      } else {
        this.showRendering = true;
        console.log('rendering enabled');
      }
    }
  }, {
    key: 'exportState',
    value: function exportState() {
      var exportedBrains = this.neat.population.map(function (brain) {
        return brain.toJSON();
      });
      window.localStorage.setItem('brains', JSON.stringify(exportedBrains));

      window.localStorage.setItem('generation', this.currentGeneration);
      console.log('current genomes stored');
    }
  }, {
    key: 'importState',
    value: function importState() {
      var importedBrainsJSON = JSON.parse(window.localStorage.getItem('brains'));
      var importedBrains = importedBrainsJSON.map(function (brainJSON) {
        return neataptic.Network.fromJSON(brainJSON);
      });

      var importedGeneration = parseInt(window.localStorage.getItem('generation'));

      if (importedBrains !== null && importedGeneration !== null) {
        if (this.showRendering) {
          cancelAnimationFrame(this.handle);
        } else {
          clearTimeout(this.handle);
        }
        this.neat.population = importedBrains;
        this.currentGeneration = importedGeneration;
        console.log('prior genomes loaded and running');
        console.log(this.neat.population[0].nodes[0]);

        this.resetGeneration();
        this.runGeneration();
      } else {
        console.log('unable to restore state: item is null');
      }
    }
  }]);

  return GenerationRunner;
}();

exports.default = GenerationRunner;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_NULL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _occupant = __webpack_require__(0);

var _occupant2 = _interopRequireDefault(_occupant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OCCUPANT_TYPE_NULL = exports.OCCUPANT_TYPE_NULL = 1;

var NullOccupant = function (_Occupant) {
  _inherits(NullOccupant, _Occupant);

  function NullOccupant(cell) {
    _classCallCheck(this, NullOccupant);

    var _this = _possibleConstructorReturn(this, (NullOccupant.__proto__ || Object.getPrototypeOf(NullOccupant)).call(this, cell));

    _this.color = "#aaccaa";
    return _this;
  }

  _createClass(NullOccupant, [{
    key: "tick",
    value: function tick() {
      // intentionally left blank
    }
  }, {
    key: "receiveVisitor",
    value: function receiveVisitor(visitor) {
      visitor.changeCell(this.cell);
    }
  }, {
    key: "getType",
    value: function getType() {
      return OCCUPANT_TYPE_NULL;
    }
  }]);

  return NullOccupant;
}(_occupant2.default);

exports.default = NullOccupant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_SQUIRREL = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _occupant = __webpack_require__(0);

var _occupant2 = _interopRequireDefault(_occupant);

var _bitArray = __webpack_require__(7);

var _bitArray2 = _interopRequireDefault(_bitArray);

var _occupant3 = __webpack_require__(0);

var _generation_runner = __webpack_require__(3);

var _sim = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OCCUPANT_TYPE_SQUIRREL = exports.OCCUPANT_TYPE_SQUIRREL = 2;
var SET_MEMORY_OUTPUT_INDEX = 0;
var MOVE_OUTPUT_INDEX = 1;

var MAX_MEMORY_VALUE = 256 * 256;

var Squirrel = function (_Occupant) {
  _inherits(Squirrel, _Occupant);

  function Squirrel(cell, brain) {
    _classCallCheck(this, Squirrel);

    var _this = _possibleConstructorReturn(this, (Squirrel.__proto__ || Object.getPrototypeOf(Squirrel)).call(this, cell));

    _this.brain = brain;

    _this.color = "#bb6666";

    _this.distanceTraveled = 0;
    _this.acorns = 0;
    _this.stashedAcorns = 0;
    _this.cheekCapacity = 5;

    _this.memory = Math.floor(Math.random() * MAX_MEMORY_VALUE);
    return _this;
  }

  _createClass(Squirrel, [{
    key: 'tick',
    value: function tick() {
      this.senseWorld();

      // pulse the brain
      this.react();

      this.updateScore();
      this.updateColor();

      if (this.brain.score < 1) {
        this.renderText = this.brain.score;
      } else {
        this.renderText = Math.floor(this.brain.score);
      }
    }

    // return an array of values normalized between 0 and 1

  }, {
    key: 'senseWorld',
    value: function senseWorld() {
      this.inputs = [];
      // collect memory, value is between:
      //   [0, MAX_MEMORY_VALUE]
      this.inputs.push(this.memory / MAX_MEMORY_VALUE);

      // collect vision from one cell N/E/S/W of squirrel, range
      //   [0, OCCUPANT_TYPE_MAX]
      this.inputs.push(this.cell.peekAtNeighboringCell([-1, 0]) / _occupant3.OCCUPANT_TYPE_MAX);
      this.inputs.push(this.cell.peekAtNeighboringCell([0, 1]) / _occupant3.OCCUPANT_TYPE_MAX);
      this.inputs.push(this.cell.peekAtNeighboringCell([1, 0]) / _occupant3.OCCUPANT_TYPE_MAX);
      this.inputs.push(this.cell.peekAtNeighboringCell([0, -1]) / _occupant3.OCCUPANT_TYPE_MAX);

      // collect percent of acorn capacity, range:
      //   [0, 1]
      this.inputs.push(this.acorns / this.cheekCapacity);

      // collect acorns held, range:
      //   [0, FRAMES_PER_GENERATION]
      this.inputs.push(this.acorns / _generation_runner.FRAMES_PER_GENERATION);

      // collect acorns stashed, range:
      //   [0, FRAMES_PER_GENERATION]
      this.inputs.push(this.stashedAcorns / _generation_runner.FRAMES_PER_GENERATION);

      // collect x/y position, range:
      //   [0, GRID_SIZE]
      this.inputs.push(this.cell.x / _sim.GRID_SIZE);
      this.inputs.push(this.cell.y / _sim.GRID_SIZE);

      // collect current frame, range:
      //   [0, FRAMES_PER_GENERATION]
      // TODO: Why is this starting at 50??
      this.inputs.push(this.cell.board.generationRunner.framesElapsed / _generation_runner.FRAMES_PER_GENERATION);
    }
  }, {
    key: 'react',
    value: function react() {
      var outputs = this.brain.activate(this.inputs);
      this.optionallySetMemory(outputs[SET_MEMORY_OUTPUT_INDEX]);
      this.move(this.getNextMove(outputs[MOVE_OUTPUT_INDEX]));
    }
  }, {
    key: 'optionallySetMemory',
    value: function optionallySetMemory(signal) {
      if (signal < 0) {
        // no-op
      } else if (isNaN(signal)) {
        // no-op
      } else if (signal > Number.MAX_SAFE_INTEGER) {
        this.memory = Number.MAX_SAFE_INTEGER;
      } else {
        this.memory = signal;
      }
    }
  }, {
    key: 'getNextMove',
    value: function getNextMove(signal) {
      if (signal <= 0.25) {
        return [0, -1];
      } else if (signal < 0.50) {
        return [1, 0];
      } else if (signal >= 0.50 && signal <= 0.75) {
        return [0, 1];
      } else {
        return [-1, 0];
      }
    }
  }, {
    key: 'updateScore',
    value: function updateScore() {
      this.brain.score = this.stashedAcorns * 100 + Number(this.acorns) * 1 + this.distanceTraveled * 0.01;
    }
  }, {
    key: 'updateColor',
    value: function updateColor() {
      // update the color
      switch (this.acorns) {
        case 0:
          this.color = "#f5a98e";
          break;
        case 1:
          this.color = "#ee7757";
          break;
        case 2:
          this.color = "#eb593d";
          break;
        case 3:
          this.color = "#e73a27";
          break;
        case 4:
          this.color = "#e5231e";
          break;
        case 5:
          this.color = "#ff0000";
          break;

        default:
      }
    }
  }, {
    key: 'move',
    value: function move(xyDelta) {
      this.cell.moveOccupant(xyDelta);
    }
  }, {
    key: 'changeCell',
    value: function changeCell(newCell) {
      this.distanceTraveled += 1;
      return _get(Squirrel.prototype.__proto__ || Object.getPrototypeOf(Squirrel.prototype), 'changeCell', this).call(this, newCell);
    }
  }, {
    key: 'receiveAcorn',
    value: function receiveAcorn() {
      if (this.acorns < this.cheekCapacity) {
        this.acorns += 1;
      }
    }
  }, {
    key: 'stashAcorns',
    value: function stashAcorns() {
      this.stashedAcorns += this.acorns;
      this.acorns = 0;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return OCCUPANT_TYPE_SQUIRREL;
    }
  }, {
    key: 'receiveVisitor',
    value: function receiveVisitor(visitor) {
      if (Math.floor(Math.random() * 2) === 0) {
        if (this.acorns >= 1) {
          this.acorns -= 1;
          visitor.receiveAcorn();
        }
      }
    }
  }]);

  return Squirrel;
}(_occupant2.default);

exports.default = Squirrel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _null_occupant = __webpack_require__(4);

var _null_occupant2 = _interopRequireDefault(_null_occupant);

var _board = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
  function Cell(board, ctx, x, y) {
    _classCallCheck(this, Cell);

    // construct an empty cell
    this.occupant = new _null_occupant2.default(this);

    this.board = board;
    this._ctx = ctx;

    this.x = x;
    this.y = y;
  }

  _createClass(Cell, [{
    key: 'tick',
    value: function tick() {
      this.occupant.tick();
    }
  }, {
    key: 'render',
    value: function render() {
      var xPos = this.x * _board.CELL_WIDTH;
      var yPos = this.y * _board.CELL_WIDTH;

      this._ctx.fillStyle = this.occupant.color;

      this._ctx.fillRect(xPos + _board.CELL_PADDING, yPos + _board.CELL_PADDING, _board.SPRITE_WIDTH, _board.SPRITE_WIDTH);

      this._ctx.fillStyle = "#000000";
      this._ctx.font = "11px bold Arial";
      this._ctx.textAlign = "center";
      this._ctx.textBaseline = "hanging";
      this._ctx.fillText(this.occupant.renderText, xPos + _board.CELL_WIDTH / 2, yPos + 3);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.occupant.constructor.name === "NullOccupant";
    }
  }, {
    key: 'moveOccupant',
    value: function moveOccupant(xyDelta) {
      return this.board.moveOccupant(this, xyDelta);
    }
  }, {
    key: 'peekAtNeighboringCell',
    value: function peekAtNeighboringCell(xyDelta) {
      return this.board.peekAtNeighboringCell(this, xyDelta);
    }
  }, {
    key: 'receiveVisitor',
    value: function receiveVisitor(visitor) {
      return this.occupant.receiveVisitor(visitor);
    }
  }]);

  return Cell;
}();

exports.default = Cell;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * JavaScript BitArray - v0.2.0
 *
 * Licensed under the revised BSD License.
 * Copyright 2010-2012 Bram Stein
 * All rights reserved.
 */

/**
 * Creates a new empty BitArray with the given length or initialises the BitArray with the given hex representation.
 */
var BitArray = function (size, hex) {
    this.length = size;
    this.buffer = new ArrayBuffer(Math.ceil(this.length / 32) * 4);
    this.wordArray = new Uint32Array(this.buffer);

    if (hex) {
        hex = hex.slice(/^0x/.exec(hex) ? 2 : 0);

        if (hex.length * 4 > this.length) {
            throw 'Hex value is too large for this bit array.'
        } else if (hex.length * 4 < this.length) {
            // pad it
            while(hex.length * 4 < this.length) {
                hex = '0' + hex;
            }
        }

        for (var i = 0; i < (hex.length / 8); i++) {
            var slice = hex.slice(i * 8, i * 8 + 8);
            this.wordArray[i] = parseInt(slice, 16);
        }
    }
};

/**
 * Returns the total number of bits in this BitArray.
 */
BitArray.prototype.size = function() {
    return this.length;
};

/**
 * Sets the bit at index to a value (boolean.)
 */
BitArray.prototype.set = function(index, value) {
    if (arguments.length !== 2) {
        throw 'Index and value are required arguments.';
    }
    if (index > this.length - 1) {
        throw 'Index too large.' + index + ' ' + this.length;
    }
    var wordOffset = Math.floor(index / 32);
    // The underlying byte buffer will be initialized to zeros.
    var bitOffset = index - wordOffset * 32;
    if (value) {
        this.wordArray[wordOffset] |= (1 << bitOffset);
    } else {
        this.wordArray[wordOffset] &= ~(1 << bitOffset);
    }
    return this;
};

/**
 * Toggles the bit at index. If the bit is on, it is turned off. Likewise, if the bit is off it is turned on.
 */
BitArray.prototype.toggle = function(index) {
    if (index > this.length - 1) {
        throw 'Index too large.';
    }
    var wordOffset = Math.floor(index / 32);
    var bitOffset = index - wordOffset * 32;
    this.wordArray[wordOffset] ^= 1 << bitOffset;
    return this;
};

/**
 * Returns the value of the bit at index (boolean.)
 */
BitArray.prototype.get = function(index) {
    if (index > this.length - 1) {
        throw 'Index too large.';
    }
    var wordOffset = Math.floor(index / 32);
    var bitOffset = index - wordOffset * 32;
    return !! (this.wordArray[wordOffset] & (1 << bitOffset));
};

/**
 * Resets the BitArray so that it is empty and can be re-used.
 */
BitArray.prototype.reset = function() {
    this.buffer = new ArrayBuffer(Math.ceil(this.length / 32) * 4);
    this.wordArray = new Uint32Array(this.buffer);
    return this;
};

/**
 * Returns a copy of this BitArray.
 */
BitArray.prototype.copy = function() {
    var cp = new BitArray(this.length);
    for (var i = 0; i < this.wordArray.length; i++) {
        cp.wordArray[i] = this.wordArray[i];
    }
    return cp;
};

/**
 * Returns true if this BitArray equals another. Two BitArrays are considered
 * equal if both have the same length and bit pattern.
 */
BitArray.prototype.equals = function(x) {
    if (this.length !== x.length) {
        return false;
    }
    for (var i = 0; i < this.wordArray.length; i++) {
        if (this.wordArray[i] !== x.wordArray[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Returns the JSON representation of this BitArray.
 */
BitArray.prototype.toJSON = function() {
    return JSON.stringify(this.toArray());
};

/**
 * Returns a string representation of the BitArray with bits
 * in mathemetical order.
 */
BitArray.prototype.toBinaryString = function () {
	return this.toArray().map(function (value) {
		return value ? '1' : '0';
	}).reverse().join('');
};

/**
 * Returns a hexadecimal string representation of the BitArray
 * with bits in logical order.
 */
BitArray.prototype.toHexString = function () {
    var result = [];

    for (var i = 0; i < this.wordArray.length; i += 1) {
        //result.push(this.wordArray[i].toString(16));
        result.push(('00000000' + (this.wordArray[i] >>> 0).toString(16)).slice(-8));
    }
    return result.join('');
};

/**
 * Returns a string representation of the BitArray with bits
 * in logical order.
 */
BitArray.prototype.toString = function() {
    return this.toArray().map(function(value) {
        return value ? '1': '0';
    }).join('');
};

/**
 * Convert the BitArray to an Array of boolean values (slow).
 */
BitArray.prototype.toArray = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(Boolean(this.get(i)));
    }
    return result;
};

/**
 * Returns the total number of bits set to one in this BitArray.
 */
BitArray.prototype.count = function() {
    var total = 0;
    for (var i = 0; i < this.wordArray.length; i++) {
        x = this.wordArray[i];
        // count bits of each 2-bit chunk
        x = x - ((x >> 1) & 0x55555555);
        // count bits of each 4-bit chunk
        x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
        // count bits of each 8-bit chunk
        x = x + (x >> 4);
        // mask out junk
        x &= 0xF0F0F0F;
        // add all four 8-bit chunks
        total += (x * 0x01010101) >> 24;
    }
    return total;
};

/**
 * Inverts this BitArray.
 */
BitArray.prototype.not = function() {
    for (var i = 0; i < this.wordArray.length; i++) {
        this.wordArray[i] = ~(this.wordArray[i]);
    }
    return this;
};

/**
 * Bitwise OR on the values of this BitArray using BitArray x.
 */
BitArray.prototype.or = function(x) {
    if (this.length !== x.length) {
        throw 'Arguments must be of the same length.';
    }
    for (var i = 0; i < this.wordArray.length; i++) {
        this.wordArray[i] |= x.wordArray[i];
    }
    return this;
};

/**
 * Bitwise AND on the values of this BitArray using BitArray x.
 */
BitArray.prototype.and = function(x) {
    if (this.length !== x.length) {
        throw 'Arguments must be of the same length.';
    }
    for (var i = 0; i < this.wordArray.length; i++) {
        this.wordArray[i] &= x.wordArray[i];
    }
    return this;
};

/**
 * Bitwise XOR on the values of this BitArray using BitArray x.
 */
BitArray.prototype.xor = function(x) {
    if (this.length !== x.length) {
        throw 'Arguments must be of the same length.';
    }
    for (var i = 0; i < this.wordArray.length; i++) {
        this.wordArray[i] ^= x.wordArray[i];
    }
    return this;
};

module.exports = BitArray;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_ACORN_PILE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _occupant = __webpack_require__(0);

var _occupant2 = _interopRequireDefault(_occupant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OCCUPANT_TYPE_ACORN_PILE = exports.OCCUPANT_TYPE_ACORN_PILE = 3;

var AcornPile = function (_Occupant) {
  _inherits(AcornPile, _Occupant);

  function AcornPile(cell) {
    _classCallCheck(this, AcornPile);

    var _this = _possibleConstructorReturn(this, (AcornPile.__proto__ || Object.getPrototypeOf(AcornPile)).call(this, cell));

    _this.color = "#965015";
    return _this;
  }

  _createClass(AcornPile, [{
    key: "receiveVisitor",
    value: function receiveVisitor(visitor) {
      visitor.receiveAcorn();
    }
  }, {
    key: "getType",
    value: function getType() {
      return OCCUPANT_TYPE_ACORN_PILE;
    }
  }]);

  return AcornPile;
}(_occupant2.default);

exports.default = AcornPile;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OCCUPANT_TYPE_GRASSY_PATCH = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _occupant = __webpack_require__(0);

var _occupant2 = _interopRequireDefault(_occupant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OCCUPANT_TYPE_GRASSY_PATCH = exports.OCCUPANT_TYPE_GRASSY_PATCH = 4;

var GrassyPatch = function (_Occupant) {
  _inherits(GrassyPatch, _Occupant);

  function GrassyPatch(cell) {
    _classCallCheck(this, GrassyPatch);

    var _this = _possibleConstructorReturn(this, (GrassyPatch.__proto__ || Object.getPrototypeOf(GrassyPatch)).call(this, cell));

    _this.color = "#68ba39";
    return _this;
  }

  _createClass(GrassyPatch, [{
    key: "receiveVisitor",
    value: function receiveVisitor(visitor) {
      visitor.stashAcorns();
    }
  }, {
    key: "getType",
    value: function getType() {
      return OCCUPANT_TYPE_GRASSY_PATCH;
    }
  }]);

  return GrassyPatch;
}(_occupant2.default);

exports.default = GrassyPatch;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle-sim.js.map