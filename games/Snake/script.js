document.title = "Snake";
const gameBoard = document.querySelector("canvas");
const boardBackground = "green";
const ctx = gameBoard.getContext("2d");
const scoreTxt = document.querySelector("#score");
const resetButton = document.querySelector("#gameContainer").querySelector("button");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 50;
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const foodBorder = "black";
let score = 0;
let running = true;
let xVel = unitSize;
let yVel = 0;
let l = 4;
let prevX = 0, prevY = 0;
let foodX, foodY;
let tickSpeed = 100;

const difficulties = [250, 180, 100];
let difficulty;

const difficultyContainer = document.querySelector("#difficulty").querySelectorAll("button");

let snake = [
    {x: unitSize*3, y: 0},
    {x: unitSize*2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

let head = snake[0];

let goingUp = false;
let goingDown = false;
let goingLeft = false;
let goingRight = true;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener("keydown", findDirection);
resetButton.addEventListener("click", startGame);

setup();
let game;
game = setInterval(nextTick, tickSpeed);
//startGame();

function setup(){
    for(let k = 0; k < difficultyContainer.length; k++){
        difficultyContainer[k].addEventListener("click", () => {
            difficulty = k;
            console.log(difficulty);
            document.querySelector("#difficulty").style.display = "none";
            setTimeout(startGame, 400);
        });
    }
}

function startGame(){
    document.querySelector("#difficulty").style.display = "none";
    tickSpeed = difficulties[difficulty];
    console.log(tickSpeed);
    document.querySelector("#gameContainer").style.visibility = "visible";
    document.querySelector("#gameContainer").style.opacity = "1";
    if(!running) game = setInterval(nextTick, tickSpeed);
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    score = 0;
    running = true;
    xVel = unitSize;
    yVel = 0;
    l = 4;
    prevX = 0, prevY = 0;
    foodX, foodY;

    snake = [
        {x: unitSize*3, y: 0},
        {x: unitSize*2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];

    head = snake[0];

    goingUp = false;
    goingDown = false;
    goingLeft = false;
    goingRight = true;
    drawSnake();
    placeFood();
}

function nextTick(){
    changeDirection();
    moveSnake();
    if(foodX == head.x && foodY == head.y){ //isFoodEaten()
        growSnake();
        score++;
        scoreTxt.textContent = score;
        placeFood();
    }
    drawSnake();
    if(borderCollision() || bodyCollision()){
        running = false;
        gameOver();
    }

    if(!running){
        clearInterval(game);
    }
}

function findDirection(event){
    console.log(event.keyCode);

    function goingReset(){
        goingUp = false;
        goingDown = false;
        goingLeft = false;
        goingRight = false;
    }

    switch(event.keyCode){
        case 82: // R key to restart
            startGame();
            break;
        case 37: // Left arrow
        case 65: // A key
            if(xVel != unitSize){
                goingReset();
                goingLeft = true;
            }
            break;
        case 38: // Up arrow
        case 87: // W key
            if(yVel != unitSize){
                goingReset();
                goingUp = true;
            }
            break;
        case 39: // Right arrow
        case 68: // D key
            if(xVel != -unitSize){
                goingReset();
                goingRight = true;
            }
            break;
        case 40: // Down arrow
        case 83: // S key
            if(yVel != -unitSize){
                goingReset();
                goingDown = true;
            }
            break;
        default:
            break;
    }
}


function changeDirection(){
    if(goingUp){
        xVel = 0;
        yVel = -unitSize;
    }
    else if(goingDown){
        xVel = 0;
        yVel = unitSize;
    }
    else if(goingLeft){
        xVel = -unitSize;
        yVel = 0;
    }
    else if(goingRight){
        xVel = unitSize;
        yVel = 0;
    }
}

function moveSnake(){
    ctx.strokeStyle = "green";
    ctx.fillStyle = boardBackground;
    if(head.x != foodX || head.y != foodY) ctx.clearRect(snake[l-1].x-1, snake[l-1].y-1, unitSize+2, unitSize+2);
    prevX = snake[l-1].x;
    prevY = snake[l-1].y;
    for(let i = l-1; i > 0; i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    head.x += xVel;
    head.y += yVel;
}

function growSnake(){
    snake.push({x: prevX, y: prevY});
    l++;
}

function placeFood(){
    let randX = Math.round(Math.random()*gameWidth);
    let randY = Math.round(Math.random()*gameHeight);
    foodX = randX - randX % unitSize;
    foodY = randY - randY % unitSize;

    snake.forEach(el => {
        if(foodX == el.x && foodY == el.y)
            placeFood();
    });

    console.log(`${foodX}, ${foodY}`);
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function drawSnake(){
    snake.forEach((el) => {
        if(el.x != foodX || el.y != foodY){
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillStyle = snakeColor;
            ctx.fillRect(el.x, el.y, unitSize, unitSize);
            ctx.strokeRect(el.x, el.y, unitSize, unitSize);
        }
    });
}

function borderCollision(){
    if(head.x >= gameWidth || head.y >= gameHeight || head.x < 0 || head.y < 0)
        return true;
    return false;
}

function bodyCollision(){
    for(let i = 1; i < l; i++){
        if(snake[i].x == head.x && snake[i].y == head.y)
            return true;
    }
    return false;
}

function gameOver(){
    document.querySelector("#gameContainer").style.opacity = "0.3";
    document.querySelector("#difficulty").style.display = "block";
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameBoard.width/2, gameBoard.height/2);
    running = false;
}