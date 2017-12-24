# Acorn Hoarders: A Neuroevolution Demo

<p align="center"><img src="https://raw.githubusercontent.com/rickgorman/acorn-hoarders/master/media/acorn-hoarders-v1.gif" width="500"></p>

[Live demo](https://rickgorman.github.io/acorn-hoarders/dist/index.html)
## Background

**Neuroevolution** is a type of genetic algorithm with the goal of finding solutions for difficult problems by progressively evolving a population of **neural networks**. The algorithm cycles by spawning a generation of specimens, applying a **fitness function** to each individual in order to determine the best-performing specimens, and finally seeding the next generation with the genes of those specimens. The genes may be optionally crossed and/or mutated to simulate natural reproductive processes.

To make things visually appealing, the fitness function chosen for this simulation is one geared around teaching squirrels to gather the most acorns for winter!

(Inspired by the work of [David Eck](http://math.hws.edu/eck/jsdemo/jsGeneticAlgorithm.html).)

## Getting Started

**Quick start**: If all you want to do is see it in action, you can hit the [live demo](https://rickgorman.github.io/acorn-hoarders/dist/index.html).

**Controls**: Open the console and watch some output. There are four controls:
  * **up**: toggle rendering (slightly faster when disabled)
  * **down**: enter debugger (useful for changing run-time variables)
  * **left**: save current generation to localStorage
  * **right**: load current generation from localStorage

**To install locally**, you'll need a working install of [npm](https://www.npmjs.com/get-npm).

* `git clone https://github.com/rickgorman/acorn-hoarders.git`
* `cd acorn-hoarders`
* `npm install`
* `npm run postinstall`
* `open dist/index.html`



*Bug Note: on ocassion, you'll need to refresh the page on first load. This appears to be an issue with an external library.*

## Simulation Rules

The ranking function heavily-favors higher-scoring squirrels when breeding the next generation. Squirrels are awarded points for three actions:
* movement (0.01 points/move)
* picking up an acorn (1 point/acorn)
* dropping off an acorn in a leaf pile (100 points/acorn)

There are a few rules within the sim to make things interesting:
* Squirrels can see one square in each cardinal direction.
* Squirrels can move in any cardinal direction.
* A squirrel has a maximum cheek capacity (default: 5).
* When a squirrel bumps into an acorn pile or leaf pile, it will fill/empty its cheeks.
* When a squirrel bumps into another squirrel, there's a 25% chance that it will steal one acorn from that squirrel.

For each frame of the simulation, we call activate() on each squirrel's neural network. This produces two outputs:
* The next direction of movement.
* A 32-bit memory value

The idea behind the memory value is to allow squirrels to remember x/y coordinates of items of interest on the map.

Each generation runs for a set number of frames, defined by FRAMES_PER_GENERATION. At the end of a generation, we save the best squirrels (ELITISM_PERCENT) and breed a new population (POPULATION_SIZE).
## Interesting Behaviors

On occasion, a squirrel will evolve the ability to exploit a bug in the code that allows the squirrel to teleport around the map. This doesn't (yet) seem to be a huge boost to score, so it has been left in.

## Technologies and Architecture

This project makes use of:
* `JavaScript` for game logic
* `html5 canvas` for 2d drawing
* `webpack` for bundling

### Patterns
* Grid occupants (squirrels, acorns, grass, etc) interact with cells via a [visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern).
* A [null object pattern](https://en.wikipedia.org/wiki/Null_object_pattern) is used to handle default cell behaviors.
* Generation data is persisted via JSON serialization to/from localStorage.

## Dependencies

* [Neataptic](https://wagenaartje.github.io/neataptic), a neuroevolution libary
* [npm](https://www.npmjs.com/get-npm)

## Todo

- [ ] Nerf the bug that allows squirrels to teleport around the map
- [ ] More sensing capacity for squirrels
- [ ] More discrete memory for squirrels
- [ ] Better 2d engine for more fluid rendering
- [ ] Ability to toggle squirrel-squirrel collisions on/off
- [ ] Parallel processing via backend node workers
- [ ] Predators

## License

[WTFPL](http://www.wtfpl.net/)
