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

    this._board = board;
    this._ctx = ctx;

    this.x = x;
    this.y = y;
  }

  tick() {
    this.occupant.tick();
  }

  render() {
    this._ctx.fillStyle = this.occupant.color;

    this._ctx.fillRect(
      (this.x * CELL_WIDTH) + CELL_PADDING,
      (this.y * CELL_WIDTH) + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );
  }

  isEmpty() {
    return this.occupant.constructor.name === "NullOccupant";
  }

  moveOccupant(xyDelta) {
    this._board.moveOccupant(this, xyDelta);
  }

  receiveVisitor(visitor) {
    // if empty, allow the visitor to move into this cell
    if(this.isEmpty()) {
      visitor.changeCell(this);

      return true;
    } else {
      return false;
    }

  }
}

export default Cell;
