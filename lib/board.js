import Cell from './cell.js';
import Squirrel from './occupants/squirrel';
import AcornPile from './occupants/acorn_pile';
import GrassyPatch from './occupants/grassy_patch';

import {
  BOARD_WIDTH,
  GRID_SIZE
} from './sim.js';

import {
  OCCUPANT_TYPE_SQUIRREL
} from './occupants/squirrel.js';

export const CELL_WIDTH = 30;
export const SPRITE_WIDTH = CELL_WIDTH - 2;
export const CELL_PADDING = (CELL_WIDTH - SPRITE_WIDTH) / 2;

// occupant type
export const OCCUPANT_TYPE_OUT_OF_BOUNDS = 0;

class Board {
  constructor(generationRunner, squirrelBrains) {
    this.generationRunner = generationRunner;

    // store drawing context
    this.ctx = generationRunner.ctx;

    this.squirrelBrains = squirrelBrains;
    this.squirrels = [];

    this.setupBoard();
  }

  setupBoard() {
    this.spawnEmptyCells();
    this.spawnAcornPiles(5);
    this.spawnGrassyPatches(20);
    this.spawnSquirrels();
  }

  spawnEmptyCells() {
    this.grid = [];
    let row;
    let col;
    for(row = 0; row < GRID_SIZE; row++) {
      this.grid.push([]);

      for(col = 0; col < GRID_SIZE; col++) {
        let cell = new Cell(this, this.ctx, col, row);
        this.grid[row].push(cell);
      }
    }
  }

  forEach(callback) {
    let row, col;
    for(row = 0; row < GRID_SIZE; row++) {
      for(col = 0; col < GRID_SIZE; col++) {
        callback(this.grid[row][col]);
      }
    }
  }

  tick() {
    // tick each cell
    this.forEach((e) => e.tick());
  }

  render() {
    // clear entire board
    this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_WIDTH);

    // render each cell
    this.forEach((e) => e.render());
  }

  _randomEmptyLocationBetween(
    topLeftPos,
    botRightPos,
    topLeftExcludePos,
    botRightExcludePos
  ) {
    let [ topLeftY, topLeftX ] = topLeftPos;
    let [ botRightY, botRightX ] = botRightPos;
    let inExclusionZone;
    let x, y;
    do {
      x = Math.floor(
        topLeftX + Math.floor( Math.random() * (botRightX - topLeftX ))
      );
      y = Math.floor(
        topLeftY + Math.floor( Math.random() * (botRightY - topLeftY ))
      );

      // if given, exclude cells within the excluded region
      inExclusionZone = false;
      if(topLeftExcludePos && botRightExcludePos) {
        if(this._isInsideBox(
          [ x, y ],
          topLeftExcludePos,
          botRightExcludePos
        )) {
          inExclusionZone = true;
        }
      }

    } while(!this.grid[y][x].isEmpty() || inExclusionZone);

    return [x, y];
  }

  _isInsideBox(xyCoords, topLeftPos, botRightPos) {
    let [ y, x ] = xyCoords;
    let [ topLeftY, topLeftX ] = topLeftPos;
    let [ botRightY, botRightX ] = botRightPos;

    if( y >= Math.floor(topLeftY) && y <= Math.floor(botRightY) &&
        x >= Math.floor(topLeftX) && x <= Math.floor(botRightX)) {
      return true;
    } else {
      return false;
    }
  }

  randomEmptyLocationNearTop() {
    return this._randomEmptyLocationBetween(
      [ 0, 0 ],
      [ 4, GRID_SIZE ]
    );
  }

  randomEmptyLocationNearBottom() {
    return this._randomEmptyLocationBetween(
      [ GRID_SIZE - 4, 0 ],
      [ GRID_SIZE, GRID_SIZE ]
    );
  }

  randomEmptyLocationNearCenter() {
    return this._randomEmptyLocationBetween(
      [ GRID_SIZE / 3, (GRID_SIZE / 3) ],
      [ (GRID_SIZE / 3) * 2, (GRID_SIZE / 3) * 2 ]
    );
  }

  randomEmptyLocationBorderingCenter() {
    return this._randomEmptyLocationBetween(
      [ 0, 0 ],
      [ GRID_SIZE, GRID_SIZE ],
      [ GRID_SIZE / 3, (GRID_SIZE / 3) ],
      [ (GRID_SIZE / 3) * 2, (GRID_SIZE / 3) * 2 ]
    );
  }

  _spawnOccupant(klass, xyCoords, ...rest) {
    const [x, y] = xyCoords;
    const occupant = new klass(this.grid[x][y], ...rest);
    this.grid[y][x].receiveVisitor(occupant);

    return occupant;
  }

  spawnSquirrel(xyCoords, brain) {
    return this._spawnOccupant(Squirrel, xyCoords, brain);
  }

  spawnAcornPile(xyCoords) {
    return this._spawnOccupant(AcornPile, xyCoords);
  }

  spawnGrassyPatch(xyCoords) {
    return this._spawnOccupant(GrassyPatch, xyCoords);
  }

  spawnSquirrels() {
    let squirrel;
    for (let i = 0; i < this.squirrelBrains.length; i++) {
      squirrel = this.spawnSquirrel(
        this.randomEmptyLocationBorderingCenter(),
        this.squirrelBrains[i]
      );
      this.squirrels.push(squirrel);
    }
  }

  spawnAcornPiles(quantity) {
    let x, y;
    for(let i = 0; i < quantity; i++) {
      let xyCoords = this.randomEmptyLocationNearCenter();
      this.spawnAcornPile(xyCoords);
    }
  }

  spawnGrassyPatches(quantity) {
    for(let i=0; i<quantity; i++) {
      let xyCoords = this.randomEmptyLocationBorderingCenter();
      this.spawnGrassyPatch(xyCoords);
    }
  }

  isOutOfBounds(xyPos) {
    let [x, y] = xyPos;

    if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE ) {
      return true;
    } else {
      return false;
    }
  }

  moveOccupant(cell, xyDelta) {
    let [x, y] = xyDelta;
    const [destX, destY] = [cell.x + x, cell.y + y];

    // check for out-of-bounds
    if (this.isOutOfBounds([destX, destY])) {
      return false;
    }

    // allow the destination cell to receive this cell's occupant
    return this.grid[destY][destX].receiveVisitor(cell.occupant);
  }

  peekAtNeighboringCell(cell, xyDelta) {
    let [x, y] = xyDelta;
    const xyPos = [cell.x + x, cell.y + y];

    return this.getOccupantType(xyPos);
  }

  getOccupantType(xyPos) {
    if (this.isOutOfBounds(xyPos)) {
      return OCCUPANT_TYPE_OUT_OF_BOUNDS;
    } else {
      let [x, y] = xyPos;
      return this.grid[y][x].occupant.getType();
    }
  }

}

export default Board;
