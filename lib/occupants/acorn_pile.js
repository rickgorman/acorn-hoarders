import Occupant from './occupant';

class AcornPile extends Occupant {
  constructor(cell) {
    super(cell);
    this.color = "#ce7216";
  }

  receiveVisitor(visitor) {
    visitor.receiveAcorn();
  }

}

export default AcornPile;
