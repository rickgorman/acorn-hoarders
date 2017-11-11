import NullOccupant from './occupants/null_occupant';

import {
  SPRITE_WIDTH,
  CELL_PADDING,
} from './board.js';

class Cell {
  constructor(board, ctx, xoffset, yoffset) {
    // construct an empty cell
    this.occupant = new NullOccupant(this);

    this.board = board;
    this.ctx = ctx;

    this.xoffset = xoffset;
    this.yoffset = yoffset;
  }

  tick() {
    this.occupant.tick();
  }

  render() {
    this.ctx.fillStyle = this.occupant.color;

    this.ctx.fillRect(
      this.xoffset + CELL_PADDING,
      this.yoffset + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );

  }
}

export default Cell;
