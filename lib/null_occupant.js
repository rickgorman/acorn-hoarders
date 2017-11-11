import {
  SPRITE_WIDTH,
  CELL_PADDING
} from './board.js';

class NullOccupant {
  constructor(cell) {
    this.render = this.render.bind(this);

    this.cell = cell;
  }

  render() {
    console.log('null occupant render()');
    this.cell.ctx.fillStyle = "#ff3333";
    this.cell.ctx.fillRect(
      this.cell.xoffset + CELL_PADDING,
      this.cell.yoffset + CELL_PADDING,
      this.cell.xoffset + CELL_PADDING + SPRITE_WIDTH,
      this.cell.yoffset + CELL_PADDING + SPRITE_WIDTH
    );
  }
}

export default NullOccupant;
