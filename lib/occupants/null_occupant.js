import Occupant from './occupant.js';

export const OCCUPANT_TYPE_NULL = 1;

class NullOccupant extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#aaccaa";
  }

  tick() {
    // intentionally left blank
  }

  receiveVisitor(visitor) {
    visitor.changeCell(this.cell);
  }

  getType() {
    return OCCUPANT_TYPE_NULL;
  }
}

export default NullOccupant;
