'use strict'
const express = require('express');
const router = express.Router();
const Maze = require('../models').Maze;
const Move = require('../models').Move;
const mazeHelper = require('../helpers/maze');

router.get('/', (req, res) => {
    Maze.findOrCreate({
        where: { solved: false }, include: [{
            model: Move
        }], defaults: { cells: JSON.stringify(mazeHelper.generateMaze()), name: mazeHelper.generateName() }
    })
        .spread((maze) => { res.send(maze); })
});

router.get('/all', (req, res) => {
    Maze.findAll({
        include: [{
            model: Move
        }]
    }).then(mazes => res.send(mazes));
});

router.get('/:name', (req, res) => {
    Maze.find({ where: { name: req.params.name } })
        .then(maze => res.send(maze))
});

module.exports = router;