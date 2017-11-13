import Cell from './cell.js';
import Squirrel from './occupants/squirrel';
import AcornPile from './occupants/acorn_pile';
import GrassyPatch from './occupants/grassy_patch';

import {
  BOARD_WIDTH,
  GRID_SIZE
} from './sim.js';

export const CELL_WIDTH = 20;
export const SPRITE_WIDTH = 18;
export const CELL_PADDING = (CELL_WIDTH - SPRITE_WIDTH) / 2;

// occupant type
export const OCCUPANT_TYPE_OUT_OF_BOUNDS = 0;

class Board {
  constructor(generationRunner, squirrelBrains) {
    this.generationRunner = generationRunner;

    // store drawing context
    this.ctx = generationRunner.ctx;

    this.squirrelBrains = squirrelBrains;

    this.setupBoard();
  }

  setupBoard() {
    this.spawnEmptyCells();
    this.spawnAcornPiles(4);
    this.spawnGrassyPatches(4);
    this.spawnSquirrels();
  }

  spawnEmptyCells() {
    this.grid = [];
    let row;
    let col;
    for(row = 0; row < GRID_SIZE; row++) {
      this.grid.push([]);

      for(col = 0; col < GRID_SIZE; col++) {
        let cell = new Cell(this, this.ctx, col, row);
        this.grid[row].push(cell);
      }
    }
  }

  forEach(callback) {
    let row, col;
    for(row = 0; row < GRID_SIZE; row++) {
      for(col = 0; col < GRID_SIZE; col++) {
        callback(this.grid[row][col]);
      }
    }
  }

  tick() {
    // tick each cell
    this.forEach((e) => e.tick());
  }

  render() {
    // clear entire board
    this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_WIDTH);

    // render each cell
    this.forEach((e) => e.render());
  }

  randomEmptyLocationNearBottom() {
    let [x, y] = [0, GRID_SIZE - 1];
    while(!this.grid[y][x].isEmpty()) {
      x = Math.floor( Math.random() * GRID_SIZE );
      y = (GRID_SIZE - 5) + Math.floor( Math.random() * 5 );
    }
    return [x, y];
  }

  randomEmptyLocationNearTop() {
    let [x, y] = [0, 0];
    while(!this.grid[y][x].isEmpty()) {
      x = Math.floor( Math.random() * GRID_SIZE );
      y = Math.floor( Math.random() * 5 );
    }
    return [x, y];
  }

  _spawnOccupant(klass, xyCoords, ...rest) {
    const [x, y] = xyCoords;
    const instance = new klass(this.grid[x][y], ...rest);
    this.grid[y][x].receiveVisitor(instance);

    return instance;
  }

  spawnSquirrel(xyCoords, brain) {
    return this._spawnOccupant(Squirrel, xyCoords, brain);
  }

  spawnAcornPile(xyCoords) {
    return this._spawnOccupant(AcornPile, xyCoords);
  }

  spawnGrassyPatch(xyCoords) {
    return this._spawnOccupant(GrassyPatch, xyCoords);
  }

  spawnSquirrels() {
    for (let i = 0; i < this.squirrelBrains.length; i++) {
      this.spawnSquirrel(
        this.randomEmptyLocationNearBottom(),
        this.squirrelBrains[i]
      );
    }
  }

  spawnAcornPiles(quantity) {
    let x, y;
    for(let i = 0; i < quantity; i++) {
      let xyCoords = this.randomEmptyLocationNearTop();
      this.spawnAcornPile(xyCoords);
    }
  }

  spawnGrassyPatches(quantity) {
    for(let i=0; i<quantity; i++) {
      let xyCoords = this.randomEmptyLocationNearBottom();
      this.spawnGrassyPatch(xyCoords);
    }
  }

  isOutOfBounds(xyPos) {
    let [x, y] = xyPos;

    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE ) {
      return true;
    } else {
      return false;
    }
  }

  moveOccupant(cell, xyDelta) {
    let [x, y] = xyDelta;
    const [destX, destY] = [cell.x + x, cell.y + y];

    // check for out-of-bounds
    if (this.isOutOfBounds([destX, destY])) {
      return false;
    }

    // allow the destination cell to receive this cell's occupant
    return this.grid[destY][destX].receiveVisitor(cell.occupant);
  }

  peekAtNeighboringCell(cell, xyDelta) {
    let [x, y] = xyDelta;
    const xyPos = [cell.x + x, cell.y + y];

    return this.getOccupantType(xyPos);
  }

  getOccupantType(xyPos) {
    if (this.isOutOfBounds(xyPos)) {
      return OCCUPANT_TYPE_OUT_OF_BOUNDS;
    } else {
      let [x, y] = xyPos;
      return this.grid[y][x].occupant.getType();
    }
  }
}

export default Board;
