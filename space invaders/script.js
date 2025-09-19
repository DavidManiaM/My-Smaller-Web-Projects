document.title = "Space Invaders";
const canvas = document.querySelector("canvas");
const projectileImg = document.querySelector("#projectileImg");
const bulletImg = document.querySelector("#bulletImg");
const shipImg = document.querySelector("#shipImg");
let blackenemyImg = document.querySelector("#enemyImg");
let redEnemyImg = document.querySelector("#redEnemyImg");
let blueEnemyImg = document.querySelector("#blueEnemyImg");
const ctx = canvas.getContext("2d");
const resetButton = document.querySelector("#resetButton");
const scoreText = document.querySelector("#scoreText");
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const bgcol = "white";
const playerColor = "black";
const tickSpeed = 1;
const enemySize = 50;
const enemyDistance = 80;
let presX = canvas.width/2 - 20;
let rows = 0;
let isPressingLeft = false;
let isPressingRight = false;

class Player{
    width = 40; height = 90;
    x = canvas.width/2 - this.width/2; y = canvas.height - this.height;

    move = function(key){
        if(isPressingRight){
            this.x += 3;
            presX = this.x;
            player.x = this.x;
            ctx.clearRect(this.x-8, this.y-1, this.width+2, this.height+2);
        }
        else if(isPressingLeft){
            this.x -= 3;
            ctx.clearRect(this.x+8, this.y-1, this.width+2, this.height+2);
        }
        if(running) this.update();
    }

    update = function(){
        ctx.drawImage(shipImg, this.x-this.width/2, this.y, this.width*2, this.height);
    }

    shoot = function(){
        let prc = Math.random();
        let projectile;
        if(prc > 0.9)  //sansa de 10% sa avem o racheta, in rest gloante
            projectile = new Projectile(presX+20-5, player.y-40, 15);
        else
            projectile = new Projectile(presX+20-5, player.y-40, 1);
        projectiles.push(projectile);
    }
}

class Projectile{
    height = 40; width = 30;
    constructor(x_, y_, pierce_){
        this.x = x_;
        this.y = y_;
        this.pierce = pierce_;
    }

    move = function(){
        this.y -= 6;
    }

    update = function(){
        ctx.clearRect(this.x, this.y+11, this.width+2, this.height+2);
        if(this.pierce >= 2)//daca avem pierce de racheta, desenam racheta; altfel, desenam glont
            ctx.drawImage(projectileImg, this.x-this.width-12, this.y, this.width*3, this.height*3);
        else
            ctx.drawImage(bulletImg, this.x-this.width+4, this.y, this.width*2, this.height*2);
    }

    delete = function(pos){
        projectiles.splice(pos, 1);
    }
}

class Enemy{
    size = enemySize;
    hp = 3;
    xVel = 0.5; yVel = 0;
    constructor(x_, y_, row_, pos_, type_){
        this.x = x_;
        this.y = y_;
        this.row = row_;
        this.pos = pos_;
        this.type = type_;
    }
    color = this.type

    update = function(){
        this.x += this.xVel;
        this.y += this.yVel;
    }

    show = function(){
        if(this.color == "blue"){ //daca am lovit recent inamicul, desenam albastru
            ctx.drawImage(blueEnemyImg, this.x, this.y, this.size, this.size);
        }
        else{//altfel, daca suntem pe primul rand, desenam rosu; daca nu, desenam negru
            if(this.row == 0) ctx.drawImage(redEnemyImg, this.x, this.y, this.size, this.size);
            else ctx.drawImage(blackenemyImg, this.x, this.y, this.size, this.size);
        }
    }

    hit = function(i){  //verificam daca lovim inamicul [i]
        for(let habarNuAmCeFac = projectiles.length-1; habarNuAmCeFac >= 0; habarNuAmCeFac--){
            //ihihi habar nu am ce fac hihihiihhihi
            if(projectiles[habarNuAmCeFac].x < this.x + this.size &&
                projectiles[habarNuAmCeFac].x + projectiles[habarNuAmCeFac].width > this.x &&
                projectiles[habarNuAmCeFac].y < this.y + this.size &&
                projectiles[habarNuAmCeFac].height + projectiles[habarNuAmCeFac].y > this.y){ //lovim inamicul
                    //verificam pierce-ul
                    projectiles[habarNuAmCeFac].pierce--;
                    if(projectiles[habarNuAmCeFac].pierce <= 0)
                        projectiles.splice(habarNuAmCeFac, 1);

                    //setam culoarea inamicului la albastru, dupa care o mutam la valoarea initiala dupa 0.1 secunde
                    this.color = "blue";
                    setTimeout(() => {this.color = this.type}, 100);

                    this.hp--;
                    if(this.hp <= 0){
                        if(enemies.length == 1){
                            console.log("you win");  //castigam daca am omorat ultimul inamic
                            running = false;
                        }
                        else{
                            let nextEnemy, prevEnemy;
                            if(i != enemies.length-1) //daca nu am omorat ultimul element, avem un element urmator
                                nextEnemy = enemies[i+1];
                            if(i != 0) prevEnemy = enemies[i-1];
                            if(enemies[i].pos == 1){
                                if(i != enemies.length-1 && nextEnemy.row == enemies[i].row){
                                    //daca suntem in stanga si exista un element in dreapta
                                    nextEnemy.pos = 1;
                                }
                                else{
                                    //daca nu mai sunt elemente in rand, decalam toate elementele de dupa cu row--
                                    for(let j = i+1; j < enemies.length; j++){
                                        enemies[j].row--;
                                        //enemies[j].update();
                                    }
                                    rows--;
                                }
                            }
                            if(enemies[i].pos == 2){
                                if(i != 0 && prevEnemy.row == enemies[i].row){
                                    //daca suntem in dreapta si exista un element in stanga
                                    prevEnemy.pos = 2;
                                }
                                else{
                                    //daca nu mai sunt elemente in rand, decalam toate elementele de dupa cu row--
                                    for(let j = i+1; j < enemies.length; j++){
                                        enemies[j].row--;
                                    }
                                    rows--;
                                }
                            }
                        }
                        enemies.splice(i, 1);
                        i--; //cred banuiesc idk
                        score++;
                        scoreText.textContent = score;
                    }
                }
        }
    }
}

let projectiles = [];
let enemies = [
    new Enemy(enemySize, 30, rows, 1, "red"),
    new Enemy(enemySize + enemyDistance, 40, rows, 0, "red"),
    new Enemy(enemySize + 2*enemyDistance, 30, rows, 0, "red"),
    new Enemy(enemySize + 3*enemyDistance, 40, rows, 0, "red"),
    new Enemy(enemySize + 4*enemyDistance, 30, rows, 0, "red"),
    new Enemy(enemySize + 5*enemyDistance, 40, rows, 2, "red")
];

let running = true;
let score = 0;
let player = new Player();
presX = player.x;

let tick = setInterval(nextTick, tickSpeed);
setInterval(() => {
    presX = player.x;
}, 1)

window.addEventListener("keypress", () => {
    if(event.key == 'a')
        isPressingLeft = true;
    else if(event.key == 'd')
        isPressingRight = true;
    player.move();
});
window.addEventListener("keyup", () => {
    if(event.key == 'a')
        isPressingLeft = false;
    if(event.key == 'd')
    isPressingRight = false;
});
window.addEventListener("mousedown", player.shoot);
window.addEventListener("keypress", () => {if(event.key == 'r') restart()});

function restart(){
    clearInterval(tick);
    running = true;
    score = 0;
    scoreText.textContent = score;
    player = new Player();
    presX = player.x;
    console.log("restart");
    ctx.clearRect(0, 0, gameHeight, gameWidth);
    rows = 0;
    enemies = [
        new Enemy(enemySize, 30, rows, 1, "red"),
        new Enemy(enemySize + enemyDistance, 40, rows, 0, "red"),
        new Enemy(enemySize + 2*enemyDistance, 30, rows, 0, "red"),
        new Enemy(enemySize + 3*enemyDistance, 40, rows, 0, "red"),
        new Enemy(enemySize + 4*enemyDistance, 30, rows, 0, "red"),
        new Enemy(enemySize + 5*enemyDistance, 40, rows, 2, "red")
    ];
    projectiles = [];
    presX = canvas.width/2 - 20;
    tick = setInterval(nextTick, tickSpeed);
}

function nextTick(){
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    presX = player.x;
    player.move();
    for(let i = projectiles.length-1; i >= 0; i--){
        projectiles[i].move();
        projectiles[i].update();
        player.update();
        if(projectiles[i].y < -projectiles[i].height){
            projectiles[i].delete(i);
        }
    }
    for(let k = 0; k < enemies.length; k++){
        if(enemies[k].pos == 1 || enemies[k].pos == 2){//pt eficienta
            if(enemies[k].x <= 0 || enemies[k].x >= gameWidth-enemySize){ //daca lovim un zid inversam xVel si decalam in y cu 100px
                for(let a = 0; a < enemies.length; a++){
                    if(enemies[a].row == enemies[k].row){
                        enemies[a].xVel *= -1;
                        enemies[a].yVel = 100;
                    }
                }
            }
        }
    }
    //astea doua for-uri trb sa fie separat
    for(let i = 0; i < enemies.length && enemies[i].row == 0; i++){
        if(enemies[i].pos == 1 || enemies[i].pos == 2){//pt eficienta
            if(enemies[i].x <= 0 || enemies[i].x >= gameWidth-(enemySize)){
                rows++;
                enemies = enemies.concat([
                    new Enemy(1, 30, rows, 1, "black"),
                    new Enemy(enemyDistance, 40, rows, 0, "black"),
                    new Enemy(2*enemyDistance, 30, rows, 0, "black"),
                    new Enemy(3*enemyDistance, 40, rows, 0, "black"),
                    new Enemy(4*enemyDistance, 30, rows, 0, "black"),
                    new Enemy(5*enemyDistance, 40, rows, 2, "black")
                ]);
            }
        }
    }
    for(let i = enemies.length-1; i >= 0; i--){
        enemies[i].update();
        enemies[i].yVel = 0;
        enemies[i].show();
        enemies[i].hit(i);
    }
    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].y > gameHeight){
            lose();
            break;
        }
    }
    if(!running){
        gameOver();
    }
}

function lose(){
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    clearInterval(tick);
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";
    ctx.fillText("You lost", canvas.width/2, canvas.height/2);
    ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2+50);
    ctx.fillText("Press R to restart", canvas.width/2, canvas.height/2+100);
}

function gameOver(){ //win
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    clearInterval(tick);
    ctx.font = "50px Mv Boli";
    ctx.fillStyle = "grey";
    ctx.textAlign = "center";
    ctx.fillText("You win", canvas.width/2, canvas.height/2);
    ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2+50);
    ctx.fillText("Press R to restart", canvas.width/2, canvas.height/2+100);
}

