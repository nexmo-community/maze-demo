'use strict'
const express = require('express');
const router = express.Router();
const Maze = require('../models').Maze;
const Move = require('../models').Move
const playerHelper = require('../helpers/player');
const mazeHelper = require('../helpers/maze');
const Constants = require('../helpers/constants');
const websocket = require('../config/websocket');

/**
 * Incoming SMS Route
 * 
 * This route uses the incoming keyword parameter to move the player. It then sends the full maze state
 * to the frontend via a websocket connection.
 * 
 * If the player wins, a new maze is generated and also sent to the front end.
 */
router.get('/incoming', (req, res) => {
    let keyword = req.query.keyword;
    if (isValidKeyword(keyword)) {
        Maze.findOne({
            where: { solved: false },
            defaults: { cells: JSON.stringify(mazeHelper.generateMaze()), name: mazeHelper.generateName() }
        })
            .then(
                maze => {
                    maze.getMoves({ order: [['id', 'DESC']] }).then(moves => {
                        let cells;
                        if (moves.length > 0) {
                            cells = moves[0].cells;
                        } else {
                            cells = maze.cells;
                        }
                        let newCells = playerHelper.movePlayerOnGrid(JSON.parse(cells), keyword);
                        if (cells != JSON.stringify(newCells)) {
                            if (playerHelper.isWinner(newCells)) {
                                Move.create({ cells: JSON.stringify(newCells), MazeId: maze.id, phone: req.query.msisdn, nexmoNumber: req.query.to }).then(move => {
                                    maze.solved = true;
                                    maze.save().then(
                                        Maze.create({ cells: JSON.stringify(mazeHelper.generateMaze()), name: mazeHelper.generateName(), solved: false }).then(maze => broadcast(maze.cells, maze.name
                                        ))
                                    );
                                });
                            } else {
                                Move.create({ cells: JSON.stringify(newCells), MazeId: maze.id, phone: req.query.msisdn, nexmoNumber: req.query.to }).then(move => {
                                    broadcast(move.cells, maze.name);
                                });
                            }
                        } else {
                            broadcast(moves[0].cells, maze.name);
                        }
                    });
                });
        res.send("");
    } else {
        res.send("Invalid Keyword");
    }
});

function isValidKeyword(keyword) {
    return [Constants.UP, Constants.DOWN, Constants.RIGHT, Constants.LEFT, Constants.UP_LETTER, Constants.DOWN_LETTER, Constants.RIGHT_LETTER, Constants.LEFT_LETTER].includes(keyword)
}

function broadcast(cells, name) {
    websocket.instance.clients.forEach(function (client) {
        client.send(JSON.stringify({ cells: cells, name: name }));
    });
}

module.exports = router;