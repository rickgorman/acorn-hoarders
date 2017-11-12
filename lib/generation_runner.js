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

    // toggle for rendering (vs running silently/faster)
    this.showRendering = true;
  }

  run() {
    this.tick();
  }

  finalizeGeneration() {
    // select best specimens, etc
    console.log('running finalizeGeneration() frames: ' + this.framesElapsed);
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
      this.finalizeGeneration();
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
