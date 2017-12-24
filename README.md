# Acorn Hoarders: A Neuroevolution Demo

<p align="center"><img src="https://raw.githubusercontent.com/rickgorman/acorn-hoarders/master/media/acorn-hoarders-v1.gif" width="500"></p>

## Background

**Neuroevolution** is a type of genetic algorithm with the goal of finding solutions for difficult problems by progressively evolving a population of **neural networks**. The algorithm cycles by spawning a generation of specimens, applying a **fitness function** to each individual in order to determine the best-performing specimens, and finally seeding the next generation with the genes of those specimens. The genes may be optionally crossed and/or mutated to simulate natural reproductive processes.

To make things visually appealing, the fitness function chosen for this simulation is one geared around teaching squirrels to gather the most acorns for winter!

(Inspired by the work of [David Eck](http://math.hws.edu/eck/jsdemo/jsGeneticAlgorithm.html).)

## Architecture and Technologies

This project is implemented with the following technologies:
* `JavaScript` for game logic
* `html5 canvas` for 2d drawing
* `webpack`

## Dependencies

* [Neataptic](https://wagenaartje.github.io/neataptic), a neuroevolution libary


## Todo

- [ ] More sensing capacity for squirrels
- [ ] More memory capacity for squirrels
- [ ] Better 2d engine for more fluid rendering
- [ ] Parallel processing via backend node workers
- [ ] Predators

## License

Do whatever.
