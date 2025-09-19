let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let mousepos = { x: width / 2, y: height / 2 };
let gravity = 1;
let alive = true;
let EnemySpawnInterval = 300; //300
let enemyWidth = 60;
let coinWidth = 15;
let coinSpawnChance = 0.3;
let score = 0;
let playerWidth = 25;
let tickSpeed = 4; //1 4
let deathCounter = 0;

var coinAudio = new Audio("CoinPickUpSound.mp3");
var deathAudio = new Audio("deathSound.mp3");

class Enemy {
    w = enemyWidth; h = enemyWidth;
    constructor(x_, y_, xLength_, xVel_, yVel_, yLength_, type_) {
        this.x = x_;
        this.xVel = xVel_;
        this.xStart = x_;
        this.xLength = xLength_;
        this.type = type_;

        this.y = y_;
        this.yVel = yVel_;
        this.yStart = y_;
        this.yLength = yLength_;
    }

    move = function () {
        if (this.x + this.w/2 > this.xStart + this.xLength && this.yLength == 1) {
            this.xVel *= -1;
            this.x--;
        }
        if (this.x + this.w/2 < this.xStart && this.yLength == 1) {
            this.xVel *= -1;
            this.x++;
        }
        if (this.y > this.yStart + this.yLength && this.xLength == 1) {
            this.yVel *= -1;
            this.y += this.yVel;
        }
        if (this.y < this.yStart && this.xLength == 1) {
            this.yVel *= -1;
            this.y += this.yVel;
        }

        if(this.yLength == 1){
            this.y += gravity;
        }
        //else this.y += 0.01; //corectie pt gravitatie

        this.x += this.xVel;
        this.y += this.yVel;
        this.yStart += gravity;
    }

    draw = function () {
        ctx.strokeStyle = "lightgrey";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        if (this.yLength == 1) {
            ctx.moveTo(this.xStart, this.y + this.h / 2);
            ctx.lineTo(this.xStart + this.xLength, this.y + this.h / 2);
            ctx.stroke();
            ctx.fillStyle = "blue";
        }
        else if(this.xLength == 1){
            ctx.moveTo(this.x + this.w/2, this.yStart + this.h/2);
            ctx.lineTo(this.x + this.w/2, this.yStart + this.h/2 + this.yLength);
            ctx.stroke();
            ctx.fillStyle = "red";
        }
        else{
            ctx.fillStyle = "purple";
        }
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Coin{
    w = coinWidth; h = coinWidth;
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
    }

    move = function(){
        this.y += gravity;
    }

    draw = function(){
        ctx.fillStyle = "gold";
        //ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
        ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, 2 * Math.PI);
        ctx.fill();

    }
}

class Power{
    w = coinWidth; h = coinWidth;
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
    }

    move = function(){
        this.y += gravity;
    }

    draw = function(){
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Mouse {
    x; y;
    w = playerWidth; h = playerWidth;
    move = function () {
        this.x = mousepos.x;
        this.y = mousepos.y;
    }
    draw = function () {
        /*ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);*/

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w/2, 0, 2 * Math.PI);
        ctx.fillStyle = "lightgreen";
        ctx.fill();
    }
}

let player = new Mouse;
let enemies = [new Enemy(50, 100, 500, 3, 3, 500)];
let coins = [];
let powers = [];

setInterval(() => {
    if(alive){
        nextTick();
    }
}, tickSpeed);
setInterval(spawnEnemy, EnemySpawnInterval);

function spawnEnemy() {
    let rndType = Math.random() * 10; //0 --> 10
    let rndPathHeight = Math.random()*300 + 300 // 300 -> 600
    let rndPathWidth = Math.random()*800 + 400 // 400 -> 1200
    let rndVelX = Math.random()*2 + 3 //3 -> 5
    let rndVelY = Math.random()*2 + 2 //2 -> 4
    let rndCoinSpawn = Math.random();
    if (rndType < 4){//se deplaseaza pe orizontala(x)
        let xrnd = Math.random() * (width - enemyWidth - rndPathWidth); //0 --> width - enemyWidth - rndPathWidth
        enemies.push(new Enemy(xrnd, -enemyWidth, rndPathWidth, rndVelX, 0, 1));

        let coinX = 1;
        if(xrnd <= width / 2){
            coinX = Math.random() * (width/2 - coinWidth);
        }
        else{
            coinX = Math.random() * (width/2 - coinWidth) + width/2;
        }
        if(rndCoinSpawn < coinSpawnChance){ //spawn coin
            coins.push(new Coin(coinX, -coinWidth));
        }
    }
    else if(rndType > 6){//se deplaseaza pe verticala(y)
        let xrnd = Math.random() * (width - enemyWidth); //0 --> width - enemyWidth
        enemies.push(new Enemy(xrnd, -rndPathHeight, 1, 0, rndVelY, rndPathHeight));

        let coinX = 1;
        if(xrnd <= width / 2){
            coinX = Math.random() * (width/2 - coinWidth);
        }
        else{
            coinX = Math.random() * (width/2 - coinWidth) + width/2;
        }
        if(rndCoinSpawn < coinSpawnChance){ //spawn coin
            coins.push(new Coin(coinX, -coinWidth));
        }
    }
    /*else{//se deplaseaza in romb
        let xrnd = Math.random() * (width - enemyWidth - rndPathWidth);
        enemies.push(new Enemy(xrnd, -enemyWidth, rndPathWidth, rndVelX, rndVelY, rndPathHeight));
    }*/
}

canvas.addEventListener('mousemove', (event) => {
    mousepos = { x: event.clientX, y: event.clientY };
    player.move();
});

function checkDeath() {
    for (let i = 0; i < enemies.length; i++) {
        let el = enemies[i];
        if (player.x + player.w/2 >= el.x && player.x - player.w/2 <= el.x + el.w && player.y + player.h/2 >= el.y && player.y - player.h/2 <= el.y + el.h) {
            console.log("death");
            /*enemies.splice(i+1, enemies.length); //trebuie sa fie ordinea inversa; mai intai splice pana la final si apoi de la inceput
            enemies.splice(0, i);*/
            //deathAudio.play();
            enemies = [enemies[i]];
            coins = [];
            alive = false;
            break;

            /*deathCounter++;
            enemies.splice(i, 1);
            i--;*/
        }
    }
}

let frames = 0;

function nextTick() {
    ctx.clearRect(0, 0, width, height);
    if (alive) checkDeath();
    for (let i = 0; i < enemies.length; i++) {
        let el = enemies[i];
        el.move();
        el.draw();
        if (el.yStart > height) {
            enemies.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < coins.length; i++) {
        let el = coins[i];
        el.move();
        //el.pickUp();
        if(player.x + player.w/2 >= el.x && player.x - player.w/2 <= el.x + el.w && player.y + player.h/2 >= el.y && player.y - player.h/2 <= el.y + el.h){
            console.log("coin");
            //coinAudio.play();
            coins.splice(i, 1);
            i--;
            score++;
        }
        el.draw();
    }
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, width/2, 50);
    //ctx.fillText("Deaths: " + deathCounter, width/2, 100);
    player.draw();
    //console.log(enemies.length);

    frames++;
}

setInterval(() => {
    console.log(frames);
    frames = 0;
}, 1000);





