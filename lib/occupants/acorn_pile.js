import Occupant from './occupant';

export const OCCUPANT_TYPE_ACORN_PILE = 3;

class AcornPile extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#965015";
  }

  receiveVisitor(visitor) {
    visitor.receiveAcorn();
  }

  getType() {
    return OCCUPANT_TYPE_ACORN_PILE;
  }
}

export default AcornPile;
