import GenerationRunner from './generation_runner';

const Neat = neataptic.Neat;
const Methods = neataptic.methods;
const Architect = neataptic.architect;

import { CELL_WIDTH } from './board';

import Board from './board.js';

// speed constants
export const FRAME_RATE = 30;

// sim constants
export const MAX_GENERATIONS = 100000;

// board constants
export const GRID_SIZE = 16;
export const BOARD_WIDTH = GRID_SIZE * CELL_WIDTH;

// neat constants
export const POPULATION_SIZE = 15;
const MUTATION_RATE = 0.25;
const ELITISM_PERCENT = 0.1;
const INPUT_NEURON_COUNT = 11; // hard-coded from squirrel.js
const OUTPUT_NEURON_COUNT = 2; // ditto

class Sim {
  constructor(canvas) {
    // set up a drawing context
    this.ctx = canvas.getContext('2d');

    this.generation = 0;

    // Neat options
    this.inputNeuronCount  = INPUT_NEURON_COUNT;
    this.outputNeuronCount = OUTPUT_NEURON_COUNT;
    this.populationSize = POPULATION_SIZE;
    this.mutationRate = MUTATION_RATE;
    this.elitism = Math.min(2, Math.round(ELITISM_PERCENT * POPULATION_SIZE));
  }

  createNeat() {
    const options = {
      mutation: [
        Methods.mutation.ADD_NODE,
        Methods.mutation.SUB_NODE,
        Methods.mutation.ADD_CONN,
        Methods.mutation.SUB_CONN,
        Methods.mutation.MOD_WEIGHT,
        Methods.mutation.MOD_BIAS,
        Methods.mutation.MOD_ACTIVATION,
        Methods.mutation.ADD_GATE,
        Methods.mutation.SUB_GATE,
        Methods.mutation.ADD_SELF_CONN,
        Methods.mutation.SUB_SELF_CONN,
        Methods.mutation.ADD_BACK_CONN,
        Methods.mutation.SUB_BACK_CONN
      ],
      popsize: this.populationSize,
      mutationRate: this.mutationRate,
      elitism: this.elitism,
    };

    // create Neat
    return new Neat(
      this.inputNeuronCount,
      this.outputNeuronCount,
      null,
      options
    );
  }

  run() {
    this.neat = this.createNeat();

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
