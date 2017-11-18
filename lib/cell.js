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
    this._ctx = ctx;

    this.x = x;
    this.y = y;
  }

  tick() {
    this.occupant.tick();
  }

  render() {
    let xPos = this.x * CELL_WIDTH;
    let yPos = this.y * CELL_WIDTH;

    this._ctx.fillStyle = this.occupant.color;

    this._ctx.fillRect(
      (xPos) + CELL_PADDING,
      (yPos) + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );

    this._ctx.fillStyle = "#000000";
    this._ctx.font = "12px bold Arial";
    this._ctx.fillText(
      this.occupant.renderText,
      xPos + 3,
      yPos + CELL_WIDTH / 2 + 3
    );
  }

  isEmpty() {
    return this.occupant.constructor.name === "NullOccupant";
  }

  moveOccupant(xyDelta) {
    return this.board.moveOccupant(this, xyDelta);
  }

  peekAtNeighboringCell(xyDelta) {
    return this.board.peekAtNeighboringCell(this, xyDelta);
  }

  receiveVisitor(visitor) {
    return this.occupant.receiveVisitor(visitor);
  }
}

export default Cell;
