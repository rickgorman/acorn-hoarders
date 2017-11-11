import NullOccupant from './null_occupant';

import {
  SPRITE_WIDTH,
  CELL_PADDING,
} from './board.js';

class Cell {
  constructor(ctx, xoffset, yoffset) {
    // construct an empty cell
    this.occupant = new NullOccupant(this);

    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.ctx = ctx;
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
