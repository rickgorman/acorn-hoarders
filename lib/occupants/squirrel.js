import Occupant from './occupant.js';
import BitArray from 'bit-array';

import { OCCUPANT_TYPE_MAX } from './occupant';
import { FRAMES_PER_GENERATION } from '../generation_runner';
import { GRID_SIZE } from '../sim';

export const OCCUPANT_TYPE_SQUIRREL = 2;

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
    this.getInputs();
    // this.optionallySetMemory();
    this.move( this.getNextMove() );
  }

  // return an array of values normalized between 0 and 1
  getInputs() {
    this.inputs = [];
    // collect each bit of memory, values are either:
    //   [0, 1]
    for(let i=0; i<this.memory.length; i++) {
      if (this.memory.get(i) === false) {
        this.inputs.push(0);
      } else {
        this.inputs.push(1);
      }
    }

    // collect vision from one cell N/E/S/W of squirrel, range
    //   [0, OCCUPANT_TYPE_MAX]
    this.inputs.push( this.cell.peekAtNeighboringCell([-1, 0]) /
      OCCUPANT_TYPE_MAX );
    this.inputs.push( this.cell.peekAtNeighboringCell([0, 1]) /
      OCCUPANT_TYPE_MAX );
    this.inputs.push( this.cell.peekAtNeighboringCell([1, 0]) /
      OCCUPANT_TYPE_MAX );
    this.inputs.push( this.cell.peekAtNeighboringCell([0, -1]) /
      OCCUPANT_TYPE_MAX );

    // collect acorns held, range:
    //   [0, FRAMES_PER_GENERATION]
    this.inputs.push( this.acorns / FRAMES_PER_GENERATION );

    // collect acorns stashed, range:
    //   [0, FRAMES_PER_GENERATION]
    this.inputs.push( this.stashedAcorns / FRAMES_PER_GENERATION );

    // collect x/y position, range:
    //   [0, GRID_SIZE]
    this.inputs.push( this.cell.x / GRID_SIZE );
    this.inputs.push( this.cell.y / GRID_SIZE );

    // collect current frame, range:
    //   [0, FRAMES_PER_GENERATION]
    this.inputs.push( this.cell.board.generationRunner.framesElapsed /
      FRAMES_PER_GENERATION );

    console.log(this.inputs);
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
  }

  stashAcorns() {
    this.stashedAcorns += this.acorns;
    this.acorns = 0;
  }

  getType() {
    return OCCUPANT_TYPE_SQUIRREL;
  }
}

export default Squirrel;
