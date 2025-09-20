document.title = "Ying Yang Pong";
let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext('2d');
let w = canvas.width;
let h = canvas.height;

const radius = 5;
const gridSize = 30;
const maxSpeed = 8;
const cellSize = w / gridSize;

// Create the Web Worker
const worker = new Worker('worker.js');

// Initialize the game in the worker
worker.postMessage({
    type: "init",
    canvasWidth: w,
    canvasHeight: h,
    gridSize: gridSize,
    radius: radius,
    maxSpeed: maxSpeed
});

// Receive updated game state from the worker
worker.onmessage = function(e) {
    const { blackBall, whiteBall, grid } = e.data;

    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Draw the grid
    drawGrid(grid);

    // Draw the balls
    drawBall(blackBall);
    drawBall(whiteBall);
};

function drawGrid(grid) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.fillStyle = ball.type;
    ctx.strokeStyle = ball.type === "white" ? "black" : "white";
    ctx.ellipse(ball.x, ball.y, ball.r, ball.r, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
