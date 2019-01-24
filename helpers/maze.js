'use strict'
const generator = require('gfycat-style-urls');
const Constants = require('./constants');

module.exports = {
    generateName: function () {
        return generator.generateCombination(4, '-').toLowerCase();
    },
    generateMaze: function () {
        // from https://codepen.io/Nilali/pen/VBZZYX?page=2
        var w = Constants.MAZE_WIDTH;
        var h = Constants.MAZE_WIDTH;

        const PATH = Constants.PATH_SPACE;
        const WALL = Constants.WALL_SPACE;
        const GOAL = Constants.GOAL_SPACE;
        const PLAYER = Constants.PLAYER_SPACE;

        var m = [], tmp = [];
        var x, y, cx, cy, d, i, ox, oy, s;
        for (y = 0; y < h; y++) {
            tmp = [];
            for (x = 0; x < w; x++) {
                tmp[x] = WALL;
            }
            m.push(tmp);
        }

        cx = Math.floor(Math.random() * (w - 1));
        cy = Math.floor(Math.random() * (h - 1));
        if (cx % 2 === 0) cx++;
        if (cy % 2 === 0) cy++;
        m[cy][cx] = PATH;

        d = 0;
        while (d === 0) {
            for (i = 0; i < 100; i++) {
                ox = cx;
                oy = cy;
                s = Math.floor(Math.random() * 4);
                if (s === 0) cx += (cx + 2 < w) ? 2 : 0;
                if (s === 1) cy += (cy + 2 < h) ? 2 : 0;
                if (s === 2) cx -= (cx - 2 > 0) ? 2 : 0;
                if (s === 3) cy -= (cy - 2 > 0) ? 2 : 0;
                if (m[cy][cx] === WALL) {
                    m[cy][cx] = PATH;
                    m[Math.floor((cy + oy) / 2)][Math.floor((cx + ox) / 2)] = PATH;
                }
            }
            d = 1;
            for (x = 1; x < w - 1; x += 2) {
                for (y = 1; y < h - 1; y += 2) {
                    if (m[y][x] === WALL) d = 0;
                }
            }
        }

        // Assign player to first position
        let assigned = false
        for (x = 1; x < w - 1; x += 1) {
            for (y = 1; y < h - 1; y += 1) {
                if (m[y][x] === PATH) {
                    m[y][x] = PLAYER;
                    assigned = true;
                    break
                }
            }
            if (assigned) {
                break;
            }
        }

        // Assign goal to last position
        assigned = false
        for (x = w - 1; x > 1; x -= 1) {
            for (y = h - 1; y > 1; y -= 1) {
                if (m[y][x] === PATH) {
                    m[y][x] = GOAL;
                    assigned = true;
                    break
                }
            }
            if (assigned) {
                break;
            }
        }
        return m;
    }
}