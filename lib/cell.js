import NullOccupant from './null_occupant';

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
    this.occupant.render();
  }
}

export default Cell;
