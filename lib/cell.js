import NullOccupant from './occupants/null_occupant';

import {
  SPRITE_WIDTH,
  CELL_PADDING,
  CELL_WIDTH
} from './board.js';

class Cell {
  constructor(board, ctx, x, y) {
    // construct an empty cell
    this._occupant = new NullOccupant(this);

    this._board = board;
    this._ctx = ctx;

    this._x = x;
    this._y = y;
  }

  tick() {
    this._occupant.tick();
  }

  render() {
    this._ctx.fillStyle = this._occupant.color;

    this._ctx.fillRect(
      (this._x * CELL_WIDTH) + CELL_PADDING,
      (this._y * CELL_WIDTH) + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );
  }

  isEmpty() {
    return this._occupant.constructor.name === "NullOccupant";
  }

  moveOccupant(xyDelta) {
    this._board.moveOccupant(this, xyDelta);
  }

  receiveVisitor(visitor) {
    // if empty, allow the visitor to move into this cell
    if(this.isEmpty()) {
      this._occupant = visitor;
      return true;
    } else {
      return false;
    }

  }
}

export default Cell;
