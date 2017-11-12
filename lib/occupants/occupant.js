import NullOccupant from './null_occupant';

// number of different types of occupants
export const OCCUPANT_TYPE_MAX = 5;

class Occupant {
  constructor(cell) {
    this.color = "#cc0000";
    this.cell = cell;
  }

  tick() {

  }

  changeCell(newCell) {
    // leave old cell
    this.cell.occupant = new NullOccupant(this.cell);

    // enter new cell
    newCell.occupant = this;
    this.cell = newCell;
  }

  receiveVisitor() {
    // intentionally left blank
  }

  getType() {
    alert('getType not implemented in child');
  }

}

export default Occupant;
