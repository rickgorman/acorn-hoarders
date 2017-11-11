
// speed constants
const FRAME_RATE = 60;

// board constants
export const BOARD_WIDTH = 800;
export const GRID_SIZE = 40;


import Board from './board.js';


class Sim {
  constructor() {
    // binds
    this.run = this.run.bind(this);
    this.tick = this.tick.bind(this);

    // set up a drawing context
    this.canvas = document.getElementById('canvas');
    this.canvas.width = BOARD_WIDTH;
    this.canvas.height = BOARD_WIDTH;
    this.ctx = this.canvas.getContext('2d');

    this.board = new Board(this.ctx);

    this.tickHandle = null;
  }

  run() {
    // just tick once for now
    this.tick();
  }

  tick() {
    this.board.tick();
    this.board.render();
    this.tickHandle = requestAnimationFrame(this.tick);
    // this.tickHandle = setTimeout(this.tick, 1000/FRAME_RATE);
  }
}

// entry
const sim = new Sim();
sim.run();
