import Cell from './cell.js';

export const BOARD_WIDTH = 800;
export const CELL_WIDTH = 20;
export const SPRITE_WIDTH = 14;
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
    // set up a 40x40 array of Cells
    this.grid = [];
    this.width = CELL_WIDTH;
    let row;
    let col;
    for(row = 0; row < this.width; row++) {
      this.grid.push([]);
      for(col = 0; col < this.width; col++) {
        let xOffset = col * this.width;
        let yOffset = row * this.width;
        let cell = new Cell(this.ctx, xOffset, yOffset );
        this.grid[row].push( cell );
      }
    }
  }

  forEach(callback) {
    console.log('foreach');
    let row, col;
    for(row = 0; row < this.width; row++) {
      for(col = 0; col < this.width; col++) {
        callback(this.grid[row][col]);
      }
    }
  }

  tick() {
    console.log('board tick()');
  }

  render() {
    console.log('board render()');
    // clear entire board
    this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_WIDTH);

    // tick each cell

    // render each cell
    this.forEach((e) => e.render());

  }
}

export default Board;
