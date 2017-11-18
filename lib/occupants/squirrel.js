import Occupant from './occupant.js';
import BitArray from 'bit-array';

import { OCCUPANT_TYPE_MAX } from './occupant';
import { FRAMES_PER_GENERATION } from '../generation_runner';
import { GRID_SIZE } from '../sim';

export const OCCUPANT_TYPE_SQUIRREL = 2;
const MEMORY_SIZE = 1;
const MOVE_OUTPUT_INDEX = MEMORY_SIZE;

const MAX_MEMORY_VALUE = 256*256;

class Squirrel extends Occupant {
  constructor(cell, brain) {
    super(cell);

    this.brain = brain;

    this.color = "#bb6666";

    this.distanceTraveled = 0;
    this.acorns = 0;
    this.stashedAcorns = 0;
    this.cheekCapacity = 5;

    this.memory = Math.floor(Math.random() * MAX_MEMORY_VALUE);
  }

  tick() {
    this.senseWorld();

    // pulse the brain
    this.outputs = this.brain.activate(this.inputs);
    if(isNaN(this.outputs[0]) || isNaN(this.outputs[1])) {
      debugger
    }

    this.react();

    this.updateScore();
    this.updateColor();

  }

  // return an array of values normalized between 0 and 1
  senseWorld() {
    this.inputs = [];
    // collect memory, value is between:
    //   [0, MAX_MEMORY_VALUE]
    this.inputs.push(this.memory / MAX_MEMORY_VALUE);

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

    // collect percent of acorn capacity, range:
    //   [0, 1]
    this.inputs.push( this.acorns / this.cheekCapacity );

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
    // TODO: Why is this starting at 50??
    this.inputs.push( this.cell.board.generationRunner.framesElapsed /
      FRAMES_PER_GENERATION );
  }

  react() {
    this.optionallySetMemory();
    this.move( this.getNextMove(this.outputs[MOVE_OUTPUT_INDEX]) );
  }

  optionallySetMemory(signal) {
    if (signal < 0.1) {
      // no change
    } else {
      this.memory = Math.floor((signal - 0.1) * MAX_MEMORY_VALUE);
    }
  }

  getNextMove(signal) {
    if(signal <= 0.25) {
      return [0, -1];
    } else if(signal < 0.50) {
      return [1, 0];
    } else if(signal >= 0.50 && signal <= 0.75) {
      return [0, 1];
    } else {
      return [-1, 0];
    }
  }

  updateScore() {
    this.brain.score =
      this.stashedAcorns * 10000 +
      this.acorns * 100 +
      this.distanceTraveled;
  }

  updateColor() {
    // update the color
    switch (this.acorns) {
      case 0:
        this.color = "#f5a98e";
        break;
      case 1:
        this.color = "#ee7757";
        break;
      case 2:
        this.color = "#eb593d";
        break;
      case 3:
        this.color = "#e73a27";
        break;
      case 4:
        this.color = "#e5231e";
        break;
      case 5:
        this.color = "#333333";
        break;

      default:
    }
  }

  move(xyDelta) {
    this.cell.moveOccupant(xyDelta);
  }

  changeCell(newCell) {
    this.distanceTraveled += 1;
    return super.changeCell(newCell);
  }

  receiveAcorn() {
    if(this.acorns < this.cheekCapacity) {
      this.acorns += 1;
    }
  }

  stashAcorns() {
    this.stashedAcorns += this.acorns;
    this.acorns = 0;
  }

  getType() {
    return OCCUPANT_TYPE_SQUIRREL;
  }

  receiveVisitor(visitor) {
    if(Math.floor(Math.random() * 2) === 0) {
      if(this.acorns >= 1) {
        this.acorns -= 1;
        visitor.receiveAcorn();
      }
    }
  }
}

export default Squirrel;
