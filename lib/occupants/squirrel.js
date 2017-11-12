import Occupant from './occupant.js';
import BitArray from 'bit-array';

class Squirrel extends Occupant {
  constructor(cell, brain) {
    super(cell);

    console.log('my brain: ' + brain);

    this.color = "#bb6666";

    this.acorns = 0;
    this.stashedAcorns = 0;

    this.memory = new BitArray(32);
  }

  tick() {
    // this.senseWorld();
    // this.optionallySetMemory();
    this.move( this.getNextMove() );
  }

  getNextMove() {
    const moves = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    const index = parseInt(Math.random() * moves.length);
    return moves[index];
  }

  getPositionX() {
    return this.cell.x;
  }

  getPositionY() {
    return this.cell.y;
  }

  move(xyDelta) {
    this.cell.moveOccupant(xyDelta);
  }

  receiveAcorn() {
    this.acorns += 1;
    console.log('acorns: ' + this.acorns);
  }

  stashAcorns() {
    this.stashedAcorns += this.acorns;
    this.acorns = 0;
    console.log('stashedAcorns: ' + this.stashedAcorns);
  }
}

export default Squirrel;
