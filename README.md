<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Purushottam_soni_creative_photography_%281%29.jpg/1024px-Purushottam_soni_creative_photography_%281%29.jpg">

# JS Project Proposal: Neuroevolution of Acorn Hoarding

## Background

**Neuroevolution** is a type of genetic algorithm with the goal of finding solutions for difficult problems by progressively evolving a population of **neural networks**. The algorithm cycles by spawning a generation of individuals, applying a fitness function to each individual in order to determine the best-performing specimens, and finally seeding the next generation with the genes of those specimens. The genes may be optionally crossed and/or mutated to simulate natural reproductive processes.

To make things visually appealing, the fitness function chosen for this simulation is one geared around teaching squirrels to gather the most acorns for winter!

## Functionality and MVP

The playing grid will consist of a 2d grid containing one or more trees dropping **acorns** and several **grassy spots** in which a squirrel might decide to bury its nuts.

Users will be able to control aspects of the simulation:
- [ ] Start, pause, and reset the simulation
- [ ] Select a rendering speed: normal, fast, lightning mode (disables rendering)
- [ ] Select mutation rates (0%, 0.1%, 0.25%, 0.5%, 1%, 2%, 5%, 10%, 25%)
- [ ] Select population size (1, 2, 5, 10, 25, 100)
- [ ] Select cheek capacity in # of acorns (1, 2, 3, 4, 5)
- [ ] Select how many specimens survive to the next generation

In addition, this project will include:
- [ ] A help sidebar that explains details about the simulation
- [ ] A production README

## Wireframe


## Architecture and Technologies

This project will be implemented with the following technologies:
* `Javascript` for game logic
* `React/redux` for rendering and holding simulation state between renders
* `Rails/PostgreSQL` for load/save functionality (optional)
* `html5 canvas` for 2d drawing
* `webpack` to bundle js files

In addition to the react `bundle.js` file, there will be a second `acorns-bundle.js` containing the simulation logic. The logic will be broken down into several files:
* `game.js`
  * Handles each `tick` of the simulation
  * Handles configuration options
  * Handle statistics
* `board.js`
  * Contains 2d rendering code
  * Contains board state, a 2d array of `cell` objects
  * Handles code dealing with neighboring cells
* `cell.js`
  * Has occupant(s) `[squirrel, nut, tree, grassy-patch]`
* `tree.js`
  * `giveAcorn()` gives an acorn to a squirrel
* `grassy-patch.js`
  * `accept()` takes in one or more acorns from a squirrel
  * `count()` returns count of acorns
* `nut.js`
  * `bePickedUp()` removes nut from cell and hands it to squirrel
* `squirrel.js`
  * Contains a neural net
    * Neural net contains 16 bits of memory that may be set by the squirrel at whim. Each acts as an input node into the neural net.
  * Contains sensors for observing the environment
  * Contains actions `[move, wait, grabAcorn, addMemory, ...]`

## Schema

* `states` - stores JSON copy of a game state
  * `INTEGER id`
  * `JSON data`

## Reducers
* `state` - storing current generation's state
* `ui` - storing save/load modal status
  * `loadAnnounceIsVisible`
  * `saveAnnounceIsVisible`
  * `simulationLoadSpinnerIsSpinning`
* `errors`
  * `state`
  * `ui`

## Actions

* `FETCH_STATES`
* `FETCH_STATE`
* `RECEIVE_STATE`
* `RECEIVE_STATE_ERRORS`
* `CREATE_STATE`
* `RECEIVE_UI_ERRORS`

## Routes

#### API Endpoints
* `GET /api/states` - list all saved states
* `GET /api/states/:id` - get one state
* `POST /api/states` - save a state

#### Frontend Routes
* `/` - show simulation

## React Component Hierarchy

* `Main`
  * `Simulation` - Contains the canvas
  * `Controls` - Contains the simulation controls
  * `SaveAnnounce` - Confirms to the user that clicking the `save` button had an effect
  * `LoadAnnounce` - Confirms to the user that selecting a `load state` had an effect
  * `Statistics` - Shows interesting facts about the current/past generations

## Dependencies

* [Neataptic](https://wagenaartje.github.io/neataptic) or [Genetic.js](https://github.com/subprotocol/genetic-js/) as a neuroevolution helper, choice dependent on speed


## Implementation Timeline

**Day 1**: Setup and 2d game engine logic. Goals:
* Configure and test all necessary node modules.
* Get webpack working
* Write React entry file with `Simulation` component
* Add HTML and basic CSS
* Implement `game.js`, `board.js` and `cell.js` to the point where a 2d array of cells can be painted onto the html canvas.

**Day 2**: Sensing, Actions and neural nets. Goals:
* Get the `Game` object to handle a `tick()`
* Implement `squirrel.js`, `acorn.js` and `grassy-patch.js` to the point where an acorn can be placed on a cell and a squirrel can pick it up, move to a grassy-patch, and drop the acorn off.
* Implement `Squirrel` memory (16 bits or so).
* Implement `Squirrel` vision (one square beyond its location).
* Learn enough of the neural net helper library to create a neural net for a squirrel and watch it run.

**Day 3**: Evolution. Goals:
* Learn enough of the neural net helper library to get neuralevolution working.
* Success metric: ability to spawn a new generation based on the last.

**Day 4**: Add controls and polished styling. Goals:
* Add controls for start/pause/reset, rendering speed, mutation rate, population size, cheek capacity, elitism (# of individuals surviving to next generation), and cheek capacity.
* Add a running tally of useful statistics
* If time: add save/load functionality.

## Bonus Features

There are many directions in which this simulation might go. Some anticipated updates are:
- [ ] Ability to Save/Load states
- [ ] More sensing capacity for squirrels
- [ ] More memory capacity for squirrels
- [ ] Better 2d engine for more fluid rendering
- [ ] Parallel processing via backend node workers
- [ ] Predators
- [ ] Squirrel fights!
