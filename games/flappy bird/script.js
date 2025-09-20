document.title = "Flappy bird";
let canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.height;
const bgImg = document.getElementById("bgImg");
const birdImg = document.getElementById("birdImg");
let score = 0;
let running = true;
const playerH = 60;
const playerW = 60;
let gravity = 0.1;
let jumpPower = -4.4;
const pipeW = 200;
let pipeDist = 230;
let playerSpeed = 2;
let pipeSpawnSpeed = 7;
let distanceTravelled = 0;

let frames = 0;

function isColliding(rect1, rect2) {
    const x1 = rect1.x;
    const y1 = rect1.y;
    const w1 = rect1.w;
    const h1 = rect1.h;
    const x2 = rect2.x;
    const y2 = rect2.y;
    const w2 = rect2.w;
    const h2 = rect2.h;
  
    // Checking for collision
    const collidingOnX = x1 < x2 + w2 && x1 + w1 > x2;
    const collidingOnY = y1 < y2 + h2 && y1 + h1 > y2;

    return collidingOnX && collidingOnY;
  }

class Player {
    w = playerW; h = playerH;
    x = w / 4 - this.w / 2; y = h / 2 - this.h / 2;
    yVel = 0;

    update() {
        this.yVel += gravity;
        this.y += this.yVel;

        this.draw();
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        //ctx.drawImage(birdImg, this.x, this.y, this.w, this.h);
    }

}

class Pipe {
    pipeOpeningW = 30; pipeOveningH = 40;
    x = w + this.pipeOpeningW + 1; y; w = pipeW; h = h;

    constructor(y_) {
        this.y = y_;
    }

    update() {
        this.x -= playerSpeed;

        this.draw();
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        if (this.y <= 0) {//top pipe
            ctx.fillRect(this.x - this.pipeOpeningW, this.y + this.h - this.pipeOveningH, this.w + 2 * this.pipeOpeningW, this.pipeOveningH);
        }
        else {//bottom pipe
            ctx.fillRect(this.x - this.pipeOpeningW, this.y, this.w + 2 * this.pipeOpeningW, this.pipeOveningH);
        }
    }
}

let player = new Player;
let pipes = [];

let coef = 1;

function generatePipe() {
    let ytop = Math.random() * (h - pipeDist) - (h);

    pipes.push(new Pipe(ytop));
    pipes.push(new Pipe(ytop + pipeDist + h));

    playerSpeed += coef * 0.01;
    gravity += coef * 0.0001;
    jumpPower -= coef * 0.06 * 0.044;
    pipeDist += coef * 0.1;
}

generatePipe();

requestAnimationFrame(nextTick);

function nextTick() {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(bgImg, 0, 0, w, h);

    pipes.forEach((p) => {
        p.update();
    });

    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].x < -300) {
            pipes.splice(i, 1);
            i--;
        }
    }

    player.update();

    distanceTravelled += playerSpeed / 100;
    if (distanceTravelled >= pipeSpawnSpeed) {
        generatePipe();
        distanceTravelled = 0;
    }

    for (let i = 0; i < pipes.length; i++) {
        if (isColliding(player, pipes[i])) {
            die();
        }
    }

    frames++;
    requestAnimationFrame(nextTick);
}

function die(){
    
}

window.addEventListener("keydown", (e) => {
    if (e.key == " ") {
        player.yVel = jumpPower;
    }
});

setInterval(() => {console.log(frames); frames = 0;}, 1000);