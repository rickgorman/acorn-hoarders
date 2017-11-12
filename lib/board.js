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

class Board {
  constructor(ctx) {
    // binds
    this.forEach = this.forEach.bind(this);
    this.tick = this.tick.bind(this);
    this.render = this.render.bind(this);

    // store drawing context
    this.ctx = ctx;

    this.setup();
  }

  setup() {
    // set up an array of Cells
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
  }

  render() {
    // clear entire board
    this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_WIDTH);

    // tick each cell
    this.forEach((e) => e.tick());

    // render each cell
    this.forEach((e) => e.render());
  }

  _spawnOccupant(klass, xyCoords) {
    const [x, y] = xyCoords;
    const instance = new klass(this.grid[x][y]);
    this.grid[y][x].receiveVisitor(instance);

    return instance;
  }

  spawnSquirrel(xyCoords) {
    return this._spawnOccupant(Squirrel, xyCoords);
  }

  spawnAcornPile(xyCoords) {
    return this._spawnOccupant(AcornPile, xyCoords);
  }

  spawnGrassyPatch(xyCoords) {
    return this._spawnOccupant(GrassyPatch, xyCoords);
  }

  spawnAcornPiles(quantity) {
    let x, y;
    for(let i=0; i<quantity; i++) {
      x = 2 + parseInt( Math.random() * (GRID_SIZE-4) );
      y = 2 + parseInt( Math.random() * 5 );
      this.spawnAcornPile([x, y]);
    }
  }

  spawnGrassyPatches(quantity) {
    let x, y;
    for(let i=0; i<quantity; i++) {
      x = 2 + parseInt( Math.random() * (GRID_SIZE-4) );
      y = GRID_SIZE - 2 - parseInt( Math.random() * 5 );
      this.spawnGrassyPatch([x, y]);
    }
  }


  moveOccupant(cell, xyDelta) {
    const [x, y] = xyDelta;
    const [destX, destY] = [cell.x + x, cell.y + y];

    // check for out-of-bounds
    if (destX < 0 || destY < 0 || destX >= GRID_SIZE || destY >= GRID_SIZE ) {
      console.log('out of bounds!');
      return false;
    }

    // allow the destination cell to receive this cell's occupant
    return this.grid[destY][destX].receiveVisitor(cell.occupant);
  }
}

export default Board;
