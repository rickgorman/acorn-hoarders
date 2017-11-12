import Occupant from './occupant.js';

class Squirrel extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#bb6666";

    this.acorns = 0;
    this.stashedAcorns = 0;
  }

  tick() {

  }

  getPositionX() {
    return this.cell.x;
  }

  getPositionY() {
    return this.cell.y;
  }

  move(xyDelta) {
    this.cell.moveOccupant(xyDelta);
  }

  receiveAcorn() {
    this.acorns += 1;
    console.log('acorns: ' + this.acorns);
  }

  stashAcorns() {
    this.stashedAcorns += this.acorns;
    this.acorns = 0;
    console.log('stashedAcorns: ' + this.stashedAcorns);
  }
}

export default Squirrel;
