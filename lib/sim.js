import {
  BOARD_WIDTH,
} from './board.js';

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
  }

  run() {
    // just tick once for now
    this.tick();
  }

  tick() {
    this.board.tick();
    this.board.render();
  }
}

// entry
const sim = new Sim();
sim.run();
