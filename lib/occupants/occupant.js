import NullOccupant from './null_occupant';

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

}

export default Occupant;
