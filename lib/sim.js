
// speed constants
const FRAME_RATE = 60;

// board constants
export const BOARD_WIDTH = 600;
export const GRID_SIZE = 30;

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
  }

}

// entry
window.sim = new Sim();
window.squirrel = window.sim.board.spawnSquirrel([0, 0]);
window.squirrel = window.sim.board.spawnSquirrel([4, 4]);
window.sim.board.spawnAcornPiles(4);
window.sim.board.spawnGrassyPatches(4);
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
