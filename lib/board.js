import Cell from './cell.js';

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
    this.setup = this.setup.bind(this);
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

      let yOffset = row * CELL_WIDTH;

      for(col = 0; col < GRID_SIZE; col++) {
        let xOffset = col * CELL_WIDTH;
        let cell = new Cell(this.ctx, xOffset, yOffset);
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

    // render each cell
    this.forEach((e) => e.render());

  }
}

export default Board;
