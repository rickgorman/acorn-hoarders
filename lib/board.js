import Cell from './cell.js';
import Squirrel from './occupants/squirrel';

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

  spawnSquirrel() {
    // const [x, y] = [GRID_SIZE / 2, GRID_SIZE / 2];
    const [x, y] = [0, 0];
    this.grid[x][y].receiveVisitor(new Squirrel());
  }

  moveOccupant(cell, xyDelta) {
    const [x, y] = xyDelta;
    const [destX, destY] = [cell.x + x, cell.y + y];

    // check for out-of-bounds
    if (destX < 0 || destY < 0 || destX > GRID_SIZE || destY > GRID_SIZE ) {
      console.log('out of bounds!');
      return false;
    }

    // allow the destination cell to receive this cell's occupant
    return this.grid[destX][destY].receiveVisitor(cell.occupant);
  }
}

export default Board;
