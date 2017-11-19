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
    this._ctx.font = "11px bold Arial";
    this._ctx.textAlign = "center";
    this._ctx.textBaseline = "hanging";
    this._ctx.fillText(
      this.occupant.renderText,
      xPos + CELL_WIDTH / 2,
      yPos + (CELL_WIDTH*0.8 / 2)
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
