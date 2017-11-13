import Occupant from './occupant';

export const OCCUPANT_TYPE_ACORN_PILE = 3;

class AcornPile extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#ce7216";
  }

  receiveVisitor(visitor) {
    console.log(visitor);
    visitor.receiveAcorn();
  }

  getType() {
    return OCCUPANT_TYPE_ACORN_PILE;
  }
}

export default AcornPile;
