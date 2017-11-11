import NullOccupant from './null_occupant';

import {
  SPRITE_WIDTH,
  CELL_PADDING,
} from './board.js';

class Cell {
  constructor(ctx, xoffset, yoffset) {
    // cell is always constructed empty
    this.occupant = new NullOccupant(this);

    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.ctx = ctx;
  }

  tick() {

  }

  render() {
    // console.log('cell render() ' + this.xoffset + '/' + this.yoffset);
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
