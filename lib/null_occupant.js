import {
  SPRITE_WIDTH,
  CELL_PADDING,
  GRID_WIDTH
} from './board.js';

class NullOccupant {
  constructor(cell) {
    this.render = this.render.bind(this);

    this.cell = cell;
  }

  render() {
    this.cell.ctx.fillStyle = "#e0e0e0";

    this.cell.ctx.fillRect(
      this.cell.xoffset + CELL_PADDING,
      this.cell.yoffset + CELL_PADDING,
      SPRITE_WIDTH,
      SPRITE_WIDTH
    );
  }
}

export default NullOccupant;
