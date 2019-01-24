'use strict'
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const websocket = require('./config/websocket');

const Maze = require('./models').Maze;
const mazeHelper = require('./helpers/maze');

websocket.instance = expressWs.getWss();

app.use(express.static(__dirname + '/public'))

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

app.ws('/ws', function (ws, req) {
  Maze.findOrCreate({ where: { solved: false }, defaults: { cells: JSON.stringify(mazeHelper.generateMaze()), name: mazeHelper.generateName() } })
    .spread((maze) => {
      maze.getMoves({ order: [['id', 'DESC']] }).then(moves => {
        let cells;
        if (moves.length > 0) {
          cells = moves[0].cells;
        } else {
          cells = maze.cells;
        }
        let data = JSON.stringify({ cells: cells, name: maze.name })
        ws.send(data);
      });
    });
});

app.use(require('./controllers'));

app.listen(3000, function () {
  console.log('Listening on port 3000...')
});