import Occupant from './occupant.js';
import BitArray from 'bit-array';

import { OCCUPANT_TYPE_MAX } from './occupant';
import { FRAMES_PER_GENERATION } from '../generation_runner';
import { GRID_SIZE } from '../sim';

export const OCCUPANT_TYPE_SQUIRREL = 2;
const MEMORY_SIZE = 32;
const MOVE_OUTPUT_INDEX = MEMORY_SIZE;

class Squirrel extends Occupant {
  constructor(cell, brain) {
    super(cell);

    this.brain = brain;

    this.color = "#bb6666";

    this.acorns = 0;
    this.stashedAcorns = 0;

    this.memory = new BitArray(MEMORY_SIZE);
  }

  tick() {
    this.senseWorld();

    // pulse the brain
    this.outputs = this.brain.activate(this.inputs);

    this.react();

    this.updateScore();
  }

  // return an array of values normalized between 0 and 1
  senseWorld() {
    this.inputs = [];
    // collect each bit of memory, values are either:
    //   [0, 1]
    for(let i=0; i < this.memory.length; i++) {
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
  }

  react() {
    this.optionallySetMemory();
    this.move( this.getNextMove(this.inputs[MOVE_OUTPUT_INDEX]) );
  }

  optionallySetMemory() {
    for(let i = 0; i < this.memory.length; i++) {
      this._optionallySetMemoryCell(i, this.inputs[i]);
    }
  }

  _optionallySetMemoryCell(address, valueSignal) {
    // valueSignal  |  action
    // -------------+---------------
    // 0.00-0.4999   |  no memory set
    // 0.50-0.7499   |  set memory to false
    // 0.75-1.0000   |  set memory to true

    if (valueSignal > 0.75) {
      this.memory.set(address, true);
    } else if (valueSignal > 0.5) {
      this.memory.set(address, false);
    }
  }

  getNextMove(signal = Math.random()) {
    switch (Math.floor(signal * 4)) {
      case 0:
        return [0, -1];
      case 1:
        return [1, 0];
      case 2:
        return [0, 1];
      case 3:
        return [-1, 0];
      default:
        alert('odd signal: ' + signal);
        return [0, 0];
    }
  }

  updateScore() {
    this.brain.score = this.stashedAcorns;
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
