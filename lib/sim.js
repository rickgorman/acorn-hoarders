import GenerationRunner from './generation_runner';

const Neat = neataptic.Neat;
const Methods = neataptic.methods;
const Architect = neataptic.architect;

import { CELL_WIDTH } from './board';

// speed constants
const FRAME_RATE = 60;

// sim constants
export const MAX_GENERATIONS = 1000;
export const POPULATION_SIZE = 15;
const MUTATION_RATE = 0.15;
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
    const inputNeuronCount  = 41;  // hard-coded from looking at squirrel.js
    const outputNeuronCount = 33;  // ditto

    const options = {
      mutation: Methods.mutation.ALL,
      popsize: POPULATION_SIZE,
//      mutationRate: MUTATION_RATE,
      elitism: Math.min(2, Math.round(ELITISM_PERCENT * POPULATION_SIZE)),
      network: new Architect.Perceptron(
        inputNeuronCount,                     // input layer
        Math.round(inputNeuronCount * 1.1),   // hidden layer
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

    // run many generations
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
