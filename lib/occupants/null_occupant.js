import Occupant from './occupant.js';

class NullOccupant extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#99ee99";
  }

  tick() {
    // intentionally left blank
  }

  receiveVisitor(visitor) {
    visitor.changeCell(this.cell);
  }
}

export default NullOccupant;
