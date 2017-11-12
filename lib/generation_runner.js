import Board from './board';

const FRAMES_PER_GENERATION = 60 * 10;

class GenerationRunner {
  constructor(ctx, brains) {
    // binds
    this.tick = this.tick.bind(this);

    this.ctx = ctx;

    // track lifespan of this generation
    this.framesElapsed = 0;
    this.tickHandle = null;

    // simulation elements
    this.board = new Board(this.ctx, brains);
  }

  run() {
    this.tick();
  }

  finalizeGeneration() {
    console.log('running finalizeGeneration() frames: ' + this.framesElapsed);
  }

  tick() {
    // advance board state
    this.board.tick();
    this.board.render();

    // end after set number of frames
    this.framesElapsed += 1;
    if (this.framesElapsed >= FRAMES_PER_GENERATION) {
      this.finalizeGeneration();
    } else {
      this.tickHandle = requestAnimationFrame(this.tick);
    }
  }

}

export default GenerationRunner;
