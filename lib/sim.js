import GenerationRunner from './generation_runner';
import PopulationOfBrains from './population_of_brains';

import { CELL_WIDTH } from './board';

// speed constants
const FRAME_RATE = 60;

// sim constants
const POPULATION_SIZE = 5;

// board constants
export const GRID_SIZE = 20;
export const BOARD_WIDTH = GRID_SIZE * CELL_WIDTH;

import Board from './board.js';

class Sim {
  constructor(canvas) {
    // set up a drawing context
    this.ctx = canvas.getContext('2d');

    this.generation = 0;
  }

  run() {
    // create initial seeds
    let brains = new PopulationOfBrains(POPULATION_SIZE);

    // run a generation
    let gr = new GenerationRunner(this.ctx, brains);
    gr.run();
  }

}

// entry
let canvas = document.getElementById('canvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_WIDTH;

window.sim = new Sim(canvas);
window.sim.run();

document.addEventListener('keydown', (e) => {
  const keyName = event.key;
  switch (keyName) {
    case "ArrowUp":
      e.preventDefault();
      window.squirrel.move([0, -1]);
      break;

    case "ArrowRight":
      e.preventDefault();
      window.squirrel.move([1, 0]);
      break;

    case "ArrowDown":
      e.preventDefault();
      window.squirrel.move([0, 1]);
      break;

    case "ArrowLeft":
      e.preventDefault();
      window.squirrel.move([-1, 0]);
      break;

    default:

  }
});
