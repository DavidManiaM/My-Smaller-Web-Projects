document.title = "Don't Miss It";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const resetButton = document.querySelector("#resetButton");
const scoreText = document.querySelector("#scoreText");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const bgcol = "white";
const playerColor = "black";
const gravityPower = 0.08;
const playerXVel = 2;
const jumpPower = 5;
const topWallKnockback = 0.05;
const bottomWallJumpPower = 1.5;
const tickSpeed = 1;
const spawnSpeed = 1500;
const foodWidth = 50;
const foodHeight = 50;
const foodImg = document.querySelector("#foodImg");

class Player{
    width = 50; height = 50;
    x = gameWidth/3 - this.width/2; y = 2*gameHeight/3 - this.height/2;
    prevX = gameWidth/3 - this.width/2 - 1; prevY = 2*gameHeight/3 - this.height/2 - 1;
    xVel = playerXVel; yVel = 0;
}

class Food{
    width = foodWidth; height = foodHeight;
    collided = false;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    rarity;
    angle = 1;
};

let running = true;
let score = 0;
let player = new Player();

let foods = [];

let myInterval;
startGame();
window.addEventListener("keydown", (event) => {
    if(event.keyCode == 32){
        player.yVel = -jumpPower;
    }
});
spawnNewFood();
drawPlayer();
setInterval(spawnNewFood, spawnSpeed);
function spawnNewFood(){
    let posrand = Math.random();
    let randX, color = "green";
    if(posrand >= 0.9)
        randX = Math.round(Math.random() * (gameWidth - foodWidth));  //in cazuri rare exista sansa sa se spawneze si la margini
    else
        randX = Math.round(Math.random() * (gameWidth - foodWidth - 200) + 100);
    let newFood = new Food(randX, -foodHeight-1);
    if(posrand >= 0.99){
        newFood.rarity = "#fcc201";
    }
    else if(newFood.x+foodWidth >= gameWidth-100 || newFood.x <= 100) newFood.rarity = "red";
    else newFood.rarity = "green";
    foods.push(newFood);
}

function startGame(){
    running = true;
    console.log("start");
    score = 0;
    player = new Player();
    myInterval = setInterval(nextTick, tickSpeed);
    foods = [];
    resetButton.style.visibility = "hidden";
    player.xVel = playerXVel;
}

function nextTick(){
    player.prevX = player.x;
    player.prevY = player.y;
    gravity();
    checkWallColision();
    movePlayer();
    ctx.clearRect(0, 0, 700, 700); //refresh();
    foods.forEach(object => {
        drawFood(object);
        object.y += 1; //moveFood();
    });
    checkFoodCollision();
    drawPlayer();
    checkDeath();
}

function gravity(){
    player.yVel += gravityPower;
}

function checkWallColision(){
    if(player.x + player.width >= gameWidth || player.x <= 0)
        player.xVel *= -1;
    if(player.y < 0){
        player.y = 0;
        player.yVel *= -topWallKnockback;
    }
    if(player.y > gameHeight - player.height){
        player.y = gameHeight - player.height;
        player.yVel = -player.yVel + bottomWallJumpPower;
    }
}

function movePlayer(){
    player.x += player.xVel;
    player.y += player.yVel;
}

function drawFood(object){
    /*ctx.fillStyle = object.rarity;
    ctx.fillRect(object.x, object.y, foodWidth, foodHeight);*/
    ctx.drawImage(foodImg, object.x, object.y, foodWidth, foodHeight);

    // Calculate the center point of the image
    /*const centerX = foodWidth / 2;
    const centerY = foodHeight / 2;

    ctx.save();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Resize the image
    //ctx.drawImage(foodImg, object.x, object.y, foodWidth, foodHeight);

    // Translate the canvas to the center point of the image
    ctx.translate(object.x + centerX, object.y + centerY);

    // Rotate the canvas by 45 degrees
    ctx.rotate(object.angle);

    // Draw the resized image onto the canvas at the new position
    ctx.drawImage(foodImg, -centerX, -centerY, foodWidth, foodHeight);

    // Restore the previous canvas state
    ctx.restore();
    object.angle += 0.01;*/
}

function checkFoodCollision(){
    for(let i = 0; i < foods.length; i++){
        if(!foods[i].collided && foods[i].x+foods[i].width >= player.x && foods[i].x <= player.x+player.width &&
                            foods[i].y+foods[i].height >= player.y && foods[i].y <= player.y+player.height){
            foods[i].collided = true;
            console.log("collision");
            foods.splice(i, 1);
            score++;
            scoreText.textContent = score;
        }
    }
}

function drawPlayer(){
    ctx.fillStyle = bgcol;
    ctx.clearRect(player.prevX-1, player.prevY-1, player.width+2, player.height+2);
    ctx.strokeStyle = playerColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function checkDeath(){
    for(let i = 0; i < foods.length; i++){
        if(foods[i].y + foodHeight > gameHeight + foodHeight){
            foods.splice(i, 1);
            console.log("die");
            score = 0;
            scoreText.textContent = score;
            canvas.style.opacity = 0.3;
            ctx.font = "50px Mv Boli";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText("Game over!", gameWidth/2, gameHeight/2);
            clearInterval(myInterval);
            setTimeout(() => {
                ctx.clearRect(0, 0, gameWidth, gameHeight);
                canvas.style.opacity = 1;
                ctx.fillText("Try again?", gameWidth/2, gameHeight/2);
                resetButton.style.visibility = "visible";
                resetButton.addEventListener("click", startGame);
            }, 1000);
            running = false;
        }
    }
}