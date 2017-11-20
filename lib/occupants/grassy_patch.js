import Occupant from './occupant.js';

export const OCCUPANT_TYPE_GRASSY_PATCH = 4;

class GrassyPatch extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#68ba39";
    this.renderText = "🍃🍃";
  }

  receiveVisitor(visitor) {
    visitor.stashAcorns();
  }

  getType() {
    return OCCUPANT_TYPE_GRASSY_PATCH;
  }

}

export default GrassyPatch;
