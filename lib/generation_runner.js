import Board from './board';

import {
  MAX_GENERATIONS,
  POPULATION_SIZE
} from './sim.js';

export const FRAMES_PER_GENERATION = 60 * 4;

class GenerationRunner {
  constructor(ctx, neat) {
    // binds
    this.tick = this.tick.bind(this);

    this.ctx = ctx;
    this.neat = neat;

    // track generations
    this.currentGeneration = 0;

    // toggle for rendering (vs running silently/faster)
    this.showRendering = true;
  }

  resetGeneration() {
    this.framesElapsed = 0;
    this.tickHandle = null;
  }

  runGeneration() {
    let brains = [];
    for(let i = 0; i < this.neat.population.length; i++) {
      brains.push(this.neat.population[i]);
    }

    this.board = new Board(this, brains);

    this.resetGeneration();
    this.tick();
  }

  endGeneration() {
    console.log('running endGeneration(). frames: ' + this.framesElapsed);

    let newBrains = [];

    // save the best specimens
    this.neat.sort();
    for(let i = 0; i < this.neat.elitism; i++) {
      newBrains.push(this.neat.population[i]);
    }

    // breed new specimens
    for(let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
      newBrains.push(this.neat.getOffspring());
    }

    // replace the old population with the new
    this.neat.population = newBrains;

    // run until we hit MAX_GENERATIONS
    this.currentGeneration += 1;
    if (this.currentGeneration < MAX_GENERATIONS) {
      this.runGeneration();
    } else {
      return true;
    }
  }

  tick() {
    // advance board state
    this.board.tick();
    if (this.showRendering) {
      this.board.render();
    }

    // end after set number of frames
    this.framesElapsed += 1;
    if (this.framesElapsed >= FRAMES_PER_GENERATION) {
      this.endGeneration();
    } else {
      if (this.showRendering) {
        this.tickHandle = requestAnimationFrame(this.tick);
      } else {
        this.tickHandle = setTimeout(this.tick, 0);
      }
    }
  }

}

export default GenerationRunner;
