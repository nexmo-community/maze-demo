//import { Socket } from "dgram";

// The initial game board: 0 = free space, 1 = walls, 2 = the goal, 3 = player
let board = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 3, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let player = {};
let goal = {};
let name = '';

const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const blockSize = width / board.length;
const half = blockSize / 2;

const nameHeader = document.getElementById('mazeName')

// Initialise the game board
function init() {
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle = '#4C4D4F';

    // Loop through the board array drawing the walls
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            // Draw a wall
            if (board[y][x] === 1) {
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
            // Set the goal coordinates
            else if (board[y][x] === 2) {
                goal = { x: x, y: y }
            }
            // Set the player's start coordinates
            else if (board[y][x] === 3) {
                player = { x: x, y: y }
            }
        }
    }

    drawGoal();
    drawPlayer();
}

// Draw the goal
function drawGoal() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'gold';
    ctx.moveTo(goal.x * blockSize, goal.y * blockSize);
    ctx.lineTo((goal.x + 1) * blockSize, (goal.y + 1) * blockSize);
    ctx.moveTo(goal.x * blockSize, (goal.y + 1) * blockSize);
    ctx.lineTo((goal.x + 1) * blockSize, goal.y * blockSize);
    ctx.stroke();
}

// Draw the player
function drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = '#3574B6';
    ctx.arc(player.x * blockSize + half, player.y * blockSize + half, half, 0, 2 * Math.PI);
    ctx.fill();
}

// Clear the player
function clearPlayer() {
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize);
}

// Check to see if the new space is inside the board and not a wall
function canMove(x, y) {
    return (y >= 0) && (y < board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

// Check if player has moved onto the goal
function solved(x, y) {
    return (x === goal.x) && (y === goal.y);
}

// To be replaced with SMS commands once that's set up
canvas.addEventListener('keyup', function (event) {
    if ((event.keyCode === 38) && canMove(player.x, player.y - 1)) {
        clearPlayer();
        player.y--;
        drawPlayer();
    } else if ((event.keyCode === 40) && canMove(player.x, player.y + 1)) {
        clearPlayer();
        player.y++;
        drawPlayer();
    } else if ((event.keyCode === 37) && canMove(player.x - 1, player.y)) {
        clearPlayer();
        player.x--;
        drawPlayer();
    } else if ((event.keyCode === 39) && canMove(player.x + 1, player.y)) {
        clearPlayer();
        player.x++;
        drawPlayer();
    }
    if (solved(player.x, player.y)) {
        alert('dinosaur');
    }
}, false);

// Websocket stuff
const socket = new SimpleWebsocket(window.location.href.replace('http', 'ws') + 'ws');
socket.on('connect', (data) => {
    console.log('connected');
});

socket.on('data', (data) => {
    let json = JSON.parse(data.toString());
    board = JSON.parse(json.cells);
    nameHeader.textContent = json.name.split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    init();
});