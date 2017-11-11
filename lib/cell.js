import NullOccupant from './occupants/null_occupant';

import {
  SPRITE_WIDTH,
  CELL_PADDING,
  CELL_WIDTH
} from './board.js';

class Cell {
  constructor(board, ctx, x, y) {
    // construct an empty cell
    this.occupant = new NullOccupant(this);

    this.board = board;
    this.ctx = ctx;

    this.x = x;
    this.y = y;
  }

  tick() {
    this.occupant.tick();
  }

  render() {
    this.ctx.fillStyle = this.occupant.color;

    this.ctx.fillRect(
      (this.x * CELL_WIDTH) + CELL_PADDING,
      (this.y * CELL_WIDTH) + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );
  }

  moveOccupant(direction) {

  }

  receiveOccupant(occupant) {

  }
}

export default Cell;
