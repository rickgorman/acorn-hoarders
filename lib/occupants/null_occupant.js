import Occupant from './occupant.js';

class NullOccupant extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#e0e0e0";
  }

  tick() {
    // intentionally left blank
  }
}

export default NullOccupant;
