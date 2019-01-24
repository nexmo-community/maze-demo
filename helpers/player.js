'use strict'
const Constants = require('../helpers/constants');

module.exports = {
    isWinner: function (grid) {
        // If there isn't a goal we can make a _hopefully safe_ assumption that the player
        // is sitting on it and the game is won.
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] == Constants.GOAL_SPACE) {
                    return false;
                }
            }
        }

        return true;
    },
    movePlayerOnGrid: function movePlayerOnGrid(grid, direction) {
        let i = 0;
        let j = 0;

        switch (direction) {
            case Constants.UP:
            case Constants.UP_LETTER:
                i = 0;
                j = -1;
                break;
            case Constants.DOWN:
            case Constants.DOWN_LETTER:
                i = 0;
                j = 1;
                break;
            case Constants.RIGHT:
            case Constants.RIGHT_LETTER:
                i = 1;
                j = 0;
                break;
            case Constants.LEFT:
            case Constants.LEFT_LETTER:
                i = -1;
                j = 0;
                break;
        }

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] == Constants.PLAYER_SPACE && playerCanMoveToSpace(grid, x, y, i, j)) {
                    grid[y][x] = Constants.PATH_SPACE;
                    grid[y + j][x + i] = Constants.PLAYER_SPACE;
                    return grid;
                }
            }
        }

        return grid;
    }
}

function playerCanMoveToSpace(grid, x, y, i, j) {
    return (y + j >= 0
        && x + i >= 0
        && y + j < grid.length
        && x + i < grid[y].length)
        && (grid[y + j][x + i] == Constants.PATH_SPACE || grid[y + j][x + i] == Constants.GOAL_SPACE);
}