import GenerationRunner from './generation_runner';

const Neat = neataptic.Neat;
const Methods = neataptic.methods;
const Architect = neataptic.architect;

import { CELL_WIDTH } from './board';

// speed constants
const FRAME_RATE = 60;

// sim constants
export const MAX_GENERATIONS = 3;
export const POPULATION_SIZE = 5;
const MUTATION_RATE = 0.025;
const ELITISM_PERCENT = 0.1;

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
    // Neat options
    const inputNeuronCount  = 25;  // hard-coded from looking at squirrel.js
    const outputNeuronCount = 17;  // ditto

    const options = {
      mutation: Methods.mutation.ALL,
      popsize: POPULATION_SIZE,
      mutationRate: MUTATION_RATE,
      elitism: Math.min(2, Math.round(ELITISM_PERCENT * POPULATION_SIZE)),
      network: new Architect.Random(
        inputNeuronCount,                     // input layer
        Math.round(inputNeuronCount * 1.2),   // hidden layer
        outputNeuronCount                     // output layer
      )
    };

    // create Neat
    this.neat = new Neat(
      inputNeuronCount,
      outputNeuronCount,
      null,
      options
    );

    // run a generation
    let gr = new GenerationRunner(this.ctx, this.neat);
    gr.runGeneration();
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
