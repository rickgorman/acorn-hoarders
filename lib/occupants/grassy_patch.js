import Occupant from './occupant.js';

class GrassyPatch extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#68ba39";
  }

  receiveVisitor(visitor) {
    visitor.stashAcorns();
  }

}

export default GrassyPatch;
