import Occupant from './occupant';

class AcornPile extends Occupant {
  constructor(cell) {
    super(cell);
  }

  receiveVisitor(visitor) {
    visitor.receiveAcorn();
  }

}

export default AcornPile;
