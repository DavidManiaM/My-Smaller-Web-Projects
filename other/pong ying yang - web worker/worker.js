// Worker.js

let w, h, radius, gridSize, cellSize, maxSpeed;
let blackBall, whiteBall, grid = [];
let frames = 0;

function isCircleCollidingWithSquare(circle, i, j) {
    const { x: cx, y: cy, r } = circle;
    sx = i; sy = j; width = cellSize; height = cellSize;

    const closestX = Math.max(sx, Math.min(cx, sx + width));
    const closestY = Math.max(sy, Math.min(cy, sy + height));

    const distanceX = cx - closestX;
    const distanceY = cy - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    return distanceSquared <= r * r;
}

self.onmessage = function(e) {
    if (e.data.type === "init") {
        // Initialization of game parameters
        ({ canvasWidth: w, canvasHeight: h, gridSize, radius, maxSpeed } = e.data);
        cellSize = w / gridSize;

        init();
        startGameLoop();
    }
};

class Ball {
    constructor(x_, y_, type_, xVel_, yVel_) {
        this.x = x_;
        this.y = y_;
        this.r = radius;
        this.type = type_;
        this.xVel = xVel_;
        this.yVel = yVel_;
    }

    update() {
        this.wallCollision();
        this.gridCollision();
        this.x += this.xVel;
        this.y += this.yVel;
    }

    wallCollision() {
        if (this.x - this.r < 0) {
            this.x = this.r;
            this.xVel *= -1;
        }
        if (this.x + this.r >= w) {
            this.x = w - this.r;
            this.xVel *= -1;
        }
        if (this.y - this.r < 0) {
            this.y = this.r;
            this.yVel *= -1;
        }
        if (this.y + this.r >= h) {
            this.y = h - this.r;
            this.yVel *= -1;
        }
    }

    gridCollision() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] == this.type) {
                    let gridCoord = { x: i * cellSize, y: j * cellSize };
                    if (isCircleCollidingWithSquare(this, gridCoord.x, gridCoord.y)) {
                        if (this.x > gridCoord.x && this.x < gridCoord.x + cellSize)
                            this.yVel *= -1;
                        if (this.y > gridCoord.y && this.y < gridCoord.y + cellSize)
                            this.xVel *= -1;
                        if (this.type == "black")
                            grid[i][j] = "white";
                        else
                            grid[i][j] = "black";
                    }
                }
            }
        }
    }
}

function init() {
    let velX, velY;
    velX = Math.random() * maxSpeed * 2 - maxSpeed;
    velY = Math.sqrt(maxSpeed * maxSpeed - velX * velX);
    blackBall = new Ball(100, 100, "black", velX, velY);

    velX = Math.random() * maxSpeed * 2 - maxSpeed;
    velY = Math.sqrt(maxSpeed * maxSpeed - velX * velX);
    whiteBall = new Ball(w - 100, h - 100, "white", velX, velY);

    for (let i = 0; i < gridSize; i++) {
        grid[i] = new Array(gridSize);
        for (let j = 0; j < gridSize; j++)
            if (i + j < gridSize - 1)
                grid[i][j] = "white";
            else
                grid[i][j] = "black";
    }
}

function startGameLoop() {
    setInterval(() => {
        blackBall.update();
        whiteBall.update();
        frames++;

        // Send updated state back to main thread
        self.postMessage({ blackBall, whiteBall, grid });
    }, 16); // ~60 FPS
}
