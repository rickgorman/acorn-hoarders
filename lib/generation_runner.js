import Board from './board';

import {
  MAX_GENERATIONS,
  POPULATION_SIZE,
  FRAME_RATE
} from './sim.js';

export const FRAMES_PER_GENERATION = 30 * 3;

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
    this.frameRate = FRAME_RATE;

    document.addEventListener('keydown', function (event) {
      const keyName = event.key;
      switch (keyName) {
        // toggle rendering
        case "ArrowUp":
          event.preventDefault();
          if(this.showRendering) {
            this.showRendering = false;
            console.log('rendering disabled');
          } else {
            this.showRendering = true;
            console.log('rendering enabled');
          }
          break;
        // save state
        case "ArrowLeft":
          event.preventDefault();
          window.localStorage.setItem('neat', JSON.stringify(this.neat));
          window.localStorage.setItem('generation', this.currentGeneration);
          console.log('current genomes stored');
          console.log(this.neat.population[0].nodes[0]);
          break;
        // load state
        case "ArrowRight":
          event.preventDefault();
          let restoredNeat = JSON.parse(window.localStorage.getItem('neat'));
          let restoredGeneration = parseInt(window.localStorage.getItem('generation'));
          if (restoredNeat !== null && restoredGeneration !== null) {

            if(this.showRendering) {
              cancelAnimationFrame(this.handle);
            } else {
              clearTimeout(this.handle);
            }
            this.neat = neat;
            this.currentGeneration = restoredGeneration;
            console.log('prior genomes loaded and running');
            console.log(this.neat.population[0].nodes[0]);

            this.resetGeneration();
            this.runGeneration();
          }
          break;
        // open debugger
        case "ArrowDown":
          event.preventDefault();
          debugger
        default:

      }
    }.bind(this));
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

    let newBrains = [];

    let eliteBrains = [];
    // save the best specimens
    this.neat.sort();
    for(let i = 0; i < this.neat.elitism; i++) {
      eliteBrains.push(this.neat.population[i]);
    }

    // log some output
    let sumScores = 0;
    for(let i = 0; i < this.neat.population.length; i++) {
      sumScores += this.neat.population[i].score;
    }
    let avgScore = Math.round(sumScores / this.neat.population.length);
    console.log(`Gen: ${this.currentGeneration} Best: ${this.neat.population[0].score} Average: ${avgScore}`);

    // breed new specimens
    for(let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
      newBrains.push(this.neat.getOffspring());
    }

    // replace the old population with the new
    this.neat.population = newBrains;
    this.neat.mutate();

    // restore the best specimens
    let finalPopulation = newBrains.concat(eliteBrains);
    this.neat.population = finalPopulation;

    // zero out scores
    for(let i = 0; i < this.neat.popsize; i++) {
      this.neat.population[i].score = 0;
    }

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
        // this.tickHandle = requestAnimationFrame(this.tick);
        this.tickHandle = setTimeout(this.tick, this.frameRate);
      } else {
        this.tickHandle = setTimeout(this.tick, 0);
      }
    }
  }

}

export default GenerationRunner;
